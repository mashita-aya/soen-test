// public/scroll-highlight.js

document.addEventListener("DOMContentLoaded", () => {
  const titles = document.querySelectorAll(".service__title");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const letters = entry.target.querySelectorAll("div");
        letters.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add("active");
          }, i * 100);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  titles.forEach(title => observer.observe(title));
});


document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".fade-up-image-pic");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  images.forEach(img => observer.observe(img));
});


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const spans = entry.target.querySelectorAll('span');
      spans.forEach((span, i) => {
        setTimeout(() => {
          span.classList.add('active');
        }, i * 100); // 一文字ごとに100ms遅延
      });
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.animate-text').forEach(el => {
  observer.observe(el);
});
