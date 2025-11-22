// carrito.js — gestión completa del carrito: cantidades, eliminar, total y persistencia
(function(){
  function ensureAuth(){
    const session = JSON.parse(localStorage.getItem('session')||'null');
    if(!session){ window.location.href = '/login.html'; }
  }

  // Formatea un número como precio en Bolivianos con 2 decimales y sufijo " Bs"
  function formatBs(amount){
    if(typeof amount !== 'number') amount = Number(amount) || 0;
    return amount.toFixed(2) + ' Bs';
  }

  function getCart(){ return JSON.parse(localStorage.getItem('cart')||'[]'); }
  function saveCart(cart){ localStorage.setItem('cart', JSON.stringify(cart)); }

  function renderCart(){
    const itemsEl = document.getElementById('cart-items');
    const emptyEl = document.getElementById('cart-empty');
    const cart = getCart();
    itemsEl.innerHTML = '';
  if(cart.length===0){ emptyEl.style.display='block'; document.getElementById('cart-total').textContent=formatBs(0); return; }
    emptyEl.style.display='none';
    cart.forEach(item=>{
      const div = document.createElement('div'); div.className='list-group-item d-flex align-items-center';
      div.innerHTML = `
        <img src="${item.img}" alt="" width="80" height="60" class="me-3 rounded" style="object-fit:cover">
        <div class="flex-grow-1">
          <h6 class="mb-1">${item.title}</h6>
          <small class="text-muted">${formatBs(item.price)}</small>
        </div>
        <div class="d-flex align-items-center ms-3">
          <button class="btn btn-outline-secondary qty-btn me-1" data-id="${item.id}" data-op="dec">−</button>
          <span class="mx-2">${item.qty}</span>
          <button class="btn btn-outline-secondary qty-btn ms-1" data-id="${item.id}" data-op="inc">+</button>
          <button class="btn btn-outline-danger ms-3" data-id="${item.id}" data-op="del">Eliminar</button>
        </div>`;
      itemsEl.appendChild(div);
    });
    updateTotal();
  }

  function updateTotal(){
    const cart = getCart();
    const total = cart.reduce((s,i)=> s + i.price*i.qty, 0);
    document.getElementById('cart-total').textContent = formatBs(total);
  }

  function changeQty(id,op){
    const cart = getCart();
    const item = cart.find(i=>i.id===id);
    if(!item) return;
    if(op==='inc') item.qty +=1;
    if(op==='dec') item.qty = Math.max(1, item.qty-1);
    saveCart(cart); renderCart();
  }

  function removeItem(id){
    let cart = getCart(); cart = cart.filter(i=>i.id!==id); saveCart(cart); renderCart();
  }

  window.addEventListener('DOMContentLoaded', ()=>{
    ensureAuth();
    renderCart();

    document.getElementById('cart-items').addEventListener('click', (e)=>{
      const btn = e.target.closest('button'); if(!btn) return;
      const id = btn.dataset.id; const op = btn.dataset.op;
      if(op==='inc' || op==='dec') changeQty(id,op);
      if(op==='del') removeItem(id);
    });

    document.getElementById('clear-cart').addEventListener('click', ()=>{
      if(confirm('Vaciar el carrito?')){ localStorage.removeItem('cart'); renderCart(); }
    });

    document.getElementById('checkout').addEventListener('click', ()=>{
      alert('Gracias por su compra (simulado).'); localStorage.removeItem('cart'); renderCart();
    });
  });

})();
