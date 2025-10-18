import type { DbAdapter } from ".";
import path from "path";
import fs from "fs/promises";

export class FileDbAdapter implements DbAdapter {
  private baseDir: string;

  constructor(baseDir: string) {
    this.baseDir = baseDir;
  }

  async readConfigFieldsBySlug(slug: string): Promise<Record<string, any>> {
    const filePath = path.join(this.baseDir, `${slug}.json`);
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data) as Record<string, any>;
    } catch (error: any) {
      if (error?.code === "ENOENT") {
        return {};
      }
      throw error;
    }
  }

  async saveFields(slug: string, fields: Record<string, any>): Promise<void> {
    const filePath = path.join(this.baseDir, `${slug}.json`);
    const data = JSON.stringify(fields, null, 2);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, data);
  }
}
