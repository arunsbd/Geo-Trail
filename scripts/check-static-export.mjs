import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const basePath = process.env.BASE_PATH ?? "";
const outputDirectory = resolve("out");
const html = readFileSync(resolve(outputDirectory, "index.html"), "utf8");

assert.match(html, /GeoTrail/);
assert.match(html, /Opening your trail/);
assert.match(html, /Enable JavaScript in your browser to play GeoTrail/);
assert.ok(existsSync(resolve(outputDirectory, "404.html")), "Missing static 404 page");

const assetUrls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((url) => url.includes("/_next/"));

assert.ok(assetUrls.some((url) => url.endsWith(".js")), "Missing JavaScript assets");
assert.ok(assetUrls.some((url) => url.endsWith(".css")), "Missing stylesheet assets");

for (const url of new Set(assetUrls)) {
  assert.ok(
    url.startsWith(`${basePath}/_next/`),
    `Asset must use the deployment path ${basePath || "/"}: ${url}`,
  );
  const relativePath = decodeURIComponent(url.slice(basePath.length + 1));
  assert.ok(
    existsSync(resolve(outputDirectory, relativePath)),
    `Missing exported asset: ${url}`,
  );
}

console.log(`Static export verified for ${basePath || "/"}: ${new Set(assetUrls).size} assets found.`);
