import { html } from "hono/html";
import type { BaseField, FieldProps, Field } from ".";
import { renderField } from "../../utils/render-field";
import { cn } from "../../utils/cn";

export type RowField = BaseField & {
  type: "row";
  fields: Field[];
  className?: string;
};

export const RowFieldHtml = ({ field, context }: FieldProps<RowField>) => {
  if (field.fields.some((f) => f.type === "row")) {
    throw new Error("Nested row fields are not supported.");
  }
  return html`
    <div class="${cn("flex gap-4", field.className)}">
      ${field.fields.map((f) =>
        renderField({
          field: f,
          context,
        })
      )}
    </div>
  `;
};
