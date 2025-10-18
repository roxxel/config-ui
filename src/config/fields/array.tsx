import { html } from "hono/html";
import type { ConfigContext, BaseField, FieldProps, Field } from ".";
import { renderField } from "../../utils/render-field";
import { cn } from "../../utils/cn";
import type { RowField } from "./row";

export type ArrayField = BaseField & {
  type: "array";
  fields: Field[];
  className?: string;
};

export const ArrayFieldHtml = ({ field, context }: FieldProps<ArrayField>) => {
  if (field.fields.some((f) => f.type === "array")) {
    throw new Error("Nested array fields are not supported.");
  }
  const value = context.getFieldValue(field.name);

  const renderItem = (item: any, index: number) => {
    return (
      <div class="p-4 border-neutral border rounded" data-array-item>
        {field.fields.map((f) => {
          if (f.type === "row") {
            return renderField({
              field: {
                ...f,
                fields: f.fields.map((rf) => ({
                  ...rf,
                  name: `${field.name}[${index}][${rf.name}]`,
                })),
              } as RowField,
              context,
            });
          }
          return renderField({
            field: {
              ...f,
              name: `${field.name}[${index}][${f.name}]`,
            },
            context,
          });
        })}
        <button
          type="button"
          class="btn btn-error btn-sm btn-outline mt-2"
          data-array-remove-button
          onclick="removeButtonEventListener(this)"
          data-field-name={field.name}
        >
          Remove Item
        </button>
      </div>
    );
  };

  return (
    <fieldset
      data-array-field
      data-field-name={field.name}
      class={cn("fieldset", field.className)}
    >
      <div class="hidden" data-array-field-template>
        {renderItem({}, -1)}
      </div>
      <legend class="fieldset-legend">
        {field.label || field.name}
        <button
          data-field-name={field.name}
          data-array-add-button
          type="button"
          onclick="addButtonEventListener(this)"
          class="btn btn-primary btn-sm btn-outline"
        >
          Add Item
        </button>
      </legend>

      <p
        class={cn(
          "label",
          Array.isArray(value) && value.length > 0 && "hidden"
        )}
        data-array-empty
      >
        No items available.
      </p>
      {Array.isArray(value) &&
        value.map((_: any, index: number) => renderItem(_, index))}
    </fieldset>
  );
};
