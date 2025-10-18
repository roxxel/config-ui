import { html } from "hono/html";

const Eye = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`

const EyeOff = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`

export const PasswordRevealScript = () => {
  return html` <script>
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach((input) => {
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.innerHTML = \`${Eye}\`;
        toggleButton.style.position = "absolute";
        toggleButton.style.right = "8px";
        toggleButton.style.top = "50%";
        toggleButton.style.transform = "translateY(-50%)";
        toggleButton.style.padding = "2px 6px";
        toggleButton.style.fontSize = "12px";
        toggleButton.style.cursor = "pointer";
        wrapper.appendChild(toggleButton);
        toggleButton.addEventListener("click", () => {
            if (input.type === "password") {
                input.type = "text";
                toggleButton.innerHTML = \`${EyeOff}\`;
            } else {
                input.type = "password";
                toggleButton.innerHTML = \`${Eye}\`;
            }
        });
    });
  </script> `;
};
