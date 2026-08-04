# CLAUDE.md

Este archivo brinda contexto a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Proyecto

Este es el portafolio personal de Fherney Silva — un sitio de una sola página construido con Vite + React 19, Material UI, Bootstrap 5 y React Router, que presenta su experiencia, proyectos y habilidades. Se despliega en GitHub Pages bajo `fherneysilva.github.io`.

## Comandos

- `npm install` — instala las dependencias
- `npm run dev` — inicia el servidor de desarrollo de Vite (host: true, puerto 5173)
- `npm run build` — genera el build de producción con Vite
- `npm run preview` — previsualiza un build de producción
- `npm run lint` — ejecuta ESLint sobre el proyecto (configuración flat en `eslint.config.js`)

No hay ningún test runner configurado en `package.json` ni script de test.

## Documentación

Este archivo es la referencia rápida para trabajar en el código. La documentación completa (técnica y funcional) vive en [`docs/`](docs/README.md):

- [`docs/architecture.md`](docs/architecture.md) — stack, estructura de carpetas, routing, sistema de i18n, pipeline del retrato ASCII, estilos.
- [`docs/features.md`](docs/features.md) — qué hace cada sección del sitio (Intro, About, Experience, Projects, Blog, Siscodex, Credits, navegación).
- [`docs/content-guide.md`](docs/content-guide.md) — cómo actualizar el contenido (experiencia, proyectos, textos EN/ES, fotos, retrato ASCII) sin tocar lógica.
- [`docs/deployment.md`](docs/deployment.md) — estado actual del despliegue en GitHub Pages y qué falta configurar.

## Arquitectura

- **SPA de una sola ruta** definida en `src/App.jsx`: `/` renderiza el portafolio completo en scroll (Intro, About, Experience, Projects, Blog, Siscodex, Credits como secciones apiladas).
- **Componentes** viven de forma plana en `src/components/`, cada uno normalmente emparejado con una hoja de estilos del mismo nombre en `src/styles/` (importada directamente por el componente, no vía CSS modules).
- **NavBar y SidebarNav** se montan globalmente en `App.jsx` junto al contenido enrutado — proveen navegación persistente. **BackToTop** es un botón flotante que aparece al hacer scroll. **FadeInSection** envuelve secciones/enlaces para animarlos al entrar en viewport (vía `IntersectionObserver`).
- **i18n**: selector de idioma EN/ES implementado sin librerías externas — `src/i18n/content.js` (diccionario `{ en, es }`), `src/i18n/context.js` + `LanguageContext.jsx` (Provider, envuelve `App` desde `main.jsx`) y `useLanguage.js` (hook de consumo). La elección se persiste en `localStorage` bajo la key `portfolio-lang`. Ver [`docs/content-guide.md`](docs/content-guide.md) para cómo editar los textos.
- **Retrato ASCII**: `src/assets/asciiData.js` contiene renderizados de arte ASCII precalculados de la imagen de perfil, consumidos por `AsciiPortrait.jsx`. `extract_ascii.cjs` (script Node/Playwright en la raíz, no forma parte del bundle de la app) regenera estos datos rasterizando `public/profile.png` en un canvas de navegador headless — vuelve a ejecutarlo manualmente con `node extract_ascii.cjs` si cambia la imagen fuente.
- **Assets estáticos**: imágenes/fuentes/íconos servidos desde `public/` (favicon, fuentes, manifest) vs. assets importados en `src/assets/` (empaquetados por Vite). `public/assets/` contiene las fotos de perfil y el logo de Siscodex referenciados por `About`, `Intro` y `Siscodex`.
- **Estilos**: mezcla de hojas de estilo globales (`src/index.css`, `src/App.css`, `src/styles/Global.css`) y CSS por componente; el CSS de Bootstrap se importa globalmente en `main.jsx`, mientras que los componentes de MUI se usan selectivamente por componente.

## Estado conocido / pendientes

- **Despliegue**: automatizado con GitHub Actions (`.github/workflows/deploy.yml`), dispara en cada push a `master` y publica a GitHub Pages. Ver [`docs/deployment.md`](docs/deployment.md) para el flujo completo.
- **Ramas**: `develop` es la rama activa de trabajo (no despliega nada); `master` es producción — se actualiza con merge manual desde `develop` cuando algo está listo para publicarse.
- **Lint**: `AsciiPortrait.jsx` tiene un warning conocido y aceptado de `react-hooks/set-state-in-effect` — no se corrige porque el riesgo de alterar el timing de la animación de partículas (ajustada a mano) supera el beneficio de silenciar un lint no funcional.
- **Dominio propio**: pendiente de compra (`www.fherneysilva.com`). Hasta que esté conectado, todo debe seguir apuntando a `fherneysilva.github.io`.
