import { createElement, qs } from "../../core/dom.js";

function createAbilityCard(ability) {
  const card = createElement("article", { className: "ability-card", "data-reveal": "" });
  const title = createElement("h3", { text: ability.title });
  const description = createElement("p", { text: ability.description });
  const list = createElement("ul", { className: "ability-list", "aria-label": ability.title + "能力" });

  ability.tags.forEach((tag) => {
    list.append(createElement("li", { text: tag }));
  });

  card.append(title, description, list);
  return card;
}

export function createAbilitiesFeature({ data }) {
  return {
    id: "abilities",

    mount(root) {
      const container = qs("[data-abilities]", root);
      if (!container) return;
      container.replaceChildren(...data.abilities.map(createAbilityCard));
    }
  };
}
