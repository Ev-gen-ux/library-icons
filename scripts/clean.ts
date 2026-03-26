import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

async function main(): Promise<void> {
  await rm(path.join(ROOT, "public", "icons"), { recursive: true, force: true });
  await rm(path.join(ROOT, "meta", "icons.json"), { force: true });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
