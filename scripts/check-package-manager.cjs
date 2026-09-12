const fs = require("node:fs");
const path = require("node:path");

const repositoryRoot = path.resolve(__dirname, "..");
const packageRoots = [".", "world-engine-icons", "armoria"];
const expectedPackageManager = "pnpm@11.24.0";
const errors = [];

for (const packageRoot of packageRoots) {
  const root = path.join(repositoryRoot, packageRoot);
  const packageJsonPath = path.join(root, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  if (packageJson.packageManager !== expectedPackageManager) {
    errors.push(`${packageRoot}/package.json must declare ${expectedPackageManager}`);
  }

  if (fs.existsSync(path.join(root, "package-lock.json"))) {
    errors.push(`${packageRoot}/package-lock.json must not exist`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Package manager policy is valid: ${expectedPackageManager}`);