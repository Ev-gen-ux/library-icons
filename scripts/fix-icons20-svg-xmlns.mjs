import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = "/Users/evgeniyakovenko/Desktop/library-icons/public/icons-20";

async function listSvgFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listSvgFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".svg")) {
      files.push(fullPath);
    }
  }
  return files;
}

function ensureXmlns(svg) {
  if (svg.includes('xmlns="http://www.w3.org/2000/svg"')) return svg;
  return svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
}

async function main() {
  const files = await listSvgFiles(ROOT);
  let changed = 0;
  for (const file of files) {
    const source = await readFile(file, "utf8");
    const fixed = ensureXmlns(source);
    if (fixed !== source) {
      await writeFile(file, fixed, "utf8");
      changed += 1;
    }
  }
  console.log(`Checked ${files.length} SVG files, updated ${changed}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
