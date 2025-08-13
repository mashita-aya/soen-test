// --- Utility: toggle helper
function toggleElement({ button, target, className, aria, extra }) {
  if (!button || !target) return;
  button.addEventListener("click", () => {
    const isOpen = target.classList.toggle(className);
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (extra) extra(isOpen);
  });
}

// --- Smooth scroll
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const hash = link.hash;
  if (!hash || hash === "#") {
    e.preventDefault();
    return;
  }

  const targetEl = document.getElementById(hash.slice(1));
  if (!targetEl) return;

  const headerHeight = document.querySelector("header")?.offsetHeight || 0;
  const position = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

  e.preventDefault();
  window.scrollTo({ top: position, behavior: "smooth" });
});

// --- DOM elements
const html = document.documentElement;
const body = document.querySelector(".body");

// --- Modal
toggleElement({
  button: document.querySelector(".dialog-button"),
  target: document.querySelector(".dialog"),
  className: "is-dialog-open",
});
document.querySelector(".dialog__button")?.addEventListener("click", () => {
  document.querySelector(".dialog")?.classList.remove("is-dialog-open");
  document.querySelector(".dialog-button")?.setAttribute("aria-expanded", "false");
});

// --- Info
toggleElement({
  button: document.querySelector(".info-button"),
  target: body,
  className: "is-info",
  extra: (isOpen) => document.querySelector(".info-button")?.classList.toggle("is-footer-active", isOpen),
});

// --- Reverse
{
  const button = document.querySelector(".reverse-button");
  let isRotated = false; // 状態保持用

  if (button) {
    button.addEventListener("click", () => {
      const isOpen = body.classList.contains("is-reverse");
      if (isOpen) {
        body.classList.remove("is-reverse");
        button.classList.remove("is-footer-active");
        button.setAttribute("aria-expanded", "false");
      } else {
        body.classList.add("is-reverse");
        button.classList.add("is-footer-active");
        button.setAttribute("aria-expanded", "true");
      }
      // transform 切り替え
      isRotated = !isRotated;
      body.style.transform = isRotated ? "rotate(180deg)" : "rotate(0deg)";
    });
  }
}

// --- Language
{
  const button = document.querySelector(".language-button");
  if (button) {
    button.addEventListener("click", () => {
      const isOpen = body.classList.contains("is-language");
      if (isOpen) {
        body.classList.remove("is-language");
        html.setAttribute("lang", "ja");
        button.classList.remove("is-footer-active");
        button.setAttribute("aria-expanded", "false");
      } else {
        body.classList.add("is-language");
        html.setAttribute("lang", "en");
        button.classList.add("is-footer-active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  }
}



function adjustNameText() {
  const el = document.getElementById("name");
  const length = el.textContent.trim().length;

  el.classList.remove("large-text", "medium-text", "small-text");

  if (length <= 20) {
    el.classList.add("large-text");
  } else if (length <= 56) {
    el.classList.add("medium-text");
  } else {
    el.classList.add("small-text");
  }
}

function adjustCompanyLetterSpacingAndCut() {
  const el = document.getElementById("company");
  const length = el.textContent.trim().length;

  el.classList.remove("spacing-wide", "spacing-tight");

  if (length <= 10) {
    el.classList.add("spacing-wide");
  } else {
    el.classList.add("spacing-tight");
  }
}

window.addEventListener("load", () => {
  adjustNameText();
  adjustCompanyLetterSpacingAndCut();
});
