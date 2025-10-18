import { ArrayFieldHtml, type ArrayField } from "./array";
import { NumberFieldHtml, type NumberField } from "./number";
import { RowFieldHtml, type RowField } from "./row";
import { TextFieldHtml, type TextField } from "./text";
import { UIFieldHtml, type UIField } from "./ui";

export type BaseField = {
  name: string;
  label?: string;
  className?: string;
};

export type Field = TextField | UIField | RowField | NumberField | ArrayField;

export const fieldMap: Record<Field["type"], any> = {
  text: TextFieldHtml,
  ui: UIFieldHtml,
  row: RowFieldHtml,
  number: NumberFieldHtml,
  array: ArrayFieldHtml,
};

export type ConfigContext = {
  getFieldValue: (fieldName: string) => any;
  getFieldError: (fieldName: string) => string | null;
};

export type FieldProps<T extends Field> = {
  field: T;
  context: ConfigContext;
};
