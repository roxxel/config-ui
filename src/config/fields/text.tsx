import { html } from "hono/html";
import type { ConfigContext, BaseField, FieldProps } from ".";
import { cn } from "../../utils/cn";
import { FieldError } from "../../components/field-error";
import { RequiredMark } from "../../components/RequiredMark";

export type TextField = BaseField & {
  type: "text";
  placeholder?: string;
  isPassword?: boolean;
  isTextArea?: boolean;
};

export const TextFieldHtml = ({ field, context }: FieldProps<TextField>) => {
  const Comp = field.isTextArea ? "textarea" : "input";
  return (
    <fieldset
      class={cn("fieldset m-0", field.className)}
      data-field-name={field.name}
    >
      <legend class="fieldset-legend">
        {field.label || field.name}
        {field.required && <RequiredMark />}
      </legend>
      <Comp
        class={cn(field.isTextArea ? "textarea" : "input", "w-full")}
        name={field.name}
        type={field.isPassword ? "password" : "text"}
        required={field.required}
        value={context.getFieldValue(field.name) || ""}
        placeholder={field.placeholder || ""}
      >
        {field.isTextArea ? context.getFieldValue(field.name) : undefined}
      </Comp>
      <p class="label">
        <FieldError message={context.getFieldError(field.name)} />
      </p>
    </fieldset>
  );
};
