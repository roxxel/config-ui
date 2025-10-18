import type { HtmlEscapedString } from "hono/utils/html";

type PageHtmlType = string | HtmlEscapedString | Promise<HtmlEscapedString>;

export type PageContext = {};

export type PageSchema = {
  title: string;
  html:
    | PageHtmlType
    | ((c: PageContext) => PageHtmlType | Promise<PageHtmlType>);
  path: "/" | (string & {})
};
