# Cebichería María Pastor — Plataforma Web Oficial & Carta Digital

[![Astro](https://img.shields.io/badge/Astro-v5.x-ff5d01?logo=astro&logoColor=white)](https://astro.build/)
[![Sanity CMS](https://img.shields.io/badge/Sanity-v3.x-red?logo=sanity&logoColor=white)](https://www.sanity.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.x-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Plataforma web de última generación para **Cebichería María Pastor**, diseñada para ofrecer una experiencia gastronómica digital rápida, elegante e interactiva. Cuenta con una landing page de alto impacto, carta digital interactiva con carrito de compras, gestión de contenido Headless con Sanity CMS y un sistema seguro de pedidos por WhatsApp con validación de precios en servidor. Este es un proyecto personal desarrollado con fines educativos.

---

## Características Principales

- **Carta Digital Interactiva:** Visualización dinámica de categorías y platos sincronizados en tiempo real desde Sanity CMS.
- **Carrito de Compras Persistente:** Mantiene el estado de los pedidos mediante `localStorage` para una experiencia fluida.
- **Enrutamiento Multi-Sede:** Envió automatizado de pedidos a las distintas sedes del restaurante (Jesús María, San Isidro, Surquillo).
- **Seguridad Anti-Manipulación de Precios:** Arquitectura de validación en servidor mediante **Google Apps Script** que consulta la API oficial de Sanity (GROQ) para verificar los precios reales antes de emitir cualquier cobro o mensaje a WhatsApp.
- **Ultra Optimización de Rendimiento:** 
  - Renderizado Estático Ultra Rápido (**Astro SSG**).
  - Pipeline de imágenes adaptativo (`Astro Assets` + CDN Sanity WebP/AVIF).
  - Carga prioritaria (*eager*) de imágenes LCP y *lazy loading* en componentes secundarios.
- **Diseño Moderno & Responsive:** Tema oscuro elegante (*Dark Mode*), efectos de *glassmorphism*, tipografía refinada y micro-animaciones fluidas.
- **SEO de Producción:** Estructura HTML5 semántica, OpenGraph meta tags y accesibilidad optimizada.

---

## Stack Tecnológico

| Componente | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Frontend Framework** | [Astro](https://astro.build/) | Generador de sitios estáticos (SSG) de ultra alto rendimiento. |
| **Styling** | [TailwindCSS](https://tailwindcss.com/) | Estilos utilitarios y sistema de diseño adaptativo. |
| **Headless CMS** | [Sanity.io](https://www.sanity.io/) | Gestión dinámica de categorías, platos, precios y fotos. |
| **Backend / Gateway** | [Google Apps Script](https://developers.google.com/apps-script) | Servicio Serverless para validación de precios y webhooks. |
| **WhatsApp Integration** | [Green API](https://green-api.com/) | Gateway automatizado para el envío de mensajes de pedidos y links de cobro Yape. |

---

## Estructura del Proyecto

```text
landing_mariaPastor/
├── public/                     # Archivos estáticos de acceso directo (favicons, robots.txt)
├── src/
│   ├── assets/                 # Recursos e imágenes locales optimizadas por Astro
│   │   └── img/                # Ilustraciones y fotos de productos
│   ├── components/             # Componentes modulares UI
│   │   ├── Navbar.astro        # Barra de navegación principal
│   │   ├── Hero.astro          # Sección principal / Banner
│   │   ├── Historia.astro      # Sección de historia del restaurante
│   │   ├── Menu.astro          # Vista previa del menú
│   │   ├── Ubicaciones.astro   # Información de sedes y mapa
│   │   ├── Carousel.astro      # Galería/Carrusel interactivo
│   │   └── Footer.astro        # Pie de página y enlaces sociales
│   ├── layouts/
│   │   └── Layout.astro        # Estructura base HTML, SEO y Google Fonts
│   ├── pages/
│   │   ├── index.astro         # Landing page principal
│   │   └── carta.astro         # Página de la carta interactiva y checkout
│   └── styles/
│       └── global.css          # Estilos globales y tokens CSS
├── mariapastor/                # Panel de control Sanity Studio (CMS)
│   ├── schemaTypes/            # Esquemas de datos (categorías, platillos)
│   └── sanity.config.js        # Configuración del CMS Sanity
├── .env                        # Variables de entorno (no subir al repositorio)
└── astro.config.mjs            # Configuración general de Astro
```

---

## Arquitectura de Seguridad (Validación de Precios)

Para prevenir manipulación de precios desde las herramientas de desarrollo del cliente (*DevTools*):

1. **Frontend (Astro):** El cliente selecciona sus platos y el navegador envía únicamente los nombres y cantidades al webhook:
   ```json
   {
     "cliente": "Nombre Cliente",
     "celular": "989752595",
     "sede": "Jesus Maria",
     "items": [
       { "name": "Trilogía De Leches", "quantity": 2 }
     ]
   }
   ```
2. **Backend (Google Apps Script):** 
   - El script intercepta la solicitud en servidor.
   - Ejecuta una consulta GROQ a la API pública de Sanity para obtener el catálogo de precios oficial.
   - Multiplica la cantidad pedida por el precio real registrado en el CMS.
   - Genera el monto exacto y arma el mensaje de confirmación para WhatsApp/Yape.

---

## Configuración y Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en la siguiente estructura:

```env
# Configuración del CMS Sanity
PUBLIC_SANITY_PROJECT_ID
PUBLIC_SANITY_DATASET

# URLs de Webhook para procesar pedidos
PUBLIC_GOOGLE_SCRIPT_URL
PUBLIC_MAKE_WEBHOOK_URL
```



---

## Comandos de Desarrollo

```bash
# Instalar dependencias del proyecto principal
npm install

# Iniciar el servidor de desarrollo local (localhost:4321)
npm run dev

# Compilar para producción (genera la carpeta ./dist)
npm run build

# Previsualizar el build de producción localmente
npm run preview
```

Para ejecutar el panel de **Sanity Studio (CMS)** localmente:

```bash
cd mariapastor
npm install
npm run dev
```

---

