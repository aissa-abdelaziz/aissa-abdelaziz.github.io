(function () {
  'use strict';

  function initThemeToggle() {
    var root = document.documentElement;
    var toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    function currentTheme() {
      return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    function updateLabel() {
      var theme = currentTheme();
      var next = theme === 'dark' ? 'light' : 'dark';
      toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
      toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    }

    updateLabel();

    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* localStorage unavailable (e.g. private mode) — theme just won't persist */
      }
      updateLabel();
    });
  }

  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var list = document.getElementById('primary-nav');
    if (!toggle || !list) return;

    function closeMenu() {
      list.classList.remove('nav__list--open');
      toggle.classList.remove('nav-toggle--active');
      toggle.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
      list.classList.add('nav__list--open');
      toggle.classList.add('nav-toggle--active');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function () {
      if (list.classList.contains('nav__list--open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    list.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && list.classList.contains('nav__list--open')) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (!list.classList.contains('nav__list--open')) return;
      if (list.contains(event.target) || toggle.contains(event.target)) return;
      closeMenu();
    });
  }

  function initScrollReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    items.forEach(function (el) {
      var index = el.getAttribute('data-stagger-index');
      if (index !== null) el.style.setProperty('--stagger', index);
    });

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('reveal--visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var status = document.getElementById('form-status');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var fields = {
      name: { input: form.elements.name, error: document.getElementById('name-error') },
      email: { input: form.elements.email, error: document.getElementById('email-error') },
      message: { input: form.elements.message, error: document.getElementById('message-error') }
    };

    function setError(field, message) {
      field.error.textContent = message;
      field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validate() {
      var valid = true;

      if (!fields.name.input.value.trim()) {
        setError(fields.name, 'Please enter your name.');
        valid = false;
      } else {
        setError(fields.name, '');
      }

      if (!emailPattern.test(fields.email.input.value.trim())) {
        setError(fields.email, 'Please enter a valid email address.');
        valid = false;
      } else {
        setError(fields.email, '');
      }

      if (fields.message.input.value.trim().length < 10) {
        setError(fields.message, 'Message should be at least 10 characters.');
        valid = false;
      } else {
        setError(fields.message, '');
      }

      return valid;
    }

    function setStatus(message, state) {
      status.textContent = message;
      if (state) {
        status.setAttribute('data-state', state);
      } else {
        status.removeAttribute('data-state');
      }
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Honeypot: bots fill every field, humans never see or fill this one.
      if (form.elements.company && form.elements.company.value) {
        form.reset();
        setStatus('Thanks — your message has been sent.', 'success');
        return;
      }

      if (!validate()) {
        setStatus('Please fix the errors above and try again.', 'error');
        return;
      }

      setStatus('Sending…');

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            setStatus('Thanks — your message has been sent.', 'success');
          } else {
            setStatus('Something went wrong. Please email abdz.aissa@gmail.com directly.', 'error');
          }
        })
        .catch(function () {
          setStatus('Something went wrong. Please email abdz.aissa@gmail.com directly.', 'error');
        });
    });
  }

  function initFooterYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  }

  initThemeToggle();
  initMobileNav();
  initScrollReveal();
  initContactForm();
  initFooterYear();
})();
