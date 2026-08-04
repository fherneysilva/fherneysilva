# Guía de contenido

Cómo actualizar la información del sitio sin tocar lógica de componentes. La mayoría de los cambios de contenido (texto) se hacen en **un solo archivo**: `src/i18n/content.js`.

## 1. Editar textos (experiencia, proyectos, bio, nav, etc.)

Todo el texto visible del sitio vive en `src/i18n/content.js`, como un diccionario `{ en: {...}, es: {...} }`. **Los dos idiomas se editan por separado y de forma independiente** — no hay traducción automática, así que cualquier cambio de contenido hay que replicarlo en ambos bloques (`en` y `es`) o el sitio quedará desincronizado entre idiomas.

Estructura por sección (mismas claves en `en` y `es`):

```js
{
  nav: { home, about, experience, software, blog, siscodex },
  intro: { ... },      // saludo, nombre, tagline en cursiva, rol, párrafo, cta
  about: { ... },       // bio, leadIn, objetivo profesional
  experience: { ... },  // título de sección + datos por empleo (usado por JobList.jsx)
  projects: { ... },    // grupos de proyectos y sus tarjetas
  siscodex: { ... },    // texto de la sección "mi empresa"
  blog: { ... },        // eyebrow, texto, tags, cta
  credits: { ... },     // frase de cierre
}
```

**No hace falta tocar ningún componente `.jsx`** para cambiar texto — todos leen del hook `useLanguage()` (`const { t } = useLanguage()`) y renderizan `t.seccion.clave`. Si agregas una clave nueva, agrégala en **ambos** idiomas o el componente que la use quedará `undefined` en uno de los dos.

## 2. Agregar o quitar un empleo / proyecto

- **Experiencia**: la lista de empleos vive en `content.js` bajo `experience` (revisa `JobList.jsx` para ver exactamente qué claves consume — título, fechas, bullets). Agregar un empleo nuevo es agregar un objeto más al arreglo, en `en` y `es`.
- **Proyectos**: igual, bajo `projects`, agrupados por categoría (`cloud`/`enterprise` vs `freelance`/`personal` — revisa `Projects.jsx` para los nombres exactos de las claves de agrupación). Cada tarjeta típicamente tiene `title`, `description`, `tech` (stack) y opcionalmente un link.

## 3. Cambiar fotos

- **Foto de perfil (sección About)**: reemplaza `public/assets/fher.png` (o `fher-no-bg.png` si `About.jsx` usa la versión sin fondo) manteniendo el mismo nombre de archivo, o actualiza la ruta en `About.jsx` si usas un nombre distinto.
- **Logo de Siscodex**: `public/assets/siscodex-nbg-trimmed.png`, referenciado en `Siscodex.jsx`.
- **Imagen de preview al compartir el link (Open Graph/Twitter Card)**: `public/assets/hi-fher.png`, referenciada en `index.html` (`og:image`/`twitter:image`) con la URL absoluta `https://www.fherneysilva.com/assets/hi-fher.png`. Si cambias o reemplazas esta imagen, actualiza esas dos meta tags también (y la del JSON-LD `Person.image`, misma URL).
- Todas las imágenes de contenido viven en `public/assets/` — cualquier imagen nueva debe ir ahí (no en `src/assets/`, que está reservado para assets empaquetados por Vite como `asciiData.js`).

## 4. Regenerar el retrato ASCII

Si cambias la foto fuente del retrato animado:

1. Reemplaza `public/profile.png` con la nueva imagen (cuadrada o casi-cuadrada da mejor resultado).
2. Corre `node extract_ascii.cjs` desde la raíz del proyecto (requiere que Playwright y sus navegadores estén instalados: `npx playwright install chromium` si es la primera vez).
3. Esto sobrescribe `src/assets/asciiData.js` — revísalo con `git diff` y commitéalo junto con el cambio de imagen.
4. Verifica visualmente con `npm run dev` — el retrato es sensible a fotos con fondos muy claros/oscuros o mucho contraste; si se ve "vacío" en zonas (cabello, torso), puede ayudar ajustar el `scale`/umbral de alpha en `extract_ascii.cjs` (mismo algoritmo que usa `AsciiPortrait.jsx` como fallback, deben mantenerse en sync).

## 5. Cambiar la paleta de colores

El sitio tiene **dos** paletas: oscura (default) y clara. Ambas viven en `src/styles/Global.css`, como las mismas variables (`--navy`, `--light-navy`, `--green-bright`, `--slate`, etc.) definidas dos veces:

```css
:root, :root[data-theme="dark"] { --navy: #16161a; --green-bright: #e8a34d; /* ... */ }
:root[data-theme="light"]        { --navy: #faf8f5; --green-bright: #a8671f; /* ... */ }
```

Cambiar un color en cualquiera de los dos bloques lo propaga a todo el sitio (todo el CSS de componentes usa `var(--nombre)`, no colores hardcodeados). **Si tocas el acento (`--green-bright`/`--green-rgb`) o el fondo (`--navy`/`--dark-navy`)**, revisa también:

- `AsciiPortrait.jsx` — el color de las partículas (`ACCENT_RGB`) y el color del glow en modo claro (`GLOW_COLOR`) están hardcodeados en JS (un canvas no puede leer variables CSS directamente) y hay que actualizarlos a mano para que combinen. Hay un comentario en el código señalando este acoplamiento.
- `NavBar.css` / `BackToTop.css` — usan `rgba(var(--green-rgb), alpha)` para los tintes translúcidos; si cambias el acento, `--green-rgb` debe quedar en sync con `--green-bright` (mismo color, formato "r, g, b" sin `rgba()`).

**Siscodex tiene su propio acento**, independiente del acento general del portafolio (para señalar que es una marca aparte): `--siscodex-accent` (emerald, `#10b981` oscuro / `#047a4f` claro), definido dentro de `.siscodex-card` en `Siscodex.css`. El brillo reflectivo del link "Siscodex" en el NavBar (`SiscodexNavLabel.css`) usa ese mismo verde pero con su propio gradiente hardcodeado (no una `var()`) — si cambias el emerald de Siscodex, actualiza también los tonos del gradiente ahí para que combinen.

La tabla de colores también está documentada (para referencia visual, solo el tema oscuro) en el `README.md` público.

## 6. Buenas prácticas al editar contenido

- Mantén `en` y `es` sincronizados en número de claves — una clave presente en un idioma y ausente en el otro rompe silenciosamente ese idioma (`undefined` en vez de texto).
- No hardcodees texto visible directamente en un componente `.jsx` — si un componente nuevo necesita texto, agrégalo a `content.js` y consúmelo vía `t`.
- Después de cambios de contenido, corre `npm run lint` y una revisión visual rápida (`npm run dev`) en ambos idiomas antes de commitear.
