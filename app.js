const installCommand = "npx shadcn@latest add https://moldypixels.dev/r/saveglass";
const state = { activeSlot: "components", activeTheme: "indigo", toastTimer: null, selectedTemplate: null };

const heroSlots = {
  components: {
    label: "SLOT 01 / COMPONENTS", title: "Component Preview", status: "READY",
    render: () => `<div class="mini-card is-active"><div class="card-top"><span class="sg-meta">SG-CMP-001 / ACTION</span><span class="sg-badge accent">ACTIVE</span></div><h3>Button</h3><p>Selectable system action component.</p><button class="sg-button primary">Primary Slot</button> <button class="sg-button outline">Outline</button></div><div class="input-demo">SEARCH MEMORY...</div><span class="sg-badge success"><span class="sg-dot ok"></span>SYNCED</span>`
  },
  blocks: {
    label: "SLOT 02 / BLOCKS", title: "Block Archive", status: "READY",
    render: () => `<div class="mini-card"><div class="card-top"><span class="sg-meta">SG-BLK-001</span><span class="sg-badge">Marketing</span></div><h3>Hero Save Panel</h3><p>Interactive hero section with slot selector and live preview.</p></div><div class="mini-card"><div class="card-top"><span class="sg-meta">SG-BLK-004</span><span class="sg-badge success">Ready</span></div><h3>Dashboard Memory Overview</h3><p>Stats, registry rows, and system status strips.</p></div>`
  },
  templates: {
    label: "SLOT 03 / TEMPLATES", title: "Template Saves", status: "SYNCED",
    render: () => `<div class="mini-card is-active"><div class="card-top"><span class="sg-meta">SG-TPL-001</span><span class="sg-badge success">Ready</span></div><h3>SaaS Dashboard</h3><p>Memory sidebar, stat slots, activity registry, and settings drawer.</p></div><div class="mini-card"><div class="card-top"><span class="sg-meta">SG-TPL-002</span><span class="sg-badge accent">Synced</span></div><h3>AI Workspace</h3><p>Session slots, prompt archive, output preview, and save history.</p></div>`
  },
  themes: {
    label: "SLOT 04 / THEMES", title: "Theme Banks", status: "ACTIVE",
    render: () => themes.map(t => `<div class="mini-card"><div class="card-top"><span class="sg-meta">${t.name}</span><span class="sg-badge">${t.mode}</span></div><div class="chips">${t.colors.map(c => `<span class="chip" style="background:${c}"></span>`).join("")}</div><p>${t.use}</p></div>`).join("")
  }
};

const components = [
  ["SG-CMP-001", "Button", "Actions", "Stable", "v1.0.0", "Selectable slot action with state glow."],
  ["SG-CMP-002", "Card", "Surfaces", "Stable", "v1.0.0", "Save-slot panel with metadata strips."],
  ["SG-CMP-003", "Input", "Forms", "Stable", "v1.0.0", "Recessed system field for readable entry."],
  ["SG-CMP-004", "Dialog", "Overlay", "Stable", "v1.0.0", "System confirmation overlay."],
  ["SG-CMP-005", "Table", "Data", "Stable", "v1.0.0", "File registry rows and status badges."],
  ["SG-CMP-006", "Tabs", "Navigation", "Stable", "v1.0.0", "Memory-bank slot selector."],
];

const templates = [
  { id: "SG-TPL-001", name: "SaaS Dashboard", category: "Application", pages: 6, components: 42, status: "Ready", description: "A memory-bank dashboard shell for analytics, activity, and settings." },
  { id: "SG-TPL-002", name: "AI Workspace", category: "Application", pages: 5, components: 38, status: "Synced", description: "Session slots, prompt archive, output preview, and registry history." },
  { id: "SG-TPL-003", name: "Template Marketplace", category: "Commerce", pages: 7, components: 44, status: "Ready", description: "Template save grid, filter bank, preview overlay, and install CTA." },
  { id: "SG-TPL-004", name: "Docs Manual", category: "Documentation", pages: 8, components: 36, status: "Ready", description: "System manual layout with command panels and component previews." },
];

