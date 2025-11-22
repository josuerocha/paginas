// menu.js — controla productos, subida de imagen a base64, y carrito
(function(){
  // Productos iniciales (si no hay en localStorage)
  // Menú base: 3 Principales, 2 Entradas y 2 Postres
  const SAMPLE_PRODUCTS = [
    // Entradas (2)
    {id: 'e1', title:'Ensalada fresca', desc:'Mezcla de hojas con vinagreta cítrica', price:5.50, category:'Entradas', img:'public/images/Ensalada.webp'},
    {id: 'e2', title:'Empanada frita', desc:'Empanada rellena y frita, crujiente por fuera', price:3.75, category:'Entradas', img:'public/images/dish12.svg'},
    // Principales (3)
    {id: 'pm1', title:'Pique Macho', desc:'Fuerte, picante y abundante — la especialidad para compartir', price:14.50, category:'Principales', img:'public/images/pique.jpg'},
  {id: 'pm2', title:'Chicharrón', desc:'Crujiente, dorado y servido con limón y yuca', price:12.00, category:'Principales', img:'public/images/chicharron.webp'},
    {id: 'pm3', title:'Silpancho', desc:'Plato tradicional con carne empanada, arroz, papas y huevo', price:13.25, category:'Principales', img:'public/images/silpancho.jpg'},
    // Postres (2)
    {id: 'd1', title:'Gelatina', desc:'Gelatina casera con frutas', price:2.50, category:'Postres', img:'public/images/gelatina.jpg'},
    {id: 'd2', title:'Galletas caseras', desc:'Galletas recién horneadas, mantequilla y chispas', price:3.00, category:'Postres', img:'public/images/dish14.svg'}
  ];

  function getProducts(){
    return JSON.parse(localStorage.getItem('products')||'null') || SAMPLE_PRODUCTS;
  }

  // Formatea un número como precio en Bolivianos con 2 decimales y sufijo " Bs"
  function formatBs(amount){
    if(typeof amount !== 'number') amount = Number(amount) || 0;
    return amount.toFixed(2) + ' Bs';
  }

  function saveProducts(list){
    localStorage.setItem('products', JSON.stringify(list));
  }

  function renderProducts(filterCat='Todos'){
    const container = document.getElementById('products');
    const products = getProducts();
    container.innerHTML = '';
    const toShow = products.filter(p=> filterCat==='Todos' || p.category===filterCat);
    toShow.forEach(p=>{
      const col = document.createElement('div'); col.className='col-sm-6 col-lg-4';
      const card = document.createElement('div'); card.className='card card-product shadow-sm';
      const img = document.createElement('img'); img.src = p.img; img.className='card-img-top'; img.alt=p.title;
      const body = document.createElement('div'); body.className='card-body';
      const h5 = document.createElement('h5'); h5.textContent = p.title;
      const pdesc = document.createElement('p'); pdesc.textContent = p.desc; pdesc.className='text-muted';
  const price = document.createElement('div'); price.className='mb-2'; price.textContent = formatBs(p.price);
      const actions = document.createElement('div'); actions.className='product-actions';
      const btn = document.createElement('button'); btn.className='btn btn-success'; btn.textContent='Agregar al carrito';
      btn.addEventListener('click', ()=> addToCart(p.id));
      actions.appendChild(price); actions.appendChild(btn);
      body.appendChild(h5); body.appendChild(pdesc); body.appendChild(actions);
      card.appendChild(img); card.appendChild(body); col.appendChild(card); container.appendChild(col);
    });
  }

  function addToCart(productId){
    const products = getProducts();
    const prod = products.find(p=>p.id===productId);
    if(!prod) return;
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    const exists = cart.find(c=>c.id===productId);
    if(exists){ exists.qty += 1; } else { cart.push({id:productId, title:prod.title, price:prod.price, img:prod.img, qty:1}); }
    localStorage.setItem('cart', JSON.stringify(cart));
    // update navbar count
    const evt = new Event('cartUpdated'); window.dispatchEvent(evt);
    alert('Producto agregado al carrito');
  }



  // category handling
  let currentCategory = 'Todos';

  window.addEventListener('DOMContentLoaded', ()=>{
    // Normalizar productos de forma conservadora:
    // - Si no existe array en localStorage, guardar SAMPLE_PRODUCTS.
    // - Si existe, asegurarse de que haya al menos una Entrada y un Postre; si faltan,
    //   añadir sólo los productos de SAMPLE_PRODUCTS que pertenezcan a esas categorías
    //   y que no estén ya presentes (por id o title).
    const existing = JSON.parse(localStorage.getItem('products')||'null');
    if(!existing || !Array.isArray(existing) || existing.length === 0){
      saveProducts(SAMPLE_PRODUCTS);
    } else {
      // Migrar rutas de imagen de productos existentes (por título) hacia las nuevas imágenes locales
      const titleToImg = {
        'Ensalada fresca':'public/images/Ensalada.webp',
        'Empanada frita':'public/images/dish12.svg',
        'Pique Macho':'public/images/pique.jpg',
        'Chicharrón':'public/images/chicharron.webp',
        'Silpancho':'public/images/silpancho.jpg',
        'Gelatina':'public/images/gelatina.jpg',
        'Galletas caseras':'public/images/dish14.svg'
      };
      let migrated = false;
      existing.forEach(p=>{
        if(p && p.title && titleToImg[p.title] && p.img !== titleToImg[p.title]){
          p.img = titleToImg[p.title];
          migrated = true;
        }
      });
      if(migrated) saveProducts(existing);

      let modified = false;
      let haveEntrada = existing.some(p=>p.category==='Entradas');
      let havePostre = existing.some(p=>p.category==='Postres');
      let havePrincipal = existing.some(p=>p.category==='Principales');
      // helper to check presence by id or title
      const existsProduct = (prod)=> existing.some(e=> e.id===prod.id || (e.title && prod.title && e.title.toLowerCase()===prod.title.toLowerCase()));
      // if missing entradas or postres, add from SAMPLE_PRODUCTS
      SAMPLE_PRODUCTS.forEach(sp => {
        if(!existsProduct(sp)){
          if((sp.category==='Entradas' && !haveEntrada) || (sp.category==='Postres' && !havePostre) || (sp.category==='Principales' && !havePrincipal)){
            existing.push(sp); modified = true;
            // update flags so we don't add multiple
            if(sp.category==='Entradas') haveEntrada = true;
            if(sp.category==='Postres') havePostre = true;
            if(sp.category==='Principales') havePrincipal = true;
          }
        }
      });
      if(modified) saveProducts(existing);
    }
    // initial render
    renderProducts();

    document.querySelectorAll('.categoria-btn').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        document.querySelectorAll('.categoria-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.cat;
        renderProducts(currentCategory);
      });
    });

    // No hay control de subida de imágenes en la UI (opción removida)

    // NO se agregan productos de muestra automáticamente (opción removida por pedido)

    // react to cart updates (update navbar count)
    window.addEventListener('cartUpdated', ()=>{
      const countEl = document.getElementById('nav-cart-count');
      if(countEl){ const cart = JSON.parse(localStorage.getItem('cart')||'[]'); countEl.textContent = cart.reduce((s,i)=>s+i.qty,0); }
    });
  });

})();
