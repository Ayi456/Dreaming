import { qs } from "../../core/dom.js";

export function createContactFeature({ data, eventBus }) {
  return {
    id: "contact",

    mount(root) {
      const copyButton = qs("[data-copy-email]", root);
      const status = qs("[data-copy-status]", root);
      const mailLink = qs("[data-mail-link]", root);

      if (!copyButton) return;

      copyButton.dataset.email = data.email;
      if (mailLink) mailLink.href = "mailto:" + data.email;

      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(data.email);
        } catch (error) {
          const helper = document.createElement("textarea");
          helper.value = data.email;
          helper.setAttribute("readonly", "");
          helper.style.position = "fixed";
          helper.style.left = "-9999px";
          document.body.appendChild(helper);
          helper.select();
          document.execCommand("copy");
          helper.remove();
        }

        if (status) {
          status.textContent = "邮箱已复制。";
          window.setTimeout(() => {
            status.textContent = "";
          }, 2400);
        }

        eventBus.emit("contact:copied", { email: data.email });
      });
    }
  };
}
