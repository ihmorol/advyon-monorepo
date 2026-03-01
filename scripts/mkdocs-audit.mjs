#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { join, normalize } from "node:path";

const configPath = "mkdocs.yml";
let config;
try {
  config = readFileSync(configPath, "utf8");
} catch (err) {
  console.error(`mkdocs-audit: Unable to read ${configPath}.`, err);
  process.exit(1);
}

const docsDirMatch = config.match(/docs_dir:\s*([^\n]+)/);
const docsDir = docsDirMatch ? docsDirMatch[1].trim() : "docs";

const navRegex = /:\s+([^\s#]+\.md)/g;
const navEntries = [];
let match;
while ((match = navRegex.exec(config)) !== null) {
  const relativePath = match[1].trim();
  if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
    continue;
  }
  navEntries.push(relativePath);
}

const missing = [];
for (const relative of navEntries) {
  const diskPath = normalize(join(docsDir, relative));
  if (!existsSync(diskPath)) {
    missing.push({ relative, diskPath });
  }
}

if (missing.length > 0) {
  console.error("mkdocs-audit: Missing files referenced in nav:");
  for (const item of missing) {
    console.error(`  - ${item.relative} (expected at ${item.diskPath})`);
  }
  process.exit(1);
}

console.log(`mkdocs-audit: ${navEntries.length} nav entries verified under ${docsDir}/`);
