// --- Utility: toggle helper
function toggleElement({ button, target, className, aria, extra }) {
  if (!button || !target) return;
  button.addEventListener("click", () => {
    const isOpen = target.classList.toggle(className);
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (extra) extra(isOpen);
  });
}

// スムーススクロール
document.addEventListener("click", function (e) {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;

  const hash = target.hash;
  if (!hash || hash === "#") {
    e.preventDefault();
    return;
  }

  const id = hash.slice(1);
  const targetElement = document.getElementById(id);
  if (!targetElement) return;

  const header = document.querySelector("header");
  const headerHeight = header ? header.offsetHeight : 0;

  // 通常のスクロール位置
  const targetPosition =
    targetElement.getBoundingClientRect().top +
    window.pageYOffset -
    headerHeight;

  // body に is-reverse が付いているかチェック
  const body = document.getElementById("body");
  let scrollTop = targetPosition;

  if (body && body.classList.contains("is-reverse")) {
    // 上下反転時のスクロール位置を計算
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    scrollTop = docHeight - targetPosition - winHeight;
  }

  // スムーススクロール実行
  window.scrollTo({
    top: scrollTop,
    behavior: "smooth",
  });

  e.preventDefault();
});
 // 回転・提示切替
 document.getElementById("toggle-reverse").addEventListener("click", function() {
  document.body.classList.toggle("is-reverse");
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

// const body = document.querySelector("body");
// const html = document.documentElement;

let isFlippedX = false; // 左右反転状態
let isFlippedY = false; // 上下反転状態
function applyTransform() {
  const transforms = [];
  // if (isFlippedY) transforms.push("scaleY(-1)");
  if (isFlippedY) transforms.push("rotateZ(-180deg)"); // 上下反転
  if (isFlippedX) transforms.push("rotateY(180deg)");  // 左右反転
  body.style.transform = transforms.join(" ");
}
// --- Language Button
{
  const button = document.querySelector(".language-button");
  if (button) {
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
      isFlippedX = !isFlippedX;
      button.classList.toggle("is-footer-active", isFlippedX);
      button.setAttribute("aria-expanded", isFlippedX ? "true" : "false");

      html.setAttribute("lang", isFlippedX ? "en" : "ja");

      applyTransform();
    });
  }
}

// --- Reverse Button
{
  const button = document.querySelector(".reverse-button");
  if (button) {
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
      isFlippedY = !isFlippedY;
      button.classList.toggle("is-footer-active", isFlippedY);
      button.setAttribute("aria-expanded", isFlippedY ? "true" : "false");

      applyTransform();
    });
  }
}

// 初期化
applyTransform();

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


function updateClock() {
  const now = new Date();

  // 年月日
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");

  // 時刻
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // 表示内容
  document.getElementById("clock").textContent =
    `${year}-${month}-${date}  ${hours}:${minutes}:${seconds}`;
}

// 初回実行
updateClock();

// 1秒ごとに更新
setInterval(updateClock, 1000);