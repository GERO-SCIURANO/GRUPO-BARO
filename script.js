const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

// Envío del formulario (Home y Contacto) -> backend /api/contact
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
      if (statusEl) statusEl.textContent = '¡Mensaje enviado! Te responderemos a la brevedad.';
      form.reset();
    } catch (err) {
      if (statusEl) statusEl.textContent = 'No se pudo enviar. Usá el correo directo de la línea siguiente.';
      console.error(err);
    }
  });
}
hookForm('contactForm');
