(() => {
  const root = document.documentElement;
  root.classList.remove('no-js');

  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      document.body.classList.toggle('nav-open', !expanded);
    });
  }

  if (navLinks.length) {
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('nav-open')) {
          document.body.classList.remove('nav-open');
          if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!status) return;

      const formData = new FormData(form);
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      status.textContent = 'Sending your message...';
      status.classList.add('visible');

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        status.textContent = 'Thanks! Your message was sent. We will follow up soon.';
        form.reset();
      } catch (error) {
        status.textContent = 'Sorry, something went wrong. Please email us directly.';
      }
    });
  }
})();
