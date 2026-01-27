// Footer year
(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Mobile nav (burger)
(() => {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (!burger || !nav) return;

  const closeNav = () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(e.target) || burger.contains(e.target)) return;
    closeNav();
  });
})();

// Floating action button (FAB)
(() => {
  const fab = document.getElementById('fab');
  if (!fab) return;

  const menu = document.getElementById('fabMenu');
  const mainBtn = fab.querySelector('.fab__main');
  if (!menu || !mainBtn) return;

  const setOpen = (open) => {
    fab.classList.toggle('is-open', open);
    mainBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
  };

  mainBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!fab.classList.contains('is-open'));
  });

  menu.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', () => setOpen(false));
})();

// Contact form (Web3Forms)
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert("Error: " + (data.message || "Failed to send."));
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
})();


// Reviews carousel buttons + "More" toggle
(() => {
  // Carousel next/prev
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.carousel__btn');
    if (!btn) return;

    const carousel = btn.closest('.carousel');
    const track = carousel ? carousel.querySelector('.carousel__track') : null;
    if (!track) return;

    const dir = Number(btn.getAttribute('data-dir') || '0');
    const step = Math.max(track.clientWidth * 0.9, 260); // scroll about one "page"
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  });

  // "More" toggle: just expand/collapse (CSS line-clamp handles the rest)
  document.addEventListener('click', (e) => {
    const moreBtn = e.target.closest('.reviewCard__more');
    if (!moreBtn) return;

    const card = moreBtn.closest('.reviewCard');
    if (!card) return;

    const isOpen = card.classList.toggle('is-open');
    moreBtn.textContent = isOpen ? 'Less' : 'More';
  });

  // Press Enter on a focused card to toggle
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const card = document.activeElement?.closest?.('.reviewCard');
    if (!card) return;
    const btn = card.querySelector('.reviewCard__more');
    if (btn) btn.click();
  });
})();
