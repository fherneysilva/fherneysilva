# Analítica (Google Analytics)

## Estado actual

El sitio usa **Google Analytics 4** para medir tráfico. La implementación es el snippet estándar de `gtag.js`, cargado directamente en `index.html` (sin paquete npm, sin wrapper de React):

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-14P57CY0XJ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag("js", new Date());
  gtag("config", "G-14P57CY0XJ");
</script>
```

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

## Qué NO expone GA4 (por diseño y por ley)

- Nombre, email o identidad real de un visitante.
- IP exacta (se usa internamente solo para geolocalización aproximada por ciudad, no se expone).
- Dirección física exacta.

Solo da estadísticas agregadas/anónimas — número de visitas, ubicación aproximada, origen del tráfico, comportamiento general.

## Si hay que cambiar el ID (ej. se crea una propiedad nueva)

Actualizar el string `G-14P57CY0XJ` en **ambos** lugares donde aparece en `index.html` (la URL del `<script src="...">` y el `gtag("config", ...)`) — son el mismo ID repetido dos veces, no dos IDs distintos.

## Pendiente / no implementado

- No hay banner de consentimiento de cookies. Para una audiencia mayormente colombiana esto no es legalmente obligatorio hoy, pero si el sitio empieza a recibir tráfico relevante de la Unión Europea, valdría la pena revisar un aviso de cookies (GDPR).
- No se han configurado eventos personalizados ni objetivos de conversión (ej. "clic en Contact me") — la medición mejorada cubre lo básico, pero un evento específico para el botón de contacto sería una mejora natural si se quiere medir cuántos visitantes intentan contactar.
