/* Site interactions: header behavior, reveal animations, FAQ accordion */
(function(){
  // Header solid toggle
  const header = document.getElementById('siteHeader');
  const headerToggle = () => {
    if(window.scrollY > 60) header.classList.add('solid'); else header.classList.remove('solid');
  };
  headerToggle();
  window.addEventListener('scroll', headerToggle, {passive:true});

  // IntersectionObserver reveal
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Stagger reveals for grids
  function stagger(selector, childSelector, delay){ 
    const root = document.querySelector(selector);
    if(!root) return;
    const items = root.querySelectorAll(childSelector);
    items.forEach((it, i) => {
      it.style.transitionDelay = (i*delay) + 'ms';
      revealObserver.observe(it);
    });
  }
  stagger('#products .grid', '.card', 120);
  stagger('#testimonials .testi-grid', '.testi', 90);

  // FAQ accordion - accessible
  document.querySelectorAll('.faq-q').forEach(q => {
    const ans = q.nextElementSibling;
    q.addEventListener('click', () => {
      const isOpen = ans.style.maxHeight && ans.style.maxHeight !== '0px';
      document.querySelectorAll('.faq-a').forEach(a => { a.style.maxHeight = null; a.style.paddingBottom = '0'; a.previousElementSibling.classList.remove('open') });
      if(!isOpen){
        ans.style.maxHeight = ans.scrollHeight + 'px';
        ans.style.paddingBottom = '1rem';
        q.classList.add('open');
      }
    });
    q.addEventListener('keydown', (ev) => { if(ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); q.click(); }});
  });
})();