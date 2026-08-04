# Auditoría Lighthouse

## Estado actual (última auditoría: 2026-08-04)

| Categoría        | Puntaje |
| ---------------- | ------- |
| SEO              | 100     |
| Accesibilidad    | 100     |
| Buenas prácticas | 100     |
| Rendimiento      | 92      |

Medido con `npx lighthouse <url> --form-factor=mobile --screenEmulation.mobile` (perfil mobile, que es más estricto que desktop — es el que se reporta acá).

## Qué se corrigió en esta ronda

### Accesibilidad (91 → 100)

- **Listas rotas**: `FadeInSection` envolvía cada `<li>` en un `<div>` extra, así que `ul.tech-stack`, `ul.job-description` y `ul.projects-grid` no tenían `<li>` como hijo directo — un lector de pantalla no las reconocía como listas. Fix: `FadeInSection` ahora acepta un prop `as` (`<FadeInSection as="li">`) y se renderiza a sí mismo como el elemento de lista, en vez de envolverlo.
- **Landmark `<main>` faltante**: `App.jsx` envolvía todo el contenido enrutado en un `<div id="content">` — ahora es `<main id="content">`.
- **Íconos decorativos sin alternativa accesible**: los SVG de tecnologías en About (`tech-icon`) van siempre junto al nombre visible de la tecnología — se les agregó `aria-hidden="true"` en vez de dejar que un lector de pantalla anuncie "imagen" sin descripción.

### Buenas prácticas (96 → 100)

- **Logo de Siscodex con aspect-ratio incorrecto**: la regla CSS fijaba `height: 38px` con `width: auto`, pero dentro del `flex` del header (compartido con el badge de lanzamiento) el `width` podía comprimirse por debajo de lo que el aspect-ratio real (9.66:1) necesitaba, estirando el logo. Fix en `Siscodex.css`: `width` pasa a ser la dimensión fija (`367px` desktop / `290px` mobile) con `height: auto` — así el navegador siempre deriva el alto correcto sin importar cuánto espacio haya disponible.
- **Sin sourcemaps en producción**: se agregó `build.sourcemap: true` en `vite.config.js`. No expone nada que no esté ya público en el repo de GitHub.

### Rendimiento (58 → 92)

- **Foto de About sin comprimir (el hallazgo más grande)**: `fher.png` era la foto original de la cámara, 3024×4032px (12 megapíxeles), **931 KB**, mostrada en pantalla a un máximo de 240px de ancho. Se reemplazó por `fher.jpg`, una versión redimensionada a 480px de ancho (2x el tamaño máximo mostrado, para pantallas retina) y comprimida a JPEG calidad 85 — **50 KB**, 94% más liviana, sin pérdida de calidad visible. Ver [`resize-photo.cjs`](../resize-photo.cjs) y [`content-guide.md`](content-guide.md#3-cambiar-fotos).
- **Fuentes de Google bloqueando el render**: `NTR` y `Libre Baskerville` se cargaban con `@import` dentro de un `<style>` en el `<head>`, lo cual es render-blocking y además agrega una vuelta de red extra (el navegador tiene que descargar el CSS del `@import` antes de descubrir que necesita otra descarga). Se reemplazó por el patrón estándar "preload + swap": `<link rel="preload" as="style">` + `<link rel="stylesheet" media="print" onload="this.media='all'">` (con `<noscript>` de respaldo) — el navegador ya no espera a que las fuentes carguen para pintar la página.
- **Bundle inicial pesado**: se dividió el código con `React.lazy` + `Suspense` en `App.jsx` — `Intro` (lo único visible al cargar) se queda en el bundle principal, y `About`/`Experience`/`Projects`/`Blog`/`Siscodex`/`Credits` se cargan en chunks separados. El JS necesario para el primer pintado bajó de ~723 KB a ~577 KB sin minificar (~179 KB → ~131 KB con gzip).

## Por qué el rendimiento se quedó en 92, no en 100

Los ~8 puntos restantes vienen de decisiones de diseño reales, no de descuidos: las fuentes tipográficas propias, MUI, Bootstrap y la animación de partículas del retrato ASCII tienen un costo de carga/ejecución que es inherente a tenerlas. Se evaluó autohospedar las fuentes (en vez de cargarlas desde Google Fonts) como el único lever restante, pero como el patrón "preload + swap" ya las sacó del camino crítico de render, la ganancia estimada era de solo +1 a +3 puntos — no justifica el mantenimiento adicional. Decisión tomada explícitamente con Fherney el 2026-08-04: quedarse en 92.

Un sitio SPA con interactividad y fuentes propias llegando a 100 literal bajo las condiciones de prueba de Lighthouse (simulación de 4G lento + CPU limitada) es prácticamente inalcanzable sin renunciar a esas decisiones — los sitios que sacan 100 ahí suelen ser páginas casi sin JS ni fuentes web.

## Cómo volver a auditar

```bash
# Contra producción (requiere que el sitio esté desplegado)
npx lighthouse https://www.fherneysilva.com/ --form-factor=mobile --screenEmulation.mobile

# Contra un build local (más representativo de un cambio antes de deployar)
npm run build
npm run preview -- --port 4173
npx lighthouse http://localhost:4173/ --form-factor=mobile --screenEmulation.mobile
```

Agregar `--output=json --output-path=<archivo>` para guardar el reporte completo y explorarlo con Node (`require('<archivo>').categories`), o abrir el reporte HTML por defecto en el navegador si se omite `--output`.

**No** correr Lighthouse contra `npm run dev` — el servidor de desarrollo de Vite sirve módulos ES sin bundlear ni minificar, así que el puntaje de rendimiento sale artificialmente bajo y no refleja lo que ve un visitante real.
