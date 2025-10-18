import {
  fieldMap,
  type FieldProps,
  type Field,
} from "../config/fields";

export const renderField = (fieldProps: FieldProps<Field>) => {
  const fieldRenderer = fieldMap[fieldProps.field.type];
  if (!fieldRenderer) {
    throw new Error(
      `No renderer found for field type: ${fieldProps.field.type}`
    );
  }
  return fieldRenderer(fieldProps);
};
