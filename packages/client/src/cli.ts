#!/usr/bin/env node
import { setupTypes } from "./dev-types.js";

// Simple arg parsing
const args = process.argv.slice(2);
const command = args[0];

async function main() {
  if (command === "get-env") {
    const urlIndex = args.indexOf("--url");
    if (urlIndex === -1 || !args[urlIndex + 1]) {
      console.error("❌ Missing --url parameter");
      process.exit(1);
    }

    const apiUrl = args[urlIndex + 1];
    await setupTypes(apiUrl + "/client-schema.d.ts");
  } else {
    console.log(`
Usage:
  publishercms-client get-env --url <api-url>

Example:
  publishercms-client get-env --url https://api.example.com/
    `);
  }
}

main();
