# Documentación funcional

Descripción de qué hace cada sección del sitio, en el orden en que aparecen al hacer scroll. Pensado para responder "¿qué componente controla esto que veo en la página?".

## Navegación (siempre visible)

- **NavBar** (`NavBar.jsx`) — barra superior fija. Nombre + enlaces a cada sección (ancla `#id`), íconos de contacto (email, GitHub, LinkedIn, blog externo), el botón de idioma **EN/ES** y el botón de tema **sol/luna**. En mobile (≤991px, el breakpoint real donde Bootstrap colapsa el navbar con `expand="lg"`) colapsa a un menú hamburguesa (Bootstrap `Navbar.Toggle`) que bloquea el scroll del body mientras está abierto; ahí los íconos de contacto se muestran en fila horizontal, no apilados.
- **SidebarNav** (`SidebarNav.jsx`) — columna lateral de enlaces tipo `/home /about /...`, solo visible en pantallas ≥800px (se oculta en mobile porque ya existe el menú de NavBar).
- **BackToTop** (`BackToTop.jsx`) — botón flotante que aparece tras hacer scroll y sube la página al tope.

## Intro (`#intro`, `Intro.jsx`)

Sección de bienvenida (hero). Combina el retrato ASCII animado (`AsciiPortrait.jsx`, ver [`architecture.md`](architecture.md#pipeline-del-retrato-ascii)) con: el saludo + nombre animado con efecto "typewriter" (`react-type-animation`, se escribe una sola vez, no rotativo), un tagline en cursiva tipo frase ("Building technology that scales.", tipografía `Libre Baskerville`), una línea de rol ("Senior Software Engineer, Tech Lead & CEO of Siscodex."), un párrafo breve de presentación y el botón de contacto (`mailto:`).

## About (`#about`, `About.jsx`)

Foto de perfil real + biografía corta (2-4 frases) + objetivo profesional. Usa `t.about.leadIn` para la frase introductoria ("Actualmente soy...") de forma que no quede mezclada en inglés cuando el sitio está en español.

## Experience (`#experience`, `Experience.jsx` + `JobList.jsx`)

Experiencia laboral en formato de tabs (uno por empleo): Datacrédito Experian (Technical Lead / Senior Software Engineer), BBVA, Professional Care, Freelance. Cada tab lista responsabilidades/logros en bullets.

## Projects (`#projects`, `Projects.jsx`)

Grid de tarjetas de proyectos, agrupadas en dos categorías (sin carrusel de imágenes — se eliminó el que traía la plantilla original):
- **Cloud & Enterprise** — proyectos internos de Datacrédito Experian (sin repos públicos, se muestran como logros descriptivos).
- **Freelance & Personal** — proyectos para clientes (Mind21, Bio Dx, Centro Odontológico Sonrilaser, etc.).

## Blog (`#blog`, `Blog.jsx`)

Tarjeta única que enlaza al blog externo de Fherney (Hashnode, `target="_blank"` con `rel="noopener noreferrer"`). Muestra tags/temas y un call-to-action.

## Siscodex (`#siscodex`, `Siscodex.jsx`)

Sección "mi empresa" — presenta Siscodex, la empresa de software que Fherney lidera como fundador y CEO junto a tres socios cofundadores. Estructura de la tarjeta, de arriba a abajo:
- **Header**: logo de Siscodex + badge de lanzamiento ("Launching August 2026" / "Lanzamos agosto 2026").
- **Bio**: 2-3 párrafos de presentación (rol, misión, forma de trabajar como aliado tecnológico) — tono de empresa ya formada, no de startup buscando sus primeros clientes.
- **Qué hacemos**: grid de 3 servicios (Software a Medida, Infraestructura Cloud, Modernización de Plataformas), cada uno con ícono y descripción corta.
- **Por qué Siscodex**: grid de 4 diferenciadores (trato directo, escalabilidad, experiencia cloud, ingeniería senior).
- **Cómo trabajamos**: track numerado de 4 pasos (Discovery → Planning → Development → Launch) — lenguaje deliberadamente no técnico/orientado a PM, sin revelar fechas ni estado real del roadmap interno.
- **CTA de cierre**: invitación a contactar por correo (`mailto:`), sin link "Saber más" por tarjeta (no hay páginas de destino aún).

El link "Siscodex" en el NavBar/SidebarNav usa un efecto de brillo reflectivo (`SiscodexNavLabel.jsx` + `SiscodexNavLabel.css`) en el verde esmeralda propio de la marca Siscodex (`--siscodex-accent`, distinto del ámbar del resto del portafolio), no plateado — para señalar que es un proyecto/marca aparte.

## Credits (`#credits`, `Credits.jsx`)

Cierre del sitio: "Built and designed by Fherney Silva" (y su equivalente en español), sin atribución a plantillas de terceros.

## Comportamiento transversal

- **FadeInSection** (`FadeInSection.jsx`) — envuelve secciones/enlaces y les aplica una animación de aparición (`opacity`/`transform`) la primera vez que entran en el viewport, usando `IntersectionObserver` (una sola vez por elemento, luego se desuscribe).
- **Selector de idioma** — el botón "EN"/"ES" en el NavBar cambia todo el texto narrativo del sitio (ver [`architecture.md`](architecture.md#sistema-de-i18n)); la elección persiste entre visitas.
- **Selector de tema** — el botón sol/luna en el NavBar cambia entre modo oscuro (default) y claro (ver [`architecture.md`](architecture.md#sistema-de-tema-claro-oscuro)); la elección también persiste entre visitas.
- **Responsive** — el sitio fue auditado en el rango 320px–1920px sin overflow horizontal ni elementos rotos; el SidebarNav y el layout de Projects son los puntos que más cambian entre mobile y desktop.
- **Analítica** — Google Analytics 4 mide visitas, origen del tráfico e interacción en todo el sitio (ver [`analytics.md`](analytics.md)); no depende de ninguna sección en particular.
