/**
 * MAJESDORE - Minimalist ballaholic Hub Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Page Loader Curtain Unmask Animation (ballaholic style)
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 280);
  }

  // 2. Header Scroll Shadow
  const header = document.querySelector('.hub-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 3. Dual-Layer Drawer Menu (Orange -> White panel slide)
  const menuToggle = document.getElementById('btnMenuToggle');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const menuOrange = document.getElementById('menuLayerOrange');
  const menuPanel = document.getElementById('menuPanel');
  const panelCloseBtn = document.getElementById('panelCloseBtn');
  const menuNavItems = document.querySelectorAll('.panel-link-card, .menu-close-action');

  function openMenu() {
    if (menuBackdrop && menuOrange && menuPanel) {
      menuBackdrop.classList.add('open');
      menuOrange.classList.add('open');
      menuPanel.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (menuBackdrop && menuOrange && menuPanel) {
      menuPanel.classList.remove('open');
      menuOrange.classList.remove('open');
      menuBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (panelCloseBtn) panelCloseBtn.addEventListener('click', closeMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

  menuNavItems.forEach(item => {
    item.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // 4. Pricing Switcher (Personal vs Rental)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const pricingPanels = document.querySelectorAll('.pricing-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      pricingPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`pricing-${target}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 5. Contact Form Submission & Inquiry Type Pre-selection
  const inquiryTriggers = document.querySelectorAll('[data-inquiry]');
  inquiryTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const type = trigger.getAttribute('data-inquiry');
      const radio = document.querySelector(`input[name="inquiry_type"][value="${type}"]`);
      if (radio) {
        radio.checked = true;
      }
    });
  });

  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName')?.value.trim();
      const email = document.getElementById('userEmail')?.value.trim();
      const message = document.getElementById('userMessage')?.value.trim();

      if (!name || !email || !message) {
        alert('必須項目（お名前、メールアドレス、ご相談内容）をご入力ください。');
        return;
      }

      if (successModal) successModal.classList.add('open');
      contactForm.reset();
    });
  }

  if (modalCloseBtn && successModal) {
    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('open');
    });
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) successModal.classList.remove('open');
    });
  }

  // 6. Gallery Photo Preview
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryModal = document.getElementById('galleryModal');
  const previewImg = document.getElementById('previewImg');
  const previewCaption = document.getElementById('previewCaption');
  const galleryModalClose = document.getElementById('galleryModalClose');

  if (galleryCards && galleryModal && previewImg) {
    galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const title = card.querySelector('h4')?.innerText || '';

        if (img) {
          previewImg.src = img.src;
          previewImg.alt = img.alt;
          if (previewCaption) previewCaption.innerText = title;
          galleryModal.classList.add('open');
        }
      });
    });

    if (galleryModalClose) {
      galleryModalClose.addEventListener('click', () => {
        galleryModal.classList.remove('open');
      });
    }

    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) galleryModal.classList.remove('open');
    });
  }

  // 7. Subtle Editorial Scroll Reveal
  const revealTargets = document.querySelectorAll(
    '.sec-header, .feature-card, .gallery-card, .trainer-card, .policy-box, .price-card, .booking-route-notice, .reservation-box, .contact-split'
  );

  if ('IntersectionObserver' in window && revealTargets.length > 0) {
    revealTargets.forEach((el, idx) => {
      el.classList.add('reveal-item');
      el.style.transitionDelay = `${(idx % 3) * 70}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach(el => observer.observe(el));
  }
});
