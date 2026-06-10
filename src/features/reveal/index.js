import { qsa } from "../../core/dom.js";

export function createRevealFeature({ reduceMotion }) {
  let observer;

  return {
    id: "reveal",

    mount(root) {
      const items = qsa("[data-reveal]", root);

      if (!("IntersectionObserver" in window) || reduceMotion.matches) {
        items.forEach((item) => item.classList.add("is-visible"));
        return;
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16 });

      items.forEach((item) => observer.observe(item));
    },

    destroy() {
      observer?.disconnect();
    }
  };
}
