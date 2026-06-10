import { createElement, qs } from "../../core/dom.js";

function createProjectCard(project, eventBus) {
  const card = createElement("article", { className: "seed-card", "data-reveal": "" });
  const button = createElement("button", {
    className: "seed-toggle",
    type: "button",
    "aria-expanded": "false"
  });

  button.innerHTML = `
    <span class="seed-top">
      <span class="seed-dot" aria-hidden="true"></span>
      <span class="seed-number">${project.number}</span>
    </span>
    <span class="seed-content">
      <span class="seed-title">${project.title}</span>
      <span class="seed-summary">${project.summary}</span>
    </span>
    <span class="seed-meta">
      <span>${project.category}</span>
      <span data-seed-label>展开</span>
    </span>
  `;

  const details = createElement("div", { className: "seed-details", "aria-hidden": "true" });
  details.innerHTML = `
    <div>
      <dl>
        <div>
          <dt>问题</dt>
          <dd>${project.problem}</dd>
        </div>
        <div>
          <dt>做法</dt>
          <dd>${project.approach}</dd>
        </div>
        <div>
          <dt>结果</dt>
          <dd>${project.result}</dd>
        </div>
      </dl>
    </div>
  `;

  button.addEventListener("click", () => {
    const isOpen = card.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    details.setAttribute("aria-hidden", String(!isOpen));
    qs("[data-seed-label]", button).textContent = isOpen ? "收起" : "展开";

    if (isOpen) {
      eventBus.emit("project:opened", {
        id: project.id,
        rect: card.getBoundingClientRect()
      });
    }
  });

  card.append(button, details);
  return card;
}

export function createProjectSeedsFeature({ data, eventBus }) {
  return {
    id: "project-seeds",

    mount(root) {
      const container = qs("[data-project-seeds]", root);
      if (!container) return;
      container.replaceChildren(...data.projects.map((project) => createProjectCard(project, eventBus)));
    }
  };
}
