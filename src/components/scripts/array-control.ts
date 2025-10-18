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
        const newItem = template.firstElementChild.cloneNode(true);
        // Update names with correct index
        const items = fieldset.querySelectorAll("div[data-array-item]");
        const emptyMessage = fieldset.querySelector("[data-array-empty]");
        emptyMessage.classList.add("hidden");
        const newIndex = Math.max(items.length - 1, 0);
        newItem.querySelectorAll("[name]").forEach((input) => {
          const name = input.getAttribute("name");
          console.log("Old name:", name);
          const newName = name.replace("-1", newIndex);
          console.log("New name:", newName);
          input.setAttribute("name", newName);
        });
        newItem.setAttribute("data-array-item", "");
        fieldset.appendChild(newItem);
      }

      function removeButtonEventListener(button) {
        const fieldName = button.getAttribute("data-field-name");
        const fieldset = button.closest(
          'fieldset[data-field-name="' + fieldName + '"]'
        );
        const items = fieldset.querySelectorAll("div[data-array-item]");
        const emptyMessage = fieldset.querySelector("[data-array-empty]");
        console.log(items);
        if (items.length - 2 === 0) {
          emptyMessage.classList.remove("hidden");
        }
        const item = button.closest("div[data-array-item]");
        fieldset.removeChild(item);
      }
    </script>
  `;
};
