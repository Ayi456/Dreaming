import { createElement, qs } from "../../core/dom.js";

function createDialog() {
  const dialog = createElement("dialog", { className: "gallery-dialog" });
  dialog.innerHTML = `
    <div class="gallery-dialog-body">
      <button class="dialog-close button button-secondary" type="button" data-gallery-close>关闭</button>
      <div class="gallery-dialog-visual" data-dialog-visual></div>
      <p class="kicker">画廊项目</p>
      <h3 data-dialog-title></h3>
      <p data-dialog-description></p>
    </div>
  `;
  return dialog;
}

function renderGalleryItem(item, dialog, eventBus) {
  const card = createElement("button", {
    className: "gallery-card",
    type: "button",
    "data-reveal": ""
  });

  card.innerHTML = `
    <span class="gallery-visual ${item.visual}" aria-hidden="true"></span>
    <span class="gallery-card-copy">
      <span class="gallery-type">${item.type}</span>
      <span class="gallery-title">${item.title}</span>
      <span class="gallery-description">${item.description}</span>
    </span>
  `;

  card.addEventListener("click", () => {
    qs("[data-dialog-title]", dialog).textContent = item.title;
    qs("[data-dialog-description]", dialog).textContent = item.description;
    const visual = qs("[data-dialog-visual]", dialog);
    visual.className = "gallery-dialog-visual " + item.visual;
    dialog.showModal();
    eventBus.emit("gallery:opened", item);
  });

  return card;
}

export function createGalleryFeature({ data, eventBus }) {
  let dialog;

  return {
    id: "gallery",

    mount(root) {
      const container = qs("[data-gallery]", root);
      if (!container) return;

      dialog = createDialog();
      dialog.querySelector("[data-gallery-close]").addEventListener("click", () => dialog.close());
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
          dialog.close();
        }
      });

      document.body.append(dialog);
      container.replaceChildren(...data.gallery.map((item) => renderGalleryItem(item, dialog, eventBus)));
    },

    destroy() {
      dialog?.remove();
    }
  };
}
