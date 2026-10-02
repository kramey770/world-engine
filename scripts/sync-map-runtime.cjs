const fs = require("node:fs");
const path = require("node:path");

const workspace = path.resolve(__dirname, "..");
const source = path.join(workspace, "map-generator-source", "dist");
const target = path.join(workspace, "public", "fantasy-map-generator");
const mode = process.argv[2];

if (!fs.existsSync(source)) {
  throw new Error(`Map source build does not exist: ${source}`);
}

if (mode === "--check") {
  const differences = [];

  function compareTrees(sourcePath, targetPath, relativePath = "") {
    if (!fs.existsSync(targetPath)) {
      differences.push(relativePath || ".");
      return;
    }

    const sourceStats = fs.statSync(sourcePath);
    const targetStats = fs.statSync(targetPath);
    if (sourceStats.isDirectory() !== targetStats.isDirectory()) {
      differences.push(relativePath || ".");
      return;
    }

    if (!sourceStats.isDirectory()) {
      if (!fs.readFileSync(sourcePath).equals(fs.readFileSync(targetPath))) {
        differences.push(relativePath);
      }
      return;
    }

    const sourceEntries = fs.readdirSync(sourcePath).sort();
    const targetEntries = fs.readdirSync(targetPath).sort();
    for (const entry of new Set([...sourceEntries, ...targetEntries])) {
      const entryPath = path.join(relativePath, entry);
      if (!sourceEntries.includes(entry) || !targetEntries.includes(entry)) {
        differences.push(entryPath);
      } else {
        compareTrees(
          path.join(sourcePath, entry),
          path.join(targetPath, entry),
          entryPath,
        );
      }
    }
  }

  compareTrees(source, target);
  if (differences.length > 0) {
    throw new Error(
      `Generated map runtime is stale. Run pnpm sync:map-runtime. Differences: ${differences.slice(0, 20).join(", ")}`,
    );
  }

  console.log("Generated map runtime matches map-generator-source/dist");
  process.exit(0);
}

if (mode !== undefined) {
  throw new Error(`Unknown option: ${mode}`);
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });
fs.cpSync(source, target, { recursive: true });
console.log(
  `Synced map runtime from ${path.relative(workspace, source)} to ${path.relative(workspace, target)} and removed older hashed chunks`,
);
