import { qs } from "../../core/dom.js";

export function createGardenFeature({ eventBus, store, reduceMotion }) {
  let canvas;
  let ctx;
  let animationFrame = 0;
  let removeResize;
  let removePointer;
  let removeButton;
  let unsubscribeStore;
  const cleanups = [];

  const pointer = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.46
  };

  const garden = {
    width: 0,
    height: 0,
    ratio: Math.min(window.devicePixelRatio || 1, 2),
    sprouts: []
  };

  const stems = Array.from({ length: 34 }, (_, index) => ({
    x: (index + 0.4 + Math.random() * 0.4) / 34,
    base: 0.76 + Math.random() * 0.2,
    height: 0.16 + Math.random() * 0.34,
    sway: 0.6 + Math.random() * 1.8,
    phase: Math.random() * Math.PI * 2,
    leaf: Math.random() > 0.42
  }));

  const motes = Array.from({ length: 72 }, () => ({
    x: Math.random(),
    y: Math.random(),
    speed: 0.08 + Math.random() * 0.22,
    size: 0.8 + Math.random() * 2.2,
    phase: Math.random() * Math.PI * 2
  }));

  function resizeCanvas() {
    garden.width = window.innerWidth;
    garden.height = window.innerHeight;
    garden.ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(garden.width * garden.ratio);
    canvas.height = Math.floor(garden.height * garden.ratio);
    canvas.style.width = garden.width + "px";
    canvas.style.height = garden.height + "px";
    ctx.setTransform(garden.ratio, 0, 0, garden.ratio, 0, 0);
  }

  function drawPointerLight() {
    const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 260);
    gradient.addColorStop(0, "rgba(124,205,114,0.16)");
    gradient.addColorStop(0.45, "rgba(124,205,114,0.06)");
    gradient.addColorStop(1, "rgba(124,205,114,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, garden.width, garden.height);
  }

  function drawMotes(time) {
    const drift = time * 0.000035;
    motes.forEach((mote) => {
      const x = ((mote.x + drift * mote.speed) % 1) * garden.width;
      const y = ((mote.y + Math.sin(time * 0.0005 + mote.phase) * 0.016 + 1) % 1) * garden.height;
      const dx = pointer.x - x;
      const dy = pointer.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const glow = Math.max(0, 1 - distance / 240);
      ctx.fillStyle = "rgba(105,166,100," + (0.08 + glow * 0.22) + ")";
      ctx.beginPath();
      ctx.arc(x, y, mote.size + glow * 2.4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawStem(stem, time) {
    const baseX = stem.x * garden.width;
    const baseY = stem.base * garden.height;
    const topY = baseY - stem.height * garden.height;
    const pointerPull = (pointer.x - baseX) / garden.width;
    const sway = Math.sin(time * 0.001 * stem.sway + stem.phase) * 9 + pointerPull * 18;

    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.bezierCurveTo(baseX + sway * 0.4, baseY - 60, baseX + sway, topY + 64, baseX + sway * 0.7, topY);
    ctx.strokeStyle = "rgba(93,151,86,0.24)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    if (stem.leaf) {
      const leafX = baseX + sway * 0.52;
      const leafY = topY + 36;
      ctx.save();
      ctx.translate(leafX, leafY);
      ctx.rotate(sway * 0.012);
      ctx.fillStyle = "rgba(124,205,114,0.18)";
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function addCanvasSprout(x, y) {
    garden.sprouts.push({ x, y, start: performance.now() });
  }

  function drawSprouts(time) {
    garden.sprouts = garden.sprouts.filter((sprout) => time - sprout.start < 1900);
    garden.sprouts.forEach((sprout) => {
      const age = Math.min(1, (time - sprout.start) / 1900);
      const height = 18 + age * 70;
      const alpha = 1 - Math.max(0, age - 0.72) / 0.28;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(sprout.x, sprout.y);
      ctx.strokeStyle = "rgba(93,151,86,0.68)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(8 * Math.sin(age * Math.PI), -height * 0.52, 0, -height);
      ctx.stroke();
      ctx.fillStyle = "rgba(124,205,114,0.62)";
      ctx.beginPath();
      ctx.ellipse(-10, -height * 0.58, 12, 5, -0.55, 0, Math.PI * 2);
      ctx.ellipse(11, -height * 0.72, 12, 5, 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function render(time) {
    ctx.clearRect(0, 0, garden.width, garden.height);
    drawPointerLight();
    drawMotes(time);
    stems.forEach((stem) => drawStem(stem, time));
    drawSprouts(time);

    if (!reduceMotion.matches) {
      animationFrame = requestAnimationFrame(render);
    }
  }

  function plantSeed() {
    store.update((state) => ({
      ...state,
      seeds: state.seeds + 1,
      growth: Math.min(96, state.growth + 4)
    }));

    const baseX = window.innerWidth * (0.25 + Math.random() * 0.5);
    const baseY = window.innerHeight * (0.62 + Math.random() * 0.22);
    addCanvasSprout(baseX, baseY);
    eventBus.emit("seed:planted", { x: baseX, y: baseY });
  }

  return {
    id: "garden",

    mount(root) {
      canvas = qs("#gardenCanvas", root);
      const button = qs("#plantSeedButton", root);
      const seedCount = qs("[data-seed-count]", root);
      const growthFill = qs("[data-growth-fill]", root);

      if (!canvas || !button) return;
      ctx = canvas.getContext("2d");

      unsubscribeStore = store.subscribe((state) => {
        if (seedCount) seedCount.textContent = String(state.seeds);
        if (growthFill) growthFill.style.width = state.growth + "%";
      });

      removeResize = () => window.removeEventListener("resize", resizeCanvas);
      removePointer = () => window.removeEventListener("pointermove", handlePointerMove);
      removeButton = () => button.removeEventListener("click", plantSeed);

      function handlePointerMove(event) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      }

      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("pointermove", handlePointerMove);
      button.addEventListener("click", plantSeed);

      cleanups.push(
        eventBus.on("project:opened", ({ rect }) => {
          addCanvasSprout(rect.left + rect.width * 0.5, rect.top + 120);
        }),
        eventBus.on("gallery:opened", () => {
          addCanvasSprout(window.innerWidth * 0.72, window.innerHeight * 0.54);
        })
      );

      this.destroy = () => {
        cancelAnimationFrame(animationFrame);
        removeResize?.();
        removePointer?.();
        removeButton?.();
        unsubscribeStore?.();
        cleanups.forEach((cleanup) => cleanup());
      };

      resizeCanvas();
      render(performance.now());
    }
  };
}
