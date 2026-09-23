const fs = require("node:fs");
const path = require("node:path");

const workspace = path.resolve(__dirname, "..");
const source = path.join(workspace, "map-generator-source", "dist");
const target = path.join(workspace, "public", "fantasy-map-generator");

if (!fs.existsSync(source)) {
  throw new Error(`Map source build does not exist: ${source}`);
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });
fs.cpSync(source, target, { recursive: true });
console.log(
  `Synced map runtime from ${path.relative(workspace, source)} to ${path.relative(workspace, target)} and removed older hashed chunks`,
);
