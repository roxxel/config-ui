import type { HtmlEscapedString } from "hono/utils/html";
import type { BaseField, FieldProps } from ".";
import { html, raw } from "hono/html";

export type UIField = BaseField & {
  type: "ui";
  html: string | HtmlEscapedString | Promise<HtmlEscapedString>;
};

export const UIFieldHtml = ({ field }: FieldProps<UIField>) => {
  return html`${raw(field.html.toString())}`;
};
