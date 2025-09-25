import fs from "fs";
import path from "path";
import { z } from "zod";

import {
  ContentBlockSchema,
  PostTypeSchema,
} from "../infra/configSchemas";

// Add accepted schemas here
const schemaMap = {
  postType: PostTypeSchema,
  contentBlock: ContentBlockSchema
} as const;

export type SchemaTypes = keyof typeof schemaMap;
type SchemaMapWithType = {
  [K in SchemaTypes]: z.infer<(typeof schemaMap)[K]> & { $type: `cms.${K}` }
};

class ConfigurationService {
  private configDir: string;
  private loadedSchemas: Record<string, any[]> = {};

  constructor(configDir: string) {
    this.configDir = configDir;
    this.loadConfigs();
  };

  private loadConfigs() {
    const files = fs.readdirSync(this.configDir);

    for (const file of files) {
      if (!file.endsWith(".json")) continue;

      // Match "page.<category>.json"
      const match = file.match(/^page\.(\w+)\.json$/);
      if (!match) continue;

      const category = match[1] as SchemaTypes;

      const filePath = path.join(this.configDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const json = JSON.parse(raw);

      // Validate with zod
      const parsed = schemaMap[category].safeParse(json);
      if (!parsed.success) {
        console.error(`Invalid config in ${file}:`, parsed.error.format());
        continue;
      }

      if (this.loadedSchemas[category] == null) {
        this.loadedSchemas[category] = [];
      }

      this.loadedSchemas[category].push({
        $type: `cms.${category}` as const,
        ...parsed.data
      });
    }
  };

  public getSchemaTypes() {
    return Object.keys(schemaMap);
  };

  public getLoadedSchemasFor<T extends SchemaTypes>(type: T): SchemaMapWithType[T][] {
    if (this.loadedSchemas[type] == null) {
      return [];
    }

    return this.loadedSchemas[type] as SchemaMapWithType[T][];
  };
};

export const configurationService = new ConfigurationService(
  path.join(__dirname, "../../config")
);
