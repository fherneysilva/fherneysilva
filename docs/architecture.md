# Arquitectura técnica

## Stack

| Capa | Tecnología |
| --- | --- |
| Build tool | [Vite](https://vite.dev/) 8 |
| Framework UI | React 19 |
| Enrutamiento | React Router 7 (`react-router-dom`) |
| Componentes UI | Material UI (MUI) 9 + React Bootstrap 2 / Bootstrap 5 |
| Iconos | `@mui/icons-material`, `react-icons` |
| Animación de texto | `react-type-animation` |
| Lint | ESLint 9 (config plana, `eslint.config.js`) |
| Generación del retrato ASCII | Playwright (solo como herramienta de build offline, no en runtime) |

No hay backend, base de datos, ni gestor de estado global (Redux/Zustand/etc.) — todo el estado vive en componentes React (`useState`) o en el Context de idioma.

## Estructura de carpetas

```
├── public/                  # Assets servidos tal cual (sin procesar por Vite)
│   ├── assets/               # Fotos de perfil, logo de Siscodex
│   ├── favicon.svg
│   └── profile.png           # Imagen fuente para el retrato ASCII
├── src/
│   ├── assets/
│   │   └── asciiData.js      # Datos precalculados del retrato ASCII (generado, no editar a mano)
│   ├── components/           # Un componente por archivo, sin subcarpetas
│   ├── i18n/                 # Sistema de idioma EN/ES (ver sección i18n abajo)
│   ├── styles/                # Un .css por componente + Global.css
│   ├── App.jsx                # Composición de secciones + routing
│   ├── App.css
│   ├── index.css              # Reset/estilos base
│   └── main.jsx                # Entry point, monta <App /> envuelto en <LanguageProvider>
├── extract_ascii.cjs          # Script Node/Playwright para regenerar asciiData.js
├── eslint.config.js
├── vite.config.js
└── docs/                       # Esta documentación
```

No se usan CSS Modules ni styled-components: cada componente importa su propio `.css` con clases planas (convención BEM-ish informal, ej. `.projects-card`, `.card-title`).

## Routing

`src/App.jsx` define una única ruta (`/`) que renderiza, en orden, todas las secciones apiladas en scroll:

```
Intro → About → Experience → Projects → Blog → Siscodex → Credits
```

`NavBar`, `SidebarNav` y `BackToTop` se montan fuera del `<Routes>`, como navegación persistente. No hay rutas adicionales (`/art`, `/hardware/:id`, etc. — esas existieron en versiones anteriores del proyecto y fueron eliminadas junto con sus componentes).

## Sistema de i18n

Implementado desde cero, sin librería externa (no `react-i18next` ni similar):

- **`src/i18n/content.js`** — diccionario plano `{ en: {...}, es: {...} }` con toda la copy del sitio, organizada por sección (`nav`, `intro`, `about`, `experience`, `projects`, `siscodex`, `blog`, `credits`).
- **`src/i18n/context.js`** + **`LanguageContext.jsx`** — `React.createContext` + `Provider` que expone `{ language, t, toggleLanguage }`. Envuelve `<App />` en `main.jsx`.
- **`src/i18n/useLanguage.js`** — hook (`const { t } = useLanguage()`) que consume el context; los componentes leen textos como `t.about.leadIn`, nunca hardcodean strings visibles.
- **Persistencia**: la elección de idioma se guarda en `localStorage` bajo la key `portfolio-lang` y se restaura al cargar.
- El botón de idioma (`NavBar.jsx`, `.lang-toggle-btn`) llama a `toggleLanguage()`.

Ver [`content-guide.md`](content-guide.md) para el flujo de edición de textos.

## Pipeline del retrato ASCII

El efecto de partículas ASCII en la sección Intro (`AsciiPortrait.jsx`) **no** procesa la imagen en tiempo real en el navegador del visitante — los datos ya vienen precalculados:

1. `public/profile.png` es la foto fuente.
2. `extract_ascii.cjs` (Node + Playwright, se corre manualmente con `node extract_ascii.cjs`) abre un navegador headless, rasteriza la imagen en un `<canvas>` en 4 tamaños (`460, 380, 320, 250` px, para distintos breakpoints), calcula densidad de carácter por brillo de píxel, y escribe el resultado en `src/assets/asciiData.js`.
3. En producción, `AsciiPortrait.jsx` simplemente lee `asciiData[size]` (sin Playwright, sin procesamiento de imagen) y anima las partículas con `requestAnimationFrame` + interacción de mouse/touch.
4. Si `asciiData[size]` no existe para el tamaño actual (fallback improbable), el componente procesa `public/profile.png` en el propio navegador del visitante como respaldo.

**Regenerar el retrato**: si cambia `public/profile.png`, hay que correr `node extract_ascii.cjs` de nuevo y commitear el `asciiData.js` resultante — no ocurre automáticamente en el build.

## Calidad de código

- `npm run lint` corre ESLint con reglas de `eslint-plugin-react-hooks` (incluye la regla estricta `set-state-in-effect`) y `eslint-plugin-react-refresh`.
- No hay test runner configurado (no Vitest/Jest/Playwright Test como framework de pruebas — Playwright solo se usa como herramienta puntual en `extract_ascii.cjs`).
- Advertencia conocida y aceptada: `AsciiPortrait.jsx` dispara `react-hooks/set-state-in-effect` porque llama `setDataReady(true)` de forma síncrona dentro de un `useEffect`. No se corrige porque el fix implicaría reestructurar el timing de la animación (que depende de `performance.now()` capturado en ese mismo punto) y el riesgo de romper la animación ajustada a mano supera el beneficio de silenciar un lint no funcional.
