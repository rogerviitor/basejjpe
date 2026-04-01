/* NAVBAR SHRINK */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});
/* INTERSECTION ANIMATION */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal")
  .forEach(el => observer.observe(el));

/* COUNTER */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = +el.dataset.target;
    let count = 0;
    const step = Math.ceil(target / 60);

    function update() {
      count += step;
      if (count >= target) {
        el.textContent = target;
      } else {
        el.textContent = count;
        requestAnimationFrame(update);
      }
    }

    update();
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

const counters = document.querySelectorAll('.stat-number');

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = +el.dataset.target;
    let current = 0;
    const increment = Math.ceil(target / 60);

    const update = () => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
      } else {
        el.textContent = current;
        requestAnimationFrame(update);
      }
    };

    update();
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });

counters.forEach(counter => countObserver.observe(counter));
/* INTRO SCREEN */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".intro-screen").classList.add("hide");
  }, 1800);
});
const canvas = document.getElementById("bg-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");

  let w, h, t = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function noise(x, y) {
    return Math.sin(x * 0.002 + t) * Math.cos(y * 0.002 + t);
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    for (let y = 0; y < h; y += 4) {
      for (let x = 0; x < w; x += 4) {
        const n = noise(x, y);
        const alpha = (n + 1) * 0.015;

        ctx.fillStyle = `rgba(201,162,77,${alpha})`;
        ctx.fillRect(x, y, 4, 4);
      }
    }

    t += 0.003;
    requestAnimationFrame(animate);
  }

  animate();
}

/* INIT LUCIDE ICONS */
if(typeof lucide !== 'undefined') {
  lucide.createIcons();
}

/* FAQ ACCORDION */
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    
    if (faqItem.classList.contains('active')) {
      faqItem.classList.remove('active');
      answer.style.maxHeight = null;
    } else {
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const oldAnswer = item.querySelector('.faq-answer');
        if (oldAnswer) oldAnswer.style.maxHeight = null;
      });
      
      faqItem.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

/* MOBILE MENU TOGGLE */
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const mobileOverlay = document.querySelector('.mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuToggle && closeMenu && mobileOverlay) {
  menuToggle.addEventListener('click', () => {
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeMenu.addEventListener('click', () => {
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}