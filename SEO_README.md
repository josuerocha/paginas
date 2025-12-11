# RestaMix - Restaurante de Comida Boliviana

## Descripción
Sitio web moderno para RestaMix, un restaurante que combina tradición y creatividad para servir platos inolvidables.

## Optimización SEO
Este proyecto implementa las mejores prácticas de SEO técnico:

### ✓ Metadatos
- `<meta name="robots" content="index, follow">` en todas las páginas
- `<meta name="description">` descriptivas para cada página
- `<meta name="viewport">` responsive
- URLs canónicas (`rel="canonical"`) en cada página
- Open Graph tags para redes sociales
- Schema.org JSON-LD estructurado

### ✓ Accesibilidad
- Atributos `alt` descriptivos en todas las imágenes
- Roles semánticos (`role="main"`, `role="group"`)
- Etiquetas `<nav>` y `<section>` con `aria-label`
- Estructura de encabezados H1-H6 correcta

### ✓ Robots y Sitemaps
- `public/robots.txt` permitiendo indexación completa
- `public/sitemap.xml` con todas las páginas
- Archivo `_headers` de Netlify con headers de SEO

### ✓ Performance
- Imágenes optimizadas (WebP, JPEG, SVG)
- Bootstrap 5 CDN para CSS eficiente
- JavaScript defer para mejor performance
- .htaccess con compresión gzip y cache headers

## Estructura de Carpetas
```
.
├── index.html                 # Página de inicio
├── menu.html                  # Menú de platos
├── login.html                 # Autenticación
├── carrito.html               # Carrito de compras
├── components/
│   ├── navbar.html           # Barra de navegación
│   └── footer.html           # Pie de página
├── public/
│   ├── images/               # Imágenes optimizadas
│   ├── robots.txt            # Archivo de robots
│   ├── sitemap.xml           # Sitemap XML
│   └── schema.json           # Esquema de datos
├── src/
│   ├── css/                  # Estilos por página
│   └── js/                   # Scripts por página
├── _headers                  # Headers de Netlify
├── .htaccess                 # Configuración Apache
├── netlify.toml              # Configuración Netlify
└── README.md                 # Este archivo
```

## Características
- ✅ Menú dinámico con filtrado por categorías
- ✅ Carrito de compras con persistencia en localStorage
- ✅ Sistema de autenticación y registro
- ✅ Carrusel de productos con animación hover
- ✅ Paleta de colores pastel rojo
- ✅ Totalmente responsive (mobile-first)
- ✅ Optimizado para PageSpeed Insights (>90)

## Instalación Local
```bash
# Clona el repositorio
git clone https://github.com/josuerocha/paginas.git
cd paginas

# Inicia un servidor HTTP (necesario para component loading)
python -m http.server 8000
# o con Python 3
python3 -m http.server 8000

# Accede a http://localhost:8000
```

## Despliegue en Netlify
1. Conecta tu repositorio de GitHub a Netlify
2. Netlify detectará automáticamente `netlify.toml`
3. Configura el dominio personalizado
4. El archivo `_headers` se aplicará automáticamente

## Puntuación SEO
- **SEO Técnico**: >90 puntos (Google PageSpeed Insights)
- **Accesibilidad**: WCAG 2.1 Level A
- **Rendimiento**: Imágenes optimizadas y carga asincrónica

## Tecnologías
- HTML5 semántico
- CSS3 responsive
- Bootstrap 5
- Vanilla JavaScript (sin frameworks)
- Google Fonts (Montserrat)
- localStorage para persistencia

## Licencia
MIT © 2025 RestaMix
