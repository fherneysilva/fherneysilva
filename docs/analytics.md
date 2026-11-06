# Analítica (Google Analytics)

## Estado actual

El sitio usa **Google Analytics 4** para medir tráfico, **con consentimiento previo**: `gtag.js` ya no se carga automáticamente en `index.html` — solo se inyecta si el visitante acepta el banner de cookies (`CookieBanner.jsx`). Si rechaza, o simplemente no decide, no sale ni un solo request a `googletagmanager.com`.

```js
// src/utils/analytics.js
export const loadAnalytics = () => {
  if (analyticsLoaded) return;
  analyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};
```

`loadAnalytics()` se llama desde dos lugares en `CookieBanner.jsx`: al hacer clic en "Aceptar", y en un `useEffect` al montar si ya había un consentimiento `"accepted"` guardado de una visita anterior (para no mostrar el banner de nuevo ni perder el tracking en visitas recurrentes). Ver [`content-guide.md`](content-guide.md) si hay que editar los textos del banner, y [`features.md`](features.md#banner-de-cookies-y-legales-cookiebannerjsx-legalmodaljsx) para el flujo completo.

- **Cuenta de Google Analytics**: "Fherney Silva".
- **Propiedad**: "Portafolio Fherney Silva".
- **Flujo de datos**: "Portafolio Web", URL `https://www.fherneysilva.com`.
- **Measurement ID**: `G-14P57CY0XJ`.
- **Medición mejorada** activada (la config por defecto de GA4): además de vistas de página, mide automáticamente scroll, clics salientes, búsquedas en el sitio, engagement con videos embebidos y descargas de archivos — sin necesitar código adicional.

## Cómo ver las métricas

1. Entra a [analytics.google.com](https://analytics.google.com) con la cuenta de Google usada para crearla.
2. Selecciona la propiedad **"Portafolio Fherney Silva"** (no la de otros proyectos que puedan existir en la misma cuenta de Google).
3. En el menú lateral, **Informes**:
   - **Tiempo real** — quién está en el sitio ahora mismo. Es instantáneo, útil para confirmar que el tracking funciona (abre el sitio en otra pestaña y se ve aparecer en segundos).
   - **Adquisición** — de dónde llegan los visitantes (LinkedIn, búsqueda, directo, etc.).
   - **Interacción → Páginas y pantallas** — qué tanto ven, tiempo en página.
   - **Datos demográficos** — país/ciudad aproximados.

Los informes estándar (no el de tiempo real) tardan típicamente 24–48 horas en poblarse la primera vez.

## Evento de conversión: `contact_click`

Además de la medición mejorada automática, se dispara un evento personalizado `contact_click` cada vez que un visitante hace clic en un enlace de contacto (`mailto:fherneysilva13@gmail.com`), con un parámetro `location` que identifica desde dónde se hizo clic: `intro` (botón "Contact me" del hero) o `navbar` (ícono de sobre en la barra de navegación).

- **Implementación**: `src/utils/analytics.js` expone `trackEvent(name, params)`, un wrapper que llama a `window.gtag(...)` solo si existe (evita errores si un bloqueador de anuncios impide que cargue `gtag.js`). Se invoca desde el `onClick` de cada enlace de contacto en `Intro.jsx` y `NavBar.jsx`.
- **Dónde verlo en GA4**: Informes → Interacción → Eventos, o crear un objetivo/conversión a partir de `contact_click` en Configurar → Eventos si se quiere medirlo como conversión formal.

## Evento `siscodex_visit_click`

Se dispara cuando un visitante hace clic en el link "Explore our solutions at siscodex.com" del header de la tarjeta Siscodex (`Siscodex.jsx`), con `location: "siscodex_header"`. Es la única acción de contacto/conversión que ofrece esa sección — no tiene un `mailto:` propio, el contacto real vive en siscodex.com.

## Qué NO expone GA4 (por diseño y por ley)

- Nombre, email o identidad real de un visitante.
- IP exacta (se usa internamente solo para geolocalización aproximada por ciudad, no se expone).
- Dirección física exacta.

Solo da estadísticas agregadas/anónimas — número de visitas, ubicación aproximada, origen del tráfico, comportamiento general.

## Si hay que cambiar el ID (ej. se crea una propiedad nueva)

Actualizar la constante `GA_MEASUREMENT_ID` en `src/utils/analytics.js` — es el único lugar donde vive el ID ahora (ya no está hardcodeado en `index.html`).

## Banner de cookies y consentimiento

- **Componente**: `CookieBanner.jsx` + `CookieBanner.css`, montado globalmente en `App.jsx`. Aparece fijo abajo en la primera visita (sin decisión guardada); desaparece al aceptar o rechazar.
- **Persistencia**: `localStorage` bajo la key `cookie-consent`, valores `"accepted"` / `"rejected"`. Para volver a ver el banner en desarrollo, borrar esa key (o todo el `localStorage`) desde DevTools.
- **Rechazar es real**: no es solo cosmético — si el visitante rechaza (o cierra sin decidir y nunca vuelve a aceptar), `gtag.js` nunca se descarga, así que no hay absolutamente ningún tracking.
- **Link "Política de privacidad" dentro del banner** abre el mismo `LegalModal.jsx` que usan los links del footer.
