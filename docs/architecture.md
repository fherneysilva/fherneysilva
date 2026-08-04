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
| Analítica | Google Analytics 4 (`gtag.js`, cargado inline en `index.html`, sin paquete npm) |

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
│   ├── theme/                 # Sistema de tema claro/oscuro (ver sección abajo)
│   ├── styles/                # Un .css por componente + Global.css
│   ├── App.jsx                # Composición de secciones + routing
│   ├── App.css
│   ├── index.css              # Reset/estilos base
│   └── main.jsx                # Entry point, monta <App /> envuelto en <ThemeProvider> + <LanguageProvider>
├── extract_ascii.cjs          # Script Node/Playwright para regenerar asciiData.js
├── resize-photo.cjs           # Script Node/Playwright para comprimir/redimensionar fotos de contenido
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

## Sistema de tema (claro/oscuro)

Mismo patrón arquitectónico que el i18n (Context + hook, sin librería externa):

- **`src/theme/context.js`** — `React.createContext`.
- **`src/theme/ThemeContext.jsx`** — `Provider` que expone `{ theme, toggleTheme }` (`theme` es `"dark"` o `"light"`). Envuelve `<App />` en `main.jsx`, por fuera de `<LanguageProvider>`.
- **`src/theme/useTheme.js`** — hook (`const { theme, toggleTheme } = useTheme()`).
- **Persistencia**: `localStorage` bajo la key `portfolio-theme`. Oscuro es el valor por defecto si no hay nada guardado.
- **Aplicación del tema**: `ThemeContext.jsx` hace `document.documentElement.setAttribute("data-theme", theme)` en un `useEffect`. Un script inline en el `<head>` de `index.html` hace lo mismo de forma síncrona (leyendo `localStorage` directamente) **antes** de que React monte, para evitar un parpadeo del tema incorrecto en la primera pintura.
- **Colores**: todas las variables de color están en `src/styles/Global.css`, definidas dos veces — una vez bajo `:root, :root[data-theme="dark"]` (valores por defecto) y otra bajo `:root[data-theme="light"]` (overrides). Como el resto del CSS del sitio ya consume estas variables (`var(--navy)`, `var(--green-bright)`, etc.) en vez de colores hardcodeados, la mayoría de los componentes heredan el tema automáticamente sin necesitar CSS propio. Ver [`content-guide.md`](content-guide.md#5-cambiar-la-paleta-de-colores) para editar los colores.
- El botón sol/luna (`NavBar.jsx`, `.theme-toggle-btn`, íconos `FiSun`/`FiMoon` de `react-icons`) llama a `toggleTheme()`.

**Excepción — el retrato ASCII**: el color de sus partículas está fijo en JS (no usa las variables CSS), porque siempre se dibuja sobre un fondo oscuro en ambos temas — ver la sección siguiente.

## Pipeline del retrato ASCII

El efecto de partículas ASCII en la sección Intro (`AsciiPortrait.jsx`) **no** procesa la imagen en tiempo real en el navegador del visitante — los datos ya vienen precalculados:

1. `public/profile.png` es la foto fuente.
2. `extract_ascii.cjs` (Node + Playwright, se corre manualmente con `node extract_ascii.cjs`) abre un navegador headless, rasteriza la imagen en un `<canvas>` en 4 tamaños (`460, 380, 320, 250` px, para distintos breakpoints), calcula densidad de carácter por brillo de píxel, y escribe el resultado en `src/assets/asciiData.js`.
3. En producción, `AsciiPortrait.jsx` simplemente lee `asciiData[size]` (sin Playwright, sin procesamiento de imagen) y anima las partículas con `requestAnimationFrame` + interacción de mouse/touch.
4. Si `asciiData[size]` no existe para el tamaño actual (fallback improbable), el componente procesa `public/profile.png` en el propio navegador del visitante como respaldo.

**Glow en modo claro**: el retrato siempre se dibuja con partículas color ámbar sobre fondo oscuro — en modo oscuro ese fondo es la página misma; en modo claro, `AsciiPortrait.jsx` construye una vez (no en cada frame, por rendimiento) un canvas auxiliar fuera de pantalla, dibuja un círculo difuminado (`filter: blur(...)`) en la posición de reposo (`targetX`/`targetY`) de cada partícula, y lo pega detrás de las partículas en cada frame (`ctx.drawImage`). El resultado sigue la silueta real del retrato en vez de una forma geométrica genérica (círculo/óvalo) — eso ya se probó y se descartó por verse "tosco". Además, `.intro-simulation` recorta el canvas en mobile (`overflow: hidden` + `transform: scale(1.25)` en el canvas) para eliminar el margen vacío que trae la imagen fuente (procesada al 80% de escala).

**Regenerar el retrato**: si cambia `public/profile.png`, hay que correr `node extract_ascii.cjs` de nuevo y commitear el `asciiData.js` resultante — no ocurre automáticamente en el build.

## SEO

Como el sitio es una SPA de una sola página estática (sin SSR ni pre-renderizado), el SEO se apoya en lo que puede ir directamente en `index.html` y en `public/`:

- **Meta tags** en `index.html`: `title`, `description`, `canonical`, Open Graph (`og:*`) y Twitter Card (`twitter:*`, `summary_large_image` con imagen — usa `public/assets/hi-fher.png` como preview al compartir el link).
- **Datos estructurados**: un bloque `<script type="application/ld+json">` con schema.org `Person` (nombre, `jobTitle`, `worksFor: Siscodex`, `sameAs` con GitHub/LinkedIn/blog) para que buscadores puedan mostrar un rich snippet.
- **`public/sitemap.xml`**: un único `<url>` (la raíz `/`, ya que no hay rutas adicionales que indexar).
- **`public/robots.txt`**: permite todo el crawling y referencia el sitemap.
- **`lang` dinámico**: `LanguageContext.jsx` actualiza `document.documentElement.lang` (`"en"`/`"es"`) cada vez que cambia el idioma, y el script inline de `index.html` lo fija correctamente antes del primer render (mismo mecanismo que evita el parpadeo de tema) — así el atributo `lang` real coincide con el idioma que ve el visitante, no queda fijo en `"en"`.

## Calidad de código

- `npm run lint` corre ESLint con reglas de `eslint-plugin-react-hooks` (incluye la regla estricta `set-state-in-effect`) y `eslint-plugin-react-refresh`.
- No hay test runner configurado (no Vitest/Jest/Playwright Test como framework de pruebas — Playwright solo se usa como herramienta puntual en `extract_ascii.cjs` y `resize-photo.cjs`).
- Advertencia conocida y aceptada: `AsciiPortrait.jsx` dispara `react-hooks/set-state-in-effect` porque llama `setDataReady(true)` de forma síncrona dentro de un `useEffect`. No se corrige porque el fix implicaría reestructurar el timing de la animación (que depende de `performance.now()` capturado en ese mismo punto) y el riesgo de romper la animación ajustada a mano supera el beneficio de silenciar un lint no funcional.
