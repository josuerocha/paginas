// login.js — registro, login, validaciones y sesión usando localStorage
(function(){
  function getUsers(){
    return JSON.parse(localStorage.getItem('users')||'[]');
  }
  function saveUsers(users){ localStorage.setItem('users', JSON.stringify(users)); }

  function register(e){
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const pass = document.getElementById('reg-pass').value;
    if(!name || !email || !pass){ alert('Completa todos los campos'); return; }
    if(pass.length<6){ alert('La contraseña debe tener al menos 6 caracteres'); return; }
    const users = getUsers();
    if(users.find(u=>u.email===email)){ alert('Ya existe una cuenta con ese email'); return; }
    users.push({id:'u'+Date.now(), name, email, pass});
    saveUsers(users);
    alert('Registro exitoso. Ahora puedes iniciar sesión');
    document.getElementById('register-form').reset();
  }

  function login(e){
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const pass = document.getElementById('login-pass').value;
    const err = document.getElementById('login-error');
    const users = getUsers();
    const user = users.find(u=>u.email===email && u.pass===pass);
    if(user){
      localStorage.setItem('session', JSON.stringify({id:user.id, name:user.name, email:user.email}));
      // redirect to index or previous
      window.location.href = '/';
    } else {
      err.style.display='block'; err.textContent='Email o contraseña incorrectos';
    }
  }

  window.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('register-form').addEventListener('submit', register);
    document.getElementById('login-form').addEventListener('submit', login);
  });
})();
