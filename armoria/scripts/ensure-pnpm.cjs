const packageManager = process.env.npm_execpath || "";

if (!packageManager.toLowerCase().includes("pnpm")) {
  console.error("This project uses pnpm. Run `pnpm install` instead of npm.");
  process.exit(1);
}