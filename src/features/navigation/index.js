import { qsa } from "../../core/dom.js";

export function createNavigationFeature({ eventBus }) {
  return {
    id: "navigation",

    mount(root) {
      qsa("[data-nav-link]", root).forEach((link) => {
        link.addEventListener("click", () => {
          eventBus.emit("navigation:used", { target: link.getAttribute("href") });
        });
      });
    }
  };
}
