// APG tabs with automatic activation: arrows (wrapping), Home and End move and select. The tabs
// ship with their roles (hidden without JS); this script turns the stacked panels into tabpanels.
// Visibility of the panels follows data-active through CSS (.tab-panels in global.css).
for (const tablist of document.querySelectorAll('[role="tablist"]')) {
  const tabs = [...tablist.querySelectorAll<HTMLElement>('[role="tab"]')];
  const panels = tabs.map((tab) =>
    document.getElementById(tab.getAttribute('aria-controls') ?? ''),
  );

  const select = (index: number) => {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i]?.toggleAttribute('data-active', active);
    });
  };

  tabs.forEach((tab, i) => {
    const panel = panels[i];
    if (panel) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
    }
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      const keys: Record<string, number> = {
        ArrowRight: i === last ? 0 : i + 1,
        ArrowLeft: i === 0 ? last : i - 1,
        Home: 0,
        End: last,
      };
      const next = keys[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(next);
      tabs[next]?.focus();
    });
  });
}
