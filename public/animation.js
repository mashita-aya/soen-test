// public/scroll-highlight.js
window.addEventListener("DOMContentLoaded", () => {
  const mv = document.querySelector(".mv");
  const animation = document.querySelector(".animation01");
  const circles = animation.querySelectorAll(".circle");

  const mvRect = mv.getBoundingClientRect();
  const isInView =
    mvRect.top < window.innerHeight && mvRect.bottom > 0;

  if (isInView) {
    animation.style.display = "block";
    circles.forEach(circle => {
      circle.style.animation = "none";
      void circle.offsetWidth;
      circle.style.animation = "";
    });

    setTimeout(() => {
      animation.style.display = "none";
    }, 2500);
  }
});

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

 // アニメーションスタート
 window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline();

  tl.from('.headline', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'bounce.out'
  }).from('.subheadline', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  }, "-=0.5").from('.cta-btn', {
    duration: 0.6,
    scale: 0.5,
    opacity: 0,
    ease: 'back.out(1.7)'
  }, "-=0.3");
});
