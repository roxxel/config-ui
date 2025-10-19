import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { renderer } from "./renderer";
import { ConfigForm } from "./components/config-form";
import { parseArrayFieldName } from "./utils/parse-array-field-name";
import type { BaseField, ConfigContext, Field } from "./config/fields";
import type { ConfigUIOptions } from "./types";
import { renderPage } from "./utils/render-page";

type ConfigUIContext = {
  options: ConfigUIOptions;
};

export type Variables = {
  configUI: ConfigUIContext;
};

export const ConfigUI = (opts: ConfigUIOptions) => {
  opts.configs = opts.configs || [];
  opts.pages = opts.pages || [];
  if (
    opts.pages!.some(
      (p) => p.path.startsWith("/configs") || p.path.startsWith("configs")
    )
  ) {
    throw new Error(
      "Page paths cannot start with /configs as it is reserved for configuration forms."
    );
  }
  return new Hono<{
    Variables: Variables;
  }>()
    .basePath(opts.prefix || "")
    .use(trimTrailingSlash())
    .use(async (c, next) => {
      c.set("configUI", { options: opts });
      await next();
    })
    .use(renderer(opts))
    .get("/", async (c) => {
      const homePage = opts.pages!.find((p) => p.path === "/");
      if (homePage) {
        return c.render(await renderPage(homePage, {}));
      }
      return c.render(
        <div>
          <h1 class="text-3xl text-amber-300 font-bold underline">ConfigUI</h1>
          <p>Work in progress</p>
        </div>
      );
    })
    .get("/configs/:slug", async (c) => {
      const slug = c.req.param("slug");

      const config = opts.configs!.find((cfg) => cfg.slug === slug);
      if (!config) {
        return c.text("Config not found", 404);
      }
      const savedFields = await opts.dbAdapter.readConfigFieldsBySlug(slug);
      const context: ConfigContext = {
        getFieldValue: (name: string) => {
          const parsed = parseArrayFieldName(name);
          if (parsed) {
            const { baseName, index, fieldName } = parsed;
            return savedFields[baseName]?.[index]?.[fieldName];
          }
          return savedFields[name];
        },
        getFieldError: (name: string) => {
          return null;
        },
      };
      return c.render(
        <div class="bg-bg p-6 rounded-lg combined-shadow">
          <h1 class="text-2xl font-bold mb-4">{config.title}</h1>
          <ConfigForm
            config={config}
            context={context}
            prefix={opts.prefix || ""}
          />
        </div>
      );
    })
    .post("/configs/:slug", async (c) => {
      const slug = c.req.param("slug");
      const config = opts.configs!.find((cfg) => cfg.slug === slug);
      if (!config) {
        return c.text("Config not found", 404);
      }
      const formData = await c.req.formData();
      const sanitizedFields = config.fields
        .map((field) => {
          if (field.type === "array") {
            const arrayFields: Field[] = [];
            field.fields.forEach((f) => {
              // Unwrap row fields since rows are just for layout
              if (f.type === "row") {
                arrayFields.push(...f.fields);
              } else {
                arrayFields.push(f);
              }
            });
            return { ...field, fields: arrayFields };
          }
          if (field.type === "row") {
            // Same here, unwrap row fields
            return field.fields;
          }
          return field;
        })
        .flatMap((f) => f)
        .filter((x) => x.type !== "ui");

      const defaultValues: Record<Field["type"], any> = {
        text: null,
        ui: null,
        number: null,
        checkbox: false,
        array: [],
        row: null,
      };

      const fieldData = sanitizedFields.map((field) => {
        if (field.type === "array") {
          let length = Number(formData.get(`${field.name}[0][__length]`)) || 0;
          let data: any[] = [];
          for (let index = 0; index < length; index++) {
            let itemData: Record<string, any> = {};
            for (const f of field.fields) {
              const key = `${field.name}[${index}][${f.name}]`;
              const value = formData.get(key);
              //TODO: proper validation
              if (f.required && value === null) {
                itemData[f.name] = defaultValues[f.type];
              } else if (value !== null) {
                itemData[f.name] = value;
              } else {
                itemData[f.name] = null;
              }
            }
            data.push(itemData);
          }
          return { key: field.name, value: data };
        }
        const value = formData.get(field.name);
        if (field.required && value === null) {
          return { key: field.name, value: defaultValues[field.type] };
        } else if (value !== null) {
          return { key: field.name, value };
        } else {
          return { key: field.name, value: null };
        }
      });

      const fieldDataObj: Record<string, any> = Object.fromEntries(
        fieldData.map((fd) => [fd.key, fd.value])
      );

      await opts.dbAdapter.saveFields(
        slug,
        fieldDataObj as Record<string, any>
      );

      const savedFields = await opts.dbAdapter.readConfigFieldsBySlug(slug);
      const context: ConfigContext = {
        getFieldValue: (name: string) => {
          const parsed = parseArrayFieldName(name);
          if (parsed) {
            const { baseName, index, fieldName } = parsed;
            return savedFields[baseName]?.[index]?.[fieldName];
          }
          return savedFields[name];
        },
        getFieldError: (name: string) => {
          return null;
        },
      };
      return c.html(
        <ConfigForm
          config={config}
          context={context}
          prefix={opts.prefix || ""}
        />
      );
    })
    .get("/:path", async (c) => {
      const path = c.req.param("path");
      const page = opts.pages!.find((p) => p.path === path);
      if (!page) {
        return c.text("Page not found", 404);
      }
      return c.render(await renderPage(page, {}));
    });
};
