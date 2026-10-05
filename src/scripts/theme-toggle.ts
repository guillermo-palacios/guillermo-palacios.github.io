// Flips data-theme on <html> and stores the choice under the key the anti-flicker script reads.
const button = document.querySelector('[data-theme-toggle]');

button?.addEventListener('click', () => {
  const root = document.documentElement;
  const theme = root.dataset['theme'] === 'light' ? 'dark' : 'light';
  root.dataset['theme'] = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage blocked: the choice lasts until the next page load.
  }
});
