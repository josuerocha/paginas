// index.js — carga navbar/footer y maneja interacciones simples
(function(){
  // Carga componentes de /components y ejecuta acciones post-insert
  async function loadComponent(path){
    try{
      const res = await fetch(path);
      if(!res.ok) throw new Error('HTTP '+res.status);
      return await res.text();
    }catch(e){ console.error('Error cargando componente',path,e); return '' }
  }

  async function init(){
    const navHtml = await loadComponent('components/navbar.html');
    const footHtml = await loadComponent('components/footer.html');
    const navPlace = document.getElementById('navbar-placeholder');
    const footPlace = document.getElementById('footer-placeholder');
    if(navPlace) navPlace.innerHTML = navHtml;
    if(footPlace) footPlace.innerHTML = footHtml;

    // Después de insertar, ajustar año en footer
    const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Actualizar contador del carrito
    function updateCartCount(){
      const cart = JSON.parse(localStorage.getItem('cart')||'[]');
      const count = cart.reduce((s,i)=>s+i.qty,0);
      const el = document.getElementById('nav-cart-count');
      if(el) el.textContent = count;
    }

    // Mostrar login/logout según sesión
    function updateAuthLinks(){
      const user = JSON.parse(localStorage.getItem('session')||'null');
      const loginLink = document.getElementById('nav-login-link');
      const logoutLink = document.getElementById('nav-logout-link');
      if(user){
        if(loginLink) { loginLink.textContent = user.name; loginLink.href = 'index.html'; }
        if(logoutLink) {
          logoutLink.classList.remove('d-none');
          // remover listeners previos (si los hay)
          logoutLink.replaceWith(logoutLink.cloneNode(true));
          const newLogout = document.getElementById('nav-logout-link');
          newLogout.addEventListener('click', ()=>{
            localStorage.removeItem('session');
            updateAuthLinks();
            window.location.href = 'index.html';
          });
        }
      } else {
        if(loginLink){ loginLink.textContent = 'Iniciar sesión'; loginLink.href='login.html'; }
        const logoutLinkEl = document.getElementById('nav-logout-link'); if(logoutLinkEl) logoutLinkEl.classList.add('d-none');
      }
    }

    // Inicializar
    updateCartCount(); updateAuthLinks();

    // Escuchar actualizaciones globales
    window.addEventListener('cartUpdated', updateCartCount);

    // Poblar carrusel del hero con imágenes de productos
    function populateHeroCarousel(){
      const container = document.getElementById('hero-carousel-inner');
      if(!container) return;
      // intentar obtener productos desde localStorage
      let products = JSON.parse(localStorage.getItem('products')||'null');
      // fallback: lista por defecto (rutas presentes en public/images)
      if(!products || !Array.isArray(products) || products.length===0){
        products = [
          {title:'Ensalada fresca', img:'public/images/Ensalada.webp'},
          {title:'Pique Macho', img:'public/images/pique.jpg'},
          {title:'Chicharrón', img:'public/images/chicharron.webp'},
          {title:'Silpancho', img:'public/images/silpancho.jpg'},
          {title:'Gelatina', img:'public/images/gelatina.jpg'},
        ];
      }

      container.innerHTML = '';
      products.forEach((p, idx)=>{
        const item = document.createElement('div');
        item.className = 'carousel-item' + (idx===0? ' active':'');
        const img = document.createElement('img');
        img.src = p.img;
        img.className = 'd-block w-100';
        img.alt = p.title || ('Slide '+(idx+1));
        // opcional: envolver con caption
        const caption = document.createElement('div');
        caption.className = 'carousel-caption d-none d-md-block text-start';
        caption.innerHTML = `<h5>${p.title || ''}</h5>`;
        item.appendChild(img);
        item.appendChild(caption);
        container.appendChild(item);
      });

      // Inicializar carousel con intervalo automático
      try{
        const el = document.getElementById('hero-carousel');
        if(el) new bootstrap.Carousel(el, {interval:3500, ride: 'carousel', pause: 'hover'});
      }catch(e){ /* bootstrap no disponible o error */ }
    }

    populateHeroCarousel();
  }

  // Start
  window.addEventListener('DOMContentLoaded', init);
})();
