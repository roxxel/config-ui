import type { PageContext, PageSchema } from "../pages";

export const renderPage = async (page: PageSchema, context: PageContext) => {
  let html = page.html as any;

  if (typeof html === "function") {
    html = (html as Function)(context);
  }

  if (html && typeof (html as Promise<any>).then === "function") {
    html = await html;
  }
  return html;
};
