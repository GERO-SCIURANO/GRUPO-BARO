const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

// Men? hamburguesa
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    });
  });
})();

// Env?o del formulario (Home y Contacto) -> backend /api/contact
function hookForm(id){
  const form = document.getElementById(id);
  const statusEl = document.getElementById('status');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (statusEl) statusEl.textContent = 'Enviando...';
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      if (statusEl) statusEl.textContent = '?Mensaje enviado! Te responderemos a la brevedad.';
      form.reset();
    } catch (err) {
      if (statusEl) statusEl.textContent = 'No se pudo enviar. Us? el correo directo de la l?nea siguiente.';
      console.error(err);
    }
  });
}

hookForm('contactForm');
