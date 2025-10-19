import { html } from "hono/html";
import type { ConfigContext, BaseField, FieldProps } from ".";
import { cn } from "../../utils/cn";
import { FieldError } from "../../components/field-error";

export type CheckboxField = BaseField & {
  type: "checkbox";
  labelPlacement?: "left" | "right" | "top";
};

const CheckboxLabel = ({ field }: { field: CheckboxField }) => {
  return (
    <span class="text-base-content font-semibold">
      {field.label || field.name}
    </span>
  );
};

export const CheckboxFieldHtml = ({
  field,
  context,
}: FieldProps<CheckboxField>) => {
  const placement = field.labelPlacement || "right";
  return (
    <fieldset class="fieldset">
      <legend class="fieldset-legend">
        {placement === "top" && <CheckboxLabel field={field} />}
      </legend>
      <label class="label m-1">
        {placement === "left" && <CheckboxLabel field={field} />}
        <input
          type="checkbox"
          name={field.name}
          checked={context.getFieldValue(field.name) || false}
          class="checkbox rounded-md checkbox-xl"
        />
        {placement === "right" && <CheckboxLabel field={field} />}
      </label>
    </fieldset>
  );
};
