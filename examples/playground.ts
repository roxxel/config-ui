import { Hono } from "hono";
import { FileDbAdapter, ConfigUI } from "../src";
import { html } from "hono/html";

const app = new Hono();

app.route(
  "/",
  ConfigUI({
    prefix: "/configui",
    dbAdapter: new FileDbAdapter("./examples/data"),
    pages: [
      {
        title: "Status",
        html: async () => {
          const now = new Date().toLocaleString();
          return html`<div class="p-6">
            <h1 class="text-2xl font-bold mb-4">System Status</h1>
            <p>All systems are operational.</p>
            <p class="text-sm text-muted">Server time: ${now}</p>
          </div>`;
        },
        path: "status",
      },

      {
        title: "Home",
        html: html`<div class="p-6">
          <h1 class="text-2xl font-bold mb-4">Welcome to Config UI</h1>
          <p>This is the home page of the configuration interface.</p>
          <p class="mt-2">
            Use <a class="link" href="/configui/status">Status</a> to see a
            dynamic page.
          </p>
        </div>`,
        path: "/",
      },

      {
        title: "About",
        html: Promise.resolve(
          html`<div class="p-6">
            <h1 class="text-2xl font-bold mb-4">About</h1>
            <p>
              This example shows how pages can be static, async, or
              promise-based.
            </p>
          </div>`
        ),
        path: "about",
      },
    ],
    configs: [
      {
        title: "Application",
        slug: "app",
        fields: [
          {
            type: "text",
            name: "apiKey",
            label: "API Key",
            placeholder: "Enter your API key",
            required: true,
          },
          {
            type: "ui",
            name: "customUI",
            html: html`<div role="alert" class="alert alert-info alert-soft">
              <span
                >Example notice: this UI block is rendered from the
                config.</span
              >
            </div>`,
          },
          {
            type: "row",
            name: "credentials",
            className: "w-full",
            fields: [
              {
                type: "text",
                name: "appName",
                label: "Application Name",
                placeholder: "My App",
                className: "w-full",
                required: true,
              },
              {
                type: "text",
                name: "adminPassword",
                label: "Admin Password",
                placeholder: "Enter admin password",
                className: "w-full",
                isPassword: true,
                required: true,
              },
            ],
          },
          {
            type: "number",
            name: "defaultPort",
            label: "Default Port",
            placeholder: "8080",
            required: true,
          },
          {
            type: "text",
            name: "description",
            label: "Application Description",
            placeholder: "Describe your application",
            isTextArea: true,
            className: "w-full",
          },
          {
            type: "array",
            label: "WEBHOOKS",
            name: "webhooks",
            fields: [
              {
                type: "row",
                name: "webhookItem",
                fields: [
                  {
                    type: "text",
                    name: "url",
                    label: "Webhook URL",
                    placeholder: "https://example.com/webhook",
                    required: true,
                  },
                  {
                    type: "text",
                    name: "method",
                    label: "HTTP Method",
                    placeholder: "POST",
                    required: true,
                  },
                  {
                    type: "checkbox",
                    name: "enabled",
                    label: "Enabled",
                    labelPlacement: "top",
                    required: true,
                  },
                ],
              },
            ],
            className: "my-4 w-full",
          },
        ],
      },
    ],
  })
);

export default {
  port: 3001,
  fetch: app.fetch,
};
