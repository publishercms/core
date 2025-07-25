import { ModuleLoader } from "../../src/infra/module-loader.ts";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);
const sourceFile = "./src/db/schema.ts";
const targetFile = "./src/db/schema.gen.ts";

async function generateSchemas() {
  try {
    console.log("🔄 Loading modules and schemas...");

    // Initialize module loader
    const moduleLoader = new ModuleLoader();
    const schemaContent = await Deno.readTextFile(sourceFile);

    // Load all modules from the modules directory
    // Adjust the path according to your project structure
    await moduleLoader.loadModulesFromDirectory("./src/modules");

    console.log("✓ All modules loaded successfully");

    const exportStatements = moduleLoader.getModules().map(module => {
      if (module.schema) {
        let exportString = ''
        Object.keys(module.schema).forEach((schemaName, index) => {
          exportString += `${schemaName}${((index + 1) == Object.keys(module.schema).length) ? "" : ", "}`;
        });

        return `export { ${exportString} } from '../.${module.path}';`
      }

      return '';
    }).join('\n');

    const generatedContent = exportStatements + '\n\n' + schemaContent;

    // Write to target file
    console.log(`Writing to ${targetFile}...`);
    await Deno.writeTextFile(targetFile, generatedContent);

    console.log(`✅ Successfully generated ${targetFile}`);

    // Now run drizzle generate
    console.log("🚀 Running drizzle generate...");
    const { stdout, stderr } = await execAsync("deno -A npm:drizzle-kit generate --config=./drizzle.config.ts");

    if (stderr) {
      console.error("Drizzle generate stderr:", stderr);
    }

    if (stdout) {
      console.log("Drizzle generate output:", stdout);
    }

    console.log("✅ Schema generation completed");

    // Cleanup
    await Deno.remove(targetFile);
  } catch (error) {
    console.error("❌ Error during schema generation:", error);

    // Cleanup
    await Deno.remove(targetFile);
    process.exit(1);
  }
}

if (import.meta.main) {
  generateSchemas();
}
