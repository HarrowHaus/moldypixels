const catalogMode = window.MP_CATALOG_MODE || 'components';
const pageTitle = document.querySelector('[data-catalog-title]');
const pageDek = document.querySelector('[data-catalog-dek]');
const table = document.querySelector('[data-catalog-table]');
const cards = document.querySelector('[data-catalog-cards]');
const search = document.querySelector('[data-catalog-search]');

const documentedComponents = ['button','card','input','badge','alert','dialog','tabs'];
const componentDocs = Object.fromEntries(documentedComponents.map(id => [id, [
  ['Saveglass', `../saveglass/components/${id}/`],
  ['Machine Candy', `../machine-candy/components/${id}/`],
  ['Menu Ink', `../menu-ink/components/${id}/`]
]]));

const copy = {
  components: {
    title: 'Component Catalog',
    dek: 'The shared component contract Moldy Pixels needs before it can rival real shadcn-style libraries.',
    rows: window.MP_COMPONENTS || [],
    headers: ['Component', 'Category', 'Status', 'ID', 'Docs']
  },
  blocks: {
    title: 'Block Catalog',
    dek: 'Reusable page sections each style needs to ship as more than a pretty skin.',
    rows: window.MP_BLOCKS || [],
    headers: ['Block', 'Category', 'Status', 'ID']
  },
  templates: {
    title: 'Template Catalog',
    dek: 'Full-page previews that prove the system can build real sites, dashboards, docs, and tools.',
    rows: window.MP_TEMPLATES || [],
    headers: ['Template', 'Category', 'Kit', 'Status', 'Preview']
  }
};

function badge(status){
  const cls = status === 'prototype' ? 'accent' : status === 'showcase' ? 'success' : '';
  return `<span class="sg-badge ${cls}">${status}</span>`;
}

function docsLinks(id){
  const docs = componentDocs[id];
  if(!docs) return '<span class="sg-meta">planned</span>';
  return `<div style="display:flex;gap:6px;flex-wrap:wrap">${docs.map(([label,href]) => `<a class="sg-button small outline" href="${href}">${label}</a>`).join('')}</div>`;
}

function activeRows(){
  const q = (search?.value || '').toLowerCase();
  return copy[catalogMode].rows.filter(row => !q || row.join(' ').toLowerCase().includes(q));
}

function render(){
  const cfg = copy[catalogMode];
  if(pageTitle) pageTitle.textContent = cfg.title;
  if(pageDek) pageDek.textContent = cfg.dek;
  const rows = activeRows();
  if(cards){
    cards.innerHTML = rows.slice(0, 12).map(row => {
      const isTemplate = catalogMode === 'templates';
      const status = isTemplate ? row[4] : row[3];
      const category = row[2];
      const href = isTemplate ? row[5] : '#';
      const doc = catalogMode === 'components' ? docsLinks(row[0]) : href !== '#' ? `<a class="sg-button small primary" href="${href}">Open Preview</a>` : '<span class="sg-meta">DOC PAGE PLANNED</span>';
      return `<article class="library-item"><div class="card-top"><span class="sg-meta">${row[0]}</span>${badge(status)}</div><h3>${row[1]}</h3><p>${category}</p>${doc}</article>`;
    }).join('');
  }
  if(table){
    const head = cfg.headers.map(h => `<th>${h}</th>`).join('');
    const body = rows.map(row => {
      if(catalogMode === 'templates') return `<tr><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${badge(row[4])}</td><td>${row[5] !== '#' ? `<a href="${row[5]}">open</a>` : '<span class="sg-meta">planned</span>'}</td></tr>`;
      if(catalogMode === 'components') return `<tr><td>${row[1]}</td><td>${row[2]}</td><td>${badge(row[3])}</td><td><span class="sg-meta">${row[0]}</span></td><td>${docsLinks(row[0])}</td></tr>`;
      return `<tr><td>${row[1]}</td><td>${row[2]}</td><td>${badge(row[3])}</td><td><span class="sg-meta">${row[0]}</span></td></tr>`;
    }).join('');
    table.innerHTML = `<table class="sg-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  }
}

render();
search?.addEventListener('input', render);
