// Copy-to-clipboard for BibTeX blocks, and pause looping clips that are off screen.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const pre = btn.parentElement.querySelector('pre');
      try {
        await navigator.clipboard.writeText(pre.innerText.trim());
        btn.textContent = 'Copied';
      } catch (e) {
        btn.textContent = 'Select & copy';
      }
      setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
    });
  });

  const loops = document.querySelectorAll('video[data-loop]');
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) { target.play().catch(() => {}); } else { target.pause(); }
    });
  }, { threshold: 0.15 });
  loops.forEach((v) => io.observe(v));
});
