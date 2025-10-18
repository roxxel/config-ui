import { html } from "hono/html";
import type { ConfigContext, BaseField, FieldProps } from ".";
import { cn } from "../../utils/cn";
import { FieldError } from "../../components/field-error";

export type TextField = BaseField & {
  type: "text";
  placeholder?: string;
  isPassword?: boolean;
};

export const TextFieldHtml = ({ field, context }: FieldProps<TextField>) => {
  return (
    <fieldset
      class={cn("fieldset m-0", field.className)}
      data-field-name={field.name}
    >
      <legend class="fieldset-legend">{field.label || field.name}</legend>
      <input
        class={cn("input w-full")}
        name={field.name}
        type={field.isPassword ? "password" : "text"}
        value={context.getFieldValue(field.name) || ""}
        placeholder={field.placeholder || ""}
      />
      <p class="label">
        <FieldError message={context.getFieldError(field.name)} />
      </p>
    </fieldset>
  );
};
