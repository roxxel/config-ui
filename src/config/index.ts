import type { Field } from "./fields";

export type ConfigSchema = {
  title: string;
  slug: string;
  fields: Field[];
};
