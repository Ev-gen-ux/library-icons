/**
 * Regenerates lib/test-icon/*.svg as filled glyphs (Phosphor weight="fill").
 * 20×20, color on root + fill via currentColor.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  AddressBook,
  Network,
  Notebook,
  Phone,
  PhoneList,
  User,
  Users,
  WifiHigh,
} from "@phosphor-icons/react";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "lib", "test-icon");

/** @type {Array<{ file: string; Icon: import('react').ComponentType<Record<string, unknown>> }>} */
const MAP = [
  { file: "user.svg", Icon: User },
  { file: "users.svg", Icon: Users },
  { file: "network-node.svg", Icon: Network },
  { file: "wifi.svg", Icon: WifiHigh },
  { file: "address-book.svg", Icon: AddressBook },
  { file: "tel-book.svg", Icon: PhoneList },
  { file: "phone.svg", Icon: Phone },
];

const iconProps = {
  size: 20,
  weight: "fill",
  color: "currentColor",
};

function normalizePhosphorSvg(html) {
  return (
    html
      .replace(/\sclass="[^"]*"/g, "")
      .replace(/\saria-hidden="[^"]*"/g, "")
      .replace(
        '<svg xmlns="http://www.w3.org/2000/svg"',
        '<svg xmlns="http://www.w3.org/2000/svg" color="#7D8394"',
      ) + "\n"
  );
}

for (const { file, Icon } of MAP) {
  const raw = renderToStaticMarkup(createElement(Icon, iconProps));
  writeFileSync(join(outDir, file), normalizePhosphorSvg(raw), "utf8");
}

console.log(`Wrote ${MAP.length} filled icons to ${outDir}`);
