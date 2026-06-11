const $ = (selector) => document.querySelector(selector);
const components = window.MP_COMPONENTS || [];
const blocks = window.MP_BLOCKS || [];
const templates = window.MP_TEMPLATES || [];
const kits = window.MP_KITS || [];

function statusBadge(status){
  const cls = status === 'prototype' ? 'status-prototype' : status === 'showcase' ? 'status-showcase' : 'status-planned';
  return `<span class="sg-badge ${cls}">${status}</span>`;
}

function renderKpis(){
  const protoComponents = components.filter(c => c[3] === 'prototype').length;
  const protoBlocks = blocks.filter(b => b[3] === 'prototype').length;
  const protoTemplates = templates.filter(t => t[4] === 'prototype').length;
  $('#library-kpis').innerHTML = `
    <article class="library-kpi"><span class="sg-meta">STYLE KITS</span><strong>${kits.length}</strong><p>Saveglass, Machine Candy, Menu Ink.</p></article>
    <article class="library-kpi"><span class="sg-meta">COMPONENT TARGET</span><strong>${components.length}</strong><p>${protoComponents} prototyped, rest planned.</p></article>
    <article class="library-kpi"><span class="sg-meta">BLOCK TARGET</span><strong>${blocks.length}</strong><p>${protoBlocks} prototyped, rest planned.</p></article>
    <article class="library-kpi"><span class="sg-meta">TEMPLATE TARGET</span><strong>${templates.length}</strong><p>${protoTemplates} full previews online.</p></article>`;
}

function renderKits(){
  $('#kit-grid').innerHTML = kits.map(kit => `
    <article class="library-item">
      <div class="card-top"><span class="sg-meta">${kit.id}</span>${statusBadge(kit.status)}</div>
      <h3>${kit.name}</h3>
      <p>${kit.description}</p>
      <p><strong>Engine:</strong> ${kit.visualEngine}</p>
      <div class="card-bottom"><a class="sg-button small primary" href="${kit.route}">Open Kit</a><span class="sg-meta">${kit.depth}</span></div>
    </article>`).join('');
}

function renderRows(rows, type){
  const filtered = rows.filter(row => {
    const q = ($('#library-search')?.value || '').toLowerCase();
    return !q || row.join(' ').toLowerCase().includes(q);
  });
  return filtered.map(row => {
    if(type === 'template'){
      return `<tr><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${statusBadge(row[4])}</td><td>${row[5] !== '#' ? `<a href="${row[5]}">open</a>` : '<span class="sg-meta">planned</span>'}</td></tr>`;
    }
    return `<tr><td>${row[1]}</td><td>${row[2]}</td><td>${statusBadge(row[3])}</td><td><span class="sg-meta">${row[0]}</span></td></tr>`;
  }).join('');
}

function renderTables(){
  $('#component-table').innerHTML = `<table class="sg-table"><thead><tr><th>Component</th><th>Category</th><th>Status</th><th>ID</th></tr></thead><tbody>${renderRows(components, 'component')}</tbody></table>`;
  $('#block-table').innerHTML = `<table class="sg-table"><thead><tr><th>Block</th><th>Category</th><th>Status</th><th>ID</th></tr></thead><tbody>${renderRows(blocks, 'block')}</tbody></table>`;
  $('#template-table').innerHTML = `<table class="sg-table"><thead><tr><th>Template</th><th>Category</th><th>Kit</th><th>Status</th><th>Preview</th></tr></thead><tbody>${renderRows(templates, 'template')}</tbody></table>`;
}

function renderNative(){
  $('#native-grid').innerHTML = kits.map(kit => `
    <article class="library-item">
      <div class="card-top"><span class="sg-meta">${kit.name}</span>${statusBadge(kit.status)}</div>
      <h3>Native Components</h3>
      <p>${kit.nativeComponents.join(', ')}</p>
    </article>`).join('');
}

renderKpis();
renderKits();
renderTables();
renderNative();
$('#library-search')?.addEventListener('input', renderTables);