const themes = [
  { id: "indigo", name: "Indigo Memory", mode: "Dark / Default", use: "Dashboards + AI tools", status: "Default", colors: ["#080B18", "#1A2440", "#7AD7FF", "#A78BFA"] },
  { id: "cyan", name: "Cyan Archive", mode: "Light / Cool", use: "Docs + marketing", status: "Ready", colors: ["#DCEAF2", "#F8FCFF", "#009FE3", "#7467D9"] },
  { id: "violet", name: "Violet Slot", mode: "Dark / Premium", use: "Creator tools", status: "Ready", colors: ["#120A1F", "#27193E", "#D7A8FF", "#75E8FF"] },
  { id: "mono", name: "Mono Save", mode: "Dark / Pro", use: "Internal tools", status: "Ready", colors: ["#090A0D", "#1B202B", "#82B7FF", "#B6C2D6"] },
];

const registryRows = [
  ["SG-CMP-001", "Button", "Actions", "Stable", "1.0.0", "06.11"],
  ["SG-CMP-002", "Card", "Surfaces", "Stable", "1.0.0", "06.11"],
  ["SG-CMP-003", "Input", "Forms", "Stable", "1.0.0", "06.11"],
  ["SG-CMP-004", "Dialog", "Overlay", "Stable", "1.0.0", "06.11"],
  ["SG-BLK-001", "Hero Save Panel", "Marketing", "Ready", "1.0.0", "06.11"],
  ["SG-TPL-001", "SaaS Dashboard", "Template", "Ready", "1.0.0", "06.11"],
];

function renderHeroPreview() {
  const slot = heroSlots[state.activeSlot];
  document.querySelector("#preview-label").textContent = slot.label;
  document.querySelector("#preview-title").textContent = slot.title;
  document.querySelector("#preview-status").innerHTML = `<span class="sg-dot"></span>${slot.status}`;
  document.querySelector("#hero-preview").innerHTML = slot.render();
  const activeTheme = themes.find(t => t.id === state.activeTheme);
  document.querySelector("#active-bank").textContent = `ACTIVE BANK / ${activeTheme.name.toUpperCase()}`;
}

function renderComponentGrid() {
  document.querySelector("#component-grid").innerHTML = components.map((c, i) => `<article class="sg-card ${i === 0 ? "is-active" : ""}"><div class="card-top"><span class="sg-meta">${c[0]} / ${c[2].toUpperCase()}</span><span class="sg-badge success">${c[3]}</span></div><h3>${c[1]}</h3><p>${c[5]}</p><div class="card-bottom"><span class="sg-meta">${c[4]}</span><span class="sg-meta">UPDATED 06.11</span></div></article>`).join("");
}

function renderTemplates() {
  document.querySelector("#template-grid").innerHTML = templates.map(t => `<article class="template-card"><div class="card-top"><span class="sg-meta">${t.id}</span><span class="sg-badge success">${t.status}</span></div><div class="template-preview"></div><h3>${t.name}</h3><p>${t.description}</p><div class="template-meta"><span class="sg-meta">${t.pages} PAGES</span><span class="sg-meta">${t.components} COMPONENTS</span></div><button class="sg-button outline" data-template-id="${t.id}">Preview</button></article>`).join("");
}

function renderThemes() {
  document.querySelector("#theme-grid").innerHTML = themes.map((t, i) => `<button class="sg-theme-card ${state.activeTheme === t.id ? "is-active" : ""}" data-theme-id="${t.id}"><div class="card-top"><span class="sg-meta">SG-THM-${String(i + 1).padStart(3, "0")}</span><span class="sg-badge">${t.status}</span></div><h3>${t.name}</h3><p>${t.mode}</p><p>${t.use}</p><div class="chips">${t.colors.map(c => `<span class="chip" style="background:${c}"></span>`).join("")}</div></button>`).join("");
}

