import { html } from "hono/html";

export const ArrayControlScript = () => {
  return html`
    <script>
      function addButtonEventListener(button) {
        const fieldName = button.getAttribute("data-field-name");
        const fieldset = button.closest(
          'fieldset[data-field-name="' + fieldName + '"]'
        );
        const template = fieldset.querySelector("[data-array-field-template]");
        const html = template.textContent;
        const newItem = document
          .createRange()
          .createContextualFragment(html).firstElementChild;
        const items = fieldset.querySelectorAll("div[data-array-item]");
        const emptyMessage = fieldset.querySelector("[data-array-empty]");
        emptyMessage.classList.add("hidden");
        const newIndex = Math.max(items.length, 0);
        newItem.querySelectorAll("[name]").forEach((input) => {
          const name = input.getAttribute("name");
          const newName = name.replace("-1", newIndex);
          input.setAttribute("name", newName);
          input.setAttribute("data-field-name", newName);
        });
        newItem.setAttribute("data-array-item", "");
        fieldset.appendChild(newItem);
        const lengthInput = fieldset.querySelector("[data-array-length]");
        if (lengthInput) {
          lengthInput.value = items.length + 1;
        }
      }

      function removeButtonEventListener(button) {
        const fieldName = button.getAttribute("data-field-name");
        const fieldset = button.closest(
          'fieldset[data-field-name="' + fieldName + '"]'
        );
        const items = fieldset.querySelectorAll("div[data-array-item]");
        const emptyMessage = fieldset.querySelector("[data-array-empty]");
        if (items.length - 1 === 0) {
          emptyMessage.classList.remove("hidden");
        }
        const item = button.closest("div[data-array-item]");
        fieldset.removeChild(item);
        const lengthInput = fieldset.querySelector("[data-array-length]");
        if (lengthInput) {
          lengthInput.value = items.length - 1;
        }
      }
    </script>
  `;
};
