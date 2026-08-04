# Documentación — Portafolio de Fherney Silva

Este directorio contiene la documentación técnica y funcional del proyecto `fherneysilva.github.io`. Está pensada para que cualquiera (incluido tú mismo, meses después) pueda retomar el trabajo sin tener que releer todo el código primero.

## Índice

| Documento | Contenido |
| --- | --- |
| [`architecture.md`](architecture.md) | Stack técnico, estructura de carpetas, routing, sistema de i18n, pipeline del retrato ASCII, estilos y herramientas de calidad. |
| [`features.md`](features.md) | Qué hace cada sección del sitio, de arriba a abajo, en términos funcionales (no de código). |
| [`content-guide.md`](content-guide.md) | Cómo actualizar experiencia, proyectos, textos EN/ES, fotos y el retrato ASCII sin tocar lógica de componentes. |
| [`deployment.md`](deployment.md) | Cómo se publica el sitio hoy (estado real, no aspiracional) y qué falta para automatizarlo. |

## Cómo usar esta documentación

- Si vas a **cambiar contenido** (texto, experiencia, proyectos, fotos): empieza por `content-guide.md`.
- Si vas a **entender o modificar cómo funciona el sitio**: empieza por `architecture.md`, y usa `features.md` como mapa de qué componente corresponde a qué sección visible.
- Si vas a **publicar cambios**: revisa `deployment.md` antes de asumir que existe un pipeline automático.
- El archivo [`CLAUDE.md`](../CLAUDE.md) en la raíz del repo es la referencia rápida (comandos, arquitectura resumida) pensada para trabajar con Claude Code; esta carpeta es la versión extendida.

## Convenciones del proyecto

- **Commits**: estilo [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `style:`, `docs:`), mensajes cortos y precisos.
- **Idioma del código/documentación interna**: español (comentarios de commits, `CLAUDE.md`, `docs/`). El `README.md` público (la cara del repo en GitHub) está en inglés, orientado a reclutadores.
- **Sin backend**: el sitio es 100% estático (SPA client-side), no hay servidor propio, API ni base de datos.
