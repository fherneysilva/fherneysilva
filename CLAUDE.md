# CLAUDE.md

Este archivo brinda contexto a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Proyecto

Este es el código fuente de gazijarin.com (v2) — un sitio de portafolio personal construido con Vite + React 19, Material UI, Bootstrap 5 y React Router. Se despliega en `www.gazijarin.com` (ver `CNAME`).

## Comandos

- `npm install` — instala las dependencias
- `npm run dev` — inicia el servidor de desarrollo de Vite (host: true, puerto 5173)
- `npm run build` — genera el build de producción con Vite
- `npm run preview` — previsualiza un build de producción
- `npm run lint` — ejecuta ESLint sobre el proyecto (configuración flat en `eslint.config.js`)

No hay ningún script de test runner configurado en `package.json`. Existe `src/App.test.jsx` y usa `@testing-library/react`, pero no hay un test runner (p. ej. Vitest/Jest) conectado — verifica esto antes de asumir que se pueden correr tests. Playwright es una devDependency pero solo se usa en el script puntual `extract_ascii.cjs` (ver abajo), no como framework de testing; no existe `playwright.config`.

## Arquitectura

- **SPA con rutas** definidas en `src/App.jsx`: `/` renderiza el portafolio completo en scroll (Intro, About, Experience, Projects, HardwareProjects, Art, Credits como secciones apiladas), `/art` renderiza `ArtGallery`, y `/hardware/:projectId` renderiza `ProjectLog` (páginas de detalle por proyecto).
- **Componentes** viven de forma plana en `src/components/`, cada uno normalmente emparejado con una hoja de estilos del mismo nombre en `src/styles/` (importada directamente por el componente, no vía CSS modules).
- **NavBar y SidebarNav** se montan globalmente en `App.jsx` junto al contenido enrutado — proveen navegación persistente en todas las rutas.
- **RobotGame** es un overlay/easter-egg opcional activado por un botón flotante "game mode" en `App.jsx` (el estado vive en `App` y se pasa vía la prop `active`); se renderiza sobre el contenido de la página sin importar la ruta.
- **Retrato ASCII**: `src/assets/asciiData.js` contiene renderizados de arte ASCII precalculados de la imagen de perfil, consumidos por `AsciiPortrait.jsx`. `extract_ascii.cjs` (script Node/Playwright en la raíz, no forma parte del bundle de la app) regenera estos datos rasterizando `public/profile.png` en un canvas de navegador headless — vuelve a ejecutarlo manualmente con `node extract_ascii.cjs` si cambia la imagen fuente.
- **Assets estáticos**: imágenes/fuentes/íconos servidos desde `public/` (favicons, fuentes, manifest) vs. assets importados en `src/assets/` (empaquetados por Vite). `public/assets/` contiene imágenes de proyectos de arte/hardware referenciadas por `Projects`, `HardwareProjects`, `Art` y `ProjectLog`.
- **Estilos**: mezcla de hojas de estilo globales (`src/index.css`, `src/App.css`, `src/styles/Global.css`) y CSS por componente; el CSS de Bootstrap se importa globalmente en `main.jsx`, mientras que los componentes de MUI se usan selectivamente por componente.
