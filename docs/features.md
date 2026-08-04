# Documentación funcional

Descripción de qué hace cada sección del sitio, en el orden en que aparecen al hacer scroll. Pensado para responder "¿qué componente controla esto que veo en la página?".

## Navegación (siempre visible)

- **NavBar** (`NavBar.jsx`) — barra superior fija. Nombre + enlaces a cada sección (ancla `#id`), íconos de contacto (email, GitHub, LinkedIn, blog externo) y el botón de idioma **EN/ES**. En mobile colapsa a un menú hamburguesa (Bootstrap `Navbar.Toggle`) que bloquea el scroll del body mientras está abierto.
- **SidebarNav** (`SidebarNav.jsx`) — columna lateral de enlaces tipo `/home /about /...`, solo visible en pantallas ≥800px (se oculta en mobile porque ya existe el menú de NavBar).
- **BackToTop** (`BackToTop.jsx`) — botón flotante que aparece tras hacer scroll y sube la página al tope.

## Intro (`#intro`, `Intro.jsx`)

Sección de bienvenida (hero). Combina el retrato ASCII animado (`AsciiPortrait.jsx`, ver [`architecture.md`](architecture.md#pipeline-del-retrato-ascii)) con el nombre, tagline profesional y una animación de texto tipo "typewriter" (`react-type-animation`) rotando roles/frases.

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

Sección "mi empresa" — presenta Siscodex con su logo y una etiqueta de estado ("coming soon" / en construcción, vía `SiscodexNavLabel.jsx`, que también decora el link correspondiente en el NavBar/SidebarNav).

## Credits (`#credits`, `Credits.jsx`)

Cierre del sitio: "Built and designed by Fherney Silva" (y su equivalente en español), sin atribución a plantillas de terceros.

## Comportamiento transversal

- **FadeInSection** (`FadeInSection.jsx`) — envuelve secciones/enlaces y les aplica una animación de aparición (`opacity`/`transform`) la primera vez que entran en el viewport, usando `IntersectionObserver` (una sola vez por elemento, luego se desuscribe).
- **Selector de idioma** — el botón "EN"/"ES" en el NavBar cambia todo el texto narrativo del sitio (ver [`architecture.md`](architecture.md#sistema-de-i18n)); la elección persiste entre visitas.
- **Responsive** — el sitio fue auditado en el rango 320px–1920px sin overflow horizontal ni elementos rotos; el SidebarNav y el layout de Projects son los puntos que más cambian entre mobile y desktop.
