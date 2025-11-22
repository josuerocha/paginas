# RestaMix — Proyecto Web para Restaurante

RestaMix es un proyecto de demostración de un sitio web para un restaurante ficticio.

Características principales:

- Páginas separadas: `index.html`, `menu.html`, `login.html`, `carrito.html`.
- Componentes reutilizables: `components/navbar.html`, `components/footer.html`.
- Arquitectura separada: CSS y JS externos por página en `/src`.
- Funcionalidades dinámicas: registro/login, carrito con persistencia (localStorage), subida de imágenes (FileReader -> base64) y adición dinámica de productos.
- Diseño responsivo usando Bootstrap 5 y Google Fonts.

Estructura del proyecto

```
/public
   /images

/src
   /css
      index.css
      menu.css
      login.css
      carrito.css

   /js
      index.js
      menu.js
      login.js
      carrito.js

/components
   navbar.html
   footer.html

index.html
menu.html
login.html
carrito.html
README.md
```

Tecnologías usadas

- HTML5
- CSS3 + Bootstrap 5 (CDN)
- JavaScript (vanilla)
- Google Fonts

Cómo ejecutar localmente

1. Clona el repositorio o descarga los archivos.
2. Para evitar problemas con fetch y rutas en `file://`, sirve el sitio con un servidor local. Ejemplos:

   - Usando Python 3:

     ```powershell
     python -m http.server 5500
     ```

   - O usando VSCode: Live Server extension.

3. Abre en el navegador `http://localhost:5500` (o el puerto que definas).

Desplegar en Netlify

1. Crea un repo en GitHub con todo el contenido.
2. Ve a Netlify y elige "New site from Git".
3. Conecta el repo y despliega (no necesitas build command si solo son archivos estáticos).

Notas importantes

- El sistema de login/registro y carrito usa `localStorage` para persistencia.
- `carrito.html` está protegido: si no hay sesión activa, redirige a `login.html`.
- Las imágenes cargadas por el formulario se guardan en `localStorage` en base64 y se muestran dinámicamente.

Si quieres que suba este proyecto a un repositorio Git en tu máquina, dímelo y lo hago.

---
RestaMix — listo para GitHub / Netlify
