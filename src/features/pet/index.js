import { createElement, qs } from "../../core/dom.js";

const reactions = {
  curious: "我在看花园生长。",
  happy: "新种子发芽了。",
  gallery: "这张作品有点意思。",
  project: "项目开花了。",
  copied: "联系方式已经备好。"
};

const moodFrames = {
  curious: "wave",
  happy: "happy",
  gallery: "wave",
  project: "wave",
  copied: "happy"
};

export function createPetFeature({ data, eventBus, store, reduceMotion }) {
  let root;
  let bubble;
  let pet;
  let image;
  let dragState = null;
  let frameTimer = 0;
  const cleanups = [];

  function speak(mood) {
    store.set({ petMood: mood });
    if (bubble) bubble.textContent = reactions[mood] ?? reactions.curious;
    setFrame(moodFrames[mood] ?? "idle");

    if (!reduceMotion.matches && pet) {
      pet.classList.remove("is-reacting");
      window.requestAnimationFrame(() => pet.classList.add("is-reacting"));
    }
  }

  function setFrame(frameName) {
    if (!image) return;
    const nextFrame = data.mascot.frames[frameName] ?? data.mascot.frames.idle;
    image.src = nextFrame;
    image.dataset.frame = frameName;

    window.clearTimeout(frameTimer);
    if (frameName !== "idle") {
      frameTimer = window.setTimeout(() => {
        image.src = data.mascot.frames.idle;
        image.dataset.frame = "idle";
      }, 1600);
    }
  }

  function startDrag(event) {
    dragState = {
      startX: event.clientX,
      startY: event.clientY,
      left: root.offsetLeft,
      top: root.offsetTop
    };
    root.setPointerCapture?.(event.pointerId);
  }

  function moveDrag(event) {
    if (!dragState) return;
    const nextLeft = dragState.left + event.clientX - dragState.startX;
    const nextTop = dragState.top + event.clientY - dragState.startY;
    root.style.left = Math.max(12, Math.min(window.innerWidth - 104, nextLeft)) + "px";
    root.style.top = Math.max(84, Math.min(window.innerHeight - 118, nextTop)) + "px";
    root.style.right = "auto";
    root.style.bottom = "auto";
  }

  function stopDrag() {
    dragState = null;
  }

  return {
    id: "pet",

    mount(appRoot) {
      root = qs("[data-pet-root]", appRoot);
      if (!root) return;

      root.append(
        createElement("div", { className: "pet-bubble", text: reactions.curious }),
        createElement("button", {
          className: "pet",
          type: "button",
          "aria-label": "网页宠物"
        }, [
          createElement("img", {
            className: "mascot-image",
            src: data.mascot.frames.idle,
            alt: "",
            "data-frame": "idle",
            draggable: "false"
          })
        ])
      );

      bubble = qs(".pet-bubble", root);
      pet = qs(".pet", root);
      image = qs(".mascot-image", root);

      pet.addEventListener("click", () => speak("curious"));
      root.addEventListener("pointerdown", startDrag);
      root.addEventListener("pointermove", moveDrag);
      root.addEventListener("pointerup", stopDrag);
      root.addEventListener("pointercancel", stopDrag);

      cleanups.push(
        eventBus.on("seed:planted", () => speak("happy")),
        eventBus.on("gallery:opened", () => speak("gallery")),
        eventBus.on("project:opened", () => speak("project")),
        eventBus.on("contact:copied", () => speak("copied"))
      );
    },

    destroy() {
      cleanups.forEach((cleanup) => cleanup());
      window.clearTimeout(frameTimer);
      root?.replaceChildren();
    }
  };
}
