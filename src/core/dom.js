export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export function on(target, eventName, handler, options) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler, options);
}

export function createElement(tagName, attributes = {}, children = []) {
  const element = document.createElement(tagName);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "className") {
      element.className = value;
    } else if (key === "text") {
      element.textContent = value;
    } else if (key.startsWith("data-")) {
      element.setAttribute(key, value);
    } else if (value !== undefined && value !== null) {
      element.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    element.append(child);
  });

  return element;
}
