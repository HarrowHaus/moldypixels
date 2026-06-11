const detailId = window.MP_COMPONENT_ID || 'button';
const kitId = window.MP_KIT_ID || 'saveglass';
const details = window.MP_COMPONENT_DETAILS?.[detailId];
const kit = details?.kits?.[kitId];

function list(items){ return `<ul class="detail-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`; }
function set(selector, html){ const el = document.querySelector(selector); if(el) el.innerHTML = html; }
function text(selector, value){ const el = document.querySelector(selector); if(el) el.textContent = value; }

if(details && kit){
  document.title = `${kit.title} — Moldy Pixels`;
  text('[data-detail-kit]', kit.kitName);
  text('[data-detail-title]', kit.title);
  text('[data-detail-category]', `${details.category} / ${details.status}`);
  text('[data-detail-thesis]', kit.thesis);
  text('[data-detail-shared]', details.sharedPurpose);
  set('[data-detail-preview]', kit.preview);
  set('[data-detail-anatomy]', list(kit.anatomy));
  set('[data-detail-do]', list(kit.do));
  set('[data-detail-dont]', list(kit.dont));
  set('[data-detail-a11y]', list(details.sharedAccessibility));
  set('[data-detail-variants]', list(details.sharedVariants));
  set('[data-detail-sizes]', list(details.sharedSizes));
  const code = document.querySelector('[data-detail-code]');
  if(code) code.textContent = kit.code;
  const home = document.querySelector('[data-kit-home]');
  if(home) home.href = kit.routeHome;
  const copy = document.querySelector('[data-copy-detail-code]');
  copy?.addEventListener('click', () => navigator.clipboard?.writeText(kit.code));
}
