import fs from "fs";
import path from "path";
import fetch from "node-fetch";

export async function setupTypes(typeUrl: string) {
  if (typeof window !== "undefined") {
    // running in browser → skip
    return;
  }

  const typesDir = path.resolve(process.cwd(), ".publishercms");
  const typesFile = path.join(typesDir, "remote-types.d.ts");

  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir);
  }

  const res = await fetch(typeUrl);
  if (!res.ok) throw new Error(`Failed to fetch types: ${res.status}`);
  const content = await res.text();

  fs.writeFileSync(typesFile, content, "utf-8");
  console.log(`✅ Types written to ${typesFile}`);
}
