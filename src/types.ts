import type { DbAdapter } from "./adapters";
import type { ConfigSchema } from "./config";
import type { PageSchema } from "./pages";

export type ConfigUIOptions = {
  prefix?: string;
  title?: string;
  daisyUITheme?: string;
  configs?: ConfigSchema[];
  dbAdapter: DbAdapter;
  customCss?: string;
  pages?: PageSchema[];
};
