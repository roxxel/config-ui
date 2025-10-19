import { html, raw } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";
import { PasswordRevealScript } from "./components/scripts/password-reveal";
import { ArrayControlScript } from "./components/scripts/array-control";
import type { ConfigUIOptions } from "./types";

export const renderer = (props: ConfigUIOptions) =>
  jsxRenderer(({ children }) => {
    return (
      <html data-theme={props.daisyUITheme || "configui"}>
        <head>
          <meta charset="UTF-8" />
          <title>{props.title || "Config UI"}</title>
          <link
            href="https://cdn.jsdelivr.net/npm/daisyui@5"
            rel="stylesheet"
            type="text/css"
          />
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
          <script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.7/dist/htmx.min.js"></script>
          <style>{`
            :root:has(input.theme-controller[value=configui]:checked),[data-theme=configui] {
                --color-base-100: oklch(28.822% 0.022 277.508);
                --color-base-200: oklch(26.805% 0.02 277.508);
                --color-base-300: oklch(24.787% 0.019 277.508);
                --color-base-content: oklch(97.747% 0.007 106.545);
                --color-primary: oklch(75.461% 0.183 346.812);
                --color-primary-content: oklch(15.092% 0.036 346.812);
                --color-secondary: oklch(74.202% 0.148 301.883);
                --color-secondary-content: oklch(14.84% 0.029 301.883);
                --color-accent: oklch(83.392% 0.124 66.558);
                --color-accent-content: oklch(16.678% 0.024 66.558);
                --color-neutral: oklch(39.445% 0.032 275.524);
                --color-neutral-content: oklch(87.889% 0.006 275.524);
                --color-info: oklch(88.263% 0.093 212.846);
                --color-info-content: oklch(17.652% 0.018 212.846);
                --color-success: oklch(87.099% 0.219 148.024);
                --color-success-content: oklch(17.419% 0.043 148.024);
                --color-warning: oklch(95.533% 0.134 112.757);
                --color-warning-content: oklch(19.106% 0.026 112.757);
                --color-error: oklch(68.22% 0.206 24.43);
                --color-error-content: oklch(13.644% 0.041 24.43);
                --radius-selector: 1rem;
                --radius-field: 0.5rem;
                --radius-box: 1rem;
                --size-selector: 0.25rem;
                --size-field: 0.25rem;
                --border: 1px;
                --depth: 0;
                --noise: 0;
            }

            .htmx-indicator{
                display:none;
            }
            .htmx-request .htmx-indicator{
                display:inline;
            }
            .htmx-request.htmx-indicator{
                display:inline;
            }
            ${props.customCss}
          `}</style>
          {props.head && raw(props.head)}
        </head>
        <body>
          <ul class="menu bg-base-200 fixed h-screen rounded-r-box w-56 flex flex-col">
            <li>
              <h2 class="menu-title text-xl font-bold">
                {props.title || "Config UI"}
              </h2>
              <li>
                <a href={props.prefix || "/"}>
                  {props.pages!.find((p) => p.path === "/")?.title || "Home"}
                </a>
              </li>
              {props
                .pages!.filter((x) => x.path !== "/")
                .map((page) => (
                  <li>
                    <a
                      href={`${props.prefix || ""}/${page.path.replace(
                        /^[\/]+|[\/]+$/,
                        ""
                      )}`}
                    >
                      {page.title}
                    </a>
                  </li>
                ))}
              <li>
                <h2 class="menu-title">Configs</h2>
                {props.configs!.length === 0 && (
                  <p class="pl-6 text-sm menu-title font-normal text-base-content/70">
                    No configs available.
                  </p>
                )}
                <ul>
                  {props.configs!.map((config) => (
                    <li>
                      <a href={`${props.prefix || ""}/configs/${config.slug}`}>
                        {config.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </li>

            <div class="mt-auto mb-4 px-4 text-sm text-center">
              <p>
                Leave a{" "}
                <span role="img" aria-label="star">
                  ⭐️
                </span>{" "}
                on{" "}
                <a
                  rel="noopener noreferrer"
                  href="https://github.com/roxxel/config-ui"
                  target="_blank"
                  class="link"
                >
                  GitHub
                </a>{" "}
                <span role="img" aria-label="heart">
                  ❤️
                </span>
              </p>
            </div>
          </ul>

          <main class="p-4 ml-56 w-[calc(100%-14rem)]">{children}</main>
          <PasswordRevealScript />
          <ArrayControlScript />
        </body>
      </html>
    );
  });
