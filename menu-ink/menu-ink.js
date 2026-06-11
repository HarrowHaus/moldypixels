const root=document.querySelector('#app');
const preview=document.querySelector('#mi-preview-content');
const chapters={
  components:'<div class="mi-manuscript"><p class="mi-meta">MI-CMP-001 / COMMAND</p><h3>Chapter Button</h3><p>Framed action with formal selection states, not a pill, not a blob, not a sad SaaS lozenge.</p><button class="mi-btn primary">Select Chapter</button></div>',
  blocks:'<div class="mi-manuscript"><p class="mi-meta">MI-BLK-003 / ARCHIVE</p><h3>Archive Ledger</h3><table class="mi-table"><tbody><tr><td>Chapter Nav</td><td><span class="mi-chip">READY</span></td></tr><tr><td>Command Panel</td><td><span class="mi-chip">ACTIVE</span></td></tr></tbody></table></div>',
  templates:'<div class="mi-manuscript"><p class="mi-meta">MI-TPL-002 / TEMPLATE</p><h3>Publishing Desk</h3><p>Article editor, archive ledger, chapter tabs, manuscript preview, and premium docs shell.</p><button class="mi-btn gold">Open Preview</button></div>',
  themes:'<div class="mi-manuscript"><p class="mi-meta">MI-THM-001 / PALETTE</p><h3>Theme Folio</h3><p>Ivory Ink, Black Menu, Slate Archive, and Oxblood Chapter.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><span class="mi-chip">IVORY</span><span class="mi-chip">BLACK</span><span class="mi-chip">SLATE</span><span class="mi-chip">OXBLOOD</span></div></div>'
};
function setChapter(chapter){preview.innerHTML=chapters[chapter];document.querySelectorAll('[data-mi-chapter]').forEach(b=>b.classList.toggle('is-active',b.dataset.miChapter===chapter));toast('CHAPTER LOADED',chapter.toUpperCase()+' is now active.');}
function setTheme(theme){root.classList.remove('mi-theme-ivory','mi-theme-black','mi-theme-slate','mi-theme-oxblood');if(theme!=='ivory')root.classList.add('mi-theme-'+theme);document.querySelectorAll('[data-mi-theme]').forEach(b=>b.classList.toggle('is-active',b.dataset.miTheme===theme));toast('THEME FOLIO LOADED',theme.toUpperCase()+' mode active.');}
function toast(title,msg){let t=document.querySelector('.mi-toast');if(!t){t=document.createElement('div');t.className='mi-toast';document.body.appendChild(t)}t.innerHTML='<span class="mi-chip">'+title+'</span><strong style="display:block;margin:10px 0 4px">'+title+'</strong><p>'+msg+'</p>';clearTimeout(window.miToast);window.miToast=setTimeout(()=>t.remove(),2600)}
document.querySelectorAll('[data-mi-chapter]').forEach(b=>b.addEventListener('click',()=>setChapter(b.dataset.miChapter)));
document.querySelectorAll('[data-mi-theme]').forEach(b=>b.addEventListener('click',()=>setTheme(b.dataset.miTheme)));
document.querySelectorAll('[data-mi-toast]').forEach(b=>b.addEventListener('click',()=>toast('COPIED','Static preview action ready for Menu Ink.')));
setChapter('components');
