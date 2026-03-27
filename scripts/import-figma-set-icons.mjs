import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const sourcePath =
  "/Users/evgeniyakovenko/.cursor/projects/Users-evgeniyakovenko-Desktop-library-icons/agent-tools/66a138f5-7973-496c-80e6-7f914b4d474b.txt";
const setIconDir = join(rootDir, "lib", "set-icon");
const manifestPath = join(rootDir, "lib", "manifest.json");

function toKebab(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function normalizeSvg(svgText) {
  let out = svgText.trim();

  out = out
    .replace(/fill="var\(--fill-\d+,\s*#[0-9A-Fa-f]{6}\)"/g, 'fill="currentColor"')
    .replace(/fill="black"/g, 'fill="currentColor"')
    .replace(/fill="#040917"/gi, 'fill="currentColor"')
    .replace(/stroke="#040917"/gi, 'stroke="currentColor"');

  out = out.replace(
    /<svg\b([^>]*)>/i,
    (_match, attrs) => `<svg${attrs} color="#7D8394">`,
  );

  return `${out}\n`;
}

const source = readFileSync(sourcePath, "utf8");

const varUrl = new Map();
for (const m of source.matchAll(/const\s+(\w+)\s*=\s*"([^"]+)";/g)) {
  varUrl.set(m[1], m[2]);
}

const icons = [];
for (const m of source.matchAll(
  /function\s+\w+\([^)]*\)\s*\{[\s\S]*?data-name="20x20 \/ ([^"]+)"[\s\S]*?src=\{(\w+)\}/g,
)) {
  const [, rawName, imgVar] = m;
  const url = varUrl.get(imgVar);
  if (!url) continue;
  icons.push({ rawName, imgVar, url });
}

if (!icons.length) {
  throw new Error("No 20x20 icons parsed from Figma design context output");
}

mkdirSync(setIconDir, { recursive: true });
for (const file of readdirSync(setIconDir)) {
  if (file === ".gitkeep") continue;
  rmSync(join(setIconDir, file), { force: true });
}

const used = new Map();
const writtenFiles = [];
for (const icon of icons) {
  const base = toKebab(icon.rawName);
  const n = (used.get(base) ?? 0) + 1;
  used.set(base, n);
  const fileName = n === 1 ? `${base}.svg` : `${base}-${n}.svg`;

  // eslint-disable-next-line no-await-in-loop
  const res = await fetch(icon.url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${icon.url}: ${res.status}`);
  }
  // eslint-disable-next-line no-await-in-loop
  const rawSvg = await res.text();
  const normalized = normalizeSvg(rawSvg);
  writeFileSync(join(setIconDir, fileName), normalized, "utf8");
  writtenFiles.push(fileName);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
manifest.groups["set-icon"] = writtenFiles.length;
manifest.files["set-icon"] = writtenFiles;
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`Imported ${writtenFiles.length} icons to ${setIconDir}`);
