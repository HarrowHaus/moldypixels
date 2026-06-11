const root=document.querySelector('#app');
document.querySelectorAll('[data-template-theme]').forEach(button=>{
  button.addEventListener('click',()=>{
    const theme=button.dataset.templateTheme;
    root.classList.remove('sg-theme-indigo','sg-theme-cyan','sg-theme-violet','sg-theme-mono');
    root.classList.add(`sg-theme-${theme}`);
    document.querySelectorAll('[data-template-theme]').forEach(b=>b.classList.toggle('is-active',b===button));
  });
});
document.querySelectorAll('[data-template-toast]').forEach(button=>{
  button.addEventListener('click',()=>{
    let region=document.querySelector('.toast-region');
    region.innerHTML='<div class="toast"><span class="sg-badge success">COPIED</span><strong>TEMPLATE ACTION READY</strong><p>This is a static preview action for the Saveglass template launcher.</p></div>';
    setTimeout(()=>region.innerHTML='',2600);
  });
});
