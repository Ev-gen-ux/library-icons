import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { iconSet, SIZES, type IconSize } from "../src/icons.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

function svg(size: number, body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">${body}</svg>\n`;
}

async function main(): Promise<void> {
  const iconsDir = path.join(ROOT, "public", "icons");
  const metaDir = path.join(ROOT, "meta");
  await mkdir(iconsDir, { recursive: true });
  await mkdir(metaDir, { recursive: true });

  const names: string[] = [];

  for (const size of SIZES) {
    const set = iconSet(size as IconSize);
    for (const [name, body] of Object.entries(set)) {
      await writeFile(path.join(iconsDir, `icon-${name}-${size}.svg`), svg(size, body), "utf8");
      if (!names.includes(name)) names.push(name);
    }
  }

  await writeFile(
    path.join(metaDir, "icons.json"),
    JSON.stringify(
      {
        style: "semi-filled",
        color: "currentColor",
        sizes: [...SIZES],
        naming: "icon-{name}-{size}",
        icons: names
      },
      null,
      2
    ) + "\n",
    "utf8"
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
