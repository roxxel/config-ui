import { html } from "hono/html";
import type { ConfigContext, BaseField, FieldProps } from ".";
import { cn } from "../../utils/cn";
import { FieldError } from "../../components/field-error";
import { RequiredMark } from "../../components/RequiredMark";

export type NumberField = BaseField & {
  type: "number";
  placeholder?: string;
};

export const NumberFieldHtml = ({
  field,
  context,
}: FieldProps<NumberField>) => {
  return (
    <fieldset class="m-0 fieldset" data-field-name={field.name}>
      <legend class="fieldset-legend">
        {field.label || field.name}
        <RequiredMark />
      </legend>
      <input
        class="input"
        type="number"
        name={field.name}
        required={field.required}
        value={context.getFieldValue(field.name) || ""}
        placeholder={field.placeholder || ""}
      />
      <p class="label">
        <FieldError message={context.getFieldError(field.name)} />
      </p>
    </fieldset>
  );
};
