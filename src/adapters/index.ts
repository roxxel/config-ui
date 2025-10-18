export interface DbAdapter {
  readConfigFieldsBySlug: (slug: string) => Promise<Record<string, any>>;
  saveFields: (slug: string, fields: Record<string, any>) => Promise<void>;
}

export { FileDbAdapter } from "./file";