function renderRegistry() {
  const table = `<table class="sg-table"><thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Status</th><th>Version</th><th>Updated</th></tr></thead><tbody>${registryRows.map(r => `<tr><td><span class="sg-meta">${r[0]}</span></td><td>${r[1]}</td><td>${r[2]}</td><td><span class="sg-badge success">${r[3]}</span></td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join("")}</tbody></table>`;
  const cards = `<div class="registry-cards">${registryRows.map(r => `<article class="sg-card"><div class="card-top"><span class="sg-meta">${r[0]}</span><span class="sg-badge success">${r[3]}</span></div><h3>${r[1]}</h3><p>${r[2]} / ${r[4]} / UPDATED ${r[5]}</p></article>`).join("")}</div>`;
  document.querySelector("#registry-table").innerHTML = table + cards;
}

async function copyInstallCommand() {
  try { await navigator.clipboard.writeText(installCommand); showToast("COMMAND COPIED", "The registry command is ready.", "success"); }
  catch { showToast("COPY FAILED", "Select and copy the command manually.", "danger"); }
}

function showToast(label, message, variant = "default") {
  const region = document.querySelector(".toast-region");
  const badgeClass = variant === "danger" ? "danger" : variant === "success" ? "success" : "accent";
  region.innerHTML = `<div class="toast"><span class="sg-badge ${badgeClass}">${label}</span><strong>${label}</strong><p>${message}</p></div>`;
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => region.innerHTML = "", 3000);
}

function changeTheme(themeId) {
  const root = document.querySelector("#app");
  root.classList.remove(`sg-theme-${state.activeTheme}`);
  state.activeTheme = themeId;
  root.classList.add(`sg-theme-${themeId}`);
  renderThemes();
  renderHeroPreview();
  const progress = document.querySelector(".sg-progress");
  const label = document.querySelector("#theme-progress-label");
  label.textContent = "LOADING";
  progress.classList.add("is-loading");
  const theme = themes.find(t => t.id === themeId);
  showToast("THEME BANK LOADED", `${theme.name} is now active.`, "success");
  setTimeout(() => { progress.classList.remove("is-loading"); label.textContent = "READY"; }, 700);
}

function openTemplate(templateId) {
  const template = templates.find(t => t.id === templateId);
  if (!template) return;
  state.selectedTemplate = template;
  document.querySelector("#modal-meta").textContent = `${template.id} / TEMPLATE / ${template.status.toUpperCase()}`;
  document.querySelector("#modal-title").textContent = template.name;
  document.querySelector(".modal-details").innerHTML = `<div class="detail-row"><span class="sg-meta">CATEGORY</span><strong>${template.category}</strong></div><div class="detail-row"><span class="sg-meta">PAGES</span><strong>${template.pages}</strong></div><div class="detail-row"><span class="sg-meta">COMPONENTS</span><strong>${template.components}</strong></div><p>${template.description}</p>`;
  document.querySelector(".modal-backdrop").hidden = false;
  document.querySelector("[data-close-modal]").focus();
  showToast("TEMPLATE PREVIEW LOADED", `${template.name} is open.`, "success");
}

function closeTemplate() { state.selectedTemplate = null; document.querySelector(".modal-backdrop").hidden = true; }

function initEvents() {
  document.querySelectorAll("[data-slot]").forEach(button => button.addEventListener("click", () => {
    state.activeSlot = button.dataset.slot;
    document.querySelectorAll("[data-slot]").forEach(b => { b.classList.toggle("is-active", b.dataset.slot === state.activeSlot); b.setAttribute("aria-selected", String(b.dataset.slot === state.activeSlot)); });
    renderHeroPreview();
  }));
  document.querySelectorAll("[data-copy-install]").forEach(btn => btn.addEventListener("click", copyInstallCommand));
  document.querySelector("#theme-grid").addEventListener("click", e => { const card = e.target.closest("[data-theme-id]"); if (card) changeTheme(card.dataset.themeId); });
  document.querySelector("#template-grid").addEventListener("click", e => { const btn = e.target.closest("[data-template-id]"); if (btn) openTemplate(btn.dataset.templateId); });
  document.querySelectorAll("[data-close-modal]").forEach(btn => btn.addEventListener("click", closeTemplate));
  document.querySelector(".modal-backdrop").addEventListener("click", e => { if (e.target.classList.contains("modal-backdrop")) closeTemplate(); });
  document.querySelector("[data-copy-template]").addEventListener("click", () => showToast("TEMPLATE COPIED", "Template files are ready to paste into the registry.", "success"));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !document.querySelector(".modal-backdrop").hidden) closeTemplate(); });
  const menuBtn = document.querySelector(".sg-menu");
  const drawer = document.querySelector(".sg-drawer");
  menuBtn.addEventListener("click", () => { const expanded = menuBtn.getAttribute("aria-expanded") === "true"; menuBtn.setAttribute("aria-expanded", String(!expanded)); drawer.hidden = expanded; });
  drawer.addEventListener("click", e => { if (e.target.tagName === "A") { drawer.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); } });
}

renderHeroPreview();
renderComponentGrid();
renderTemplates();
renderThemes();
renderRegistry();
initEvents();
