# Despliegue

## Estado actual (verificado en el repo, no aspiracional)

- El repo se llama `fherneysilva.github.io` — el formato especial de nombre `usuario.github.io` que GitHub Pages reconoce automáticamente para servir un sitio personal.
- **No hay ningún workflow de GitHub Actions** (`.github/workflows/` no existe).
- **No hay dependencia `gh-pages`** en `package.json` ni script `deploy`.
- El repo tiene dos ramas: `develop` (donde vive todo el trabajo activo, código fuente sin compilar) y `master` (desactualizada, solo contiene el commit inicial con el `README.md` — no el sitio compilado).
- **Conclusión: el pipeline de publicación no está configurado todavía.** Aunque GitHub Pages esté activado en la configuración del repo apuntando a alguna rama, esa rama no contiene un build (`dist/`) — contiene código fuente de Vite/React, que un navegador no puede ejecutar directamente. Hace falta un paso de build antes de publicar.

## Cómo generar el build localmente (por ahora, manual)

```sh
npm run build      # genera dist/ con el sitio estático listo para servir
npm run preview    # sirve dist/ localmente para verificar antes de publicar
```

`vite.config.js` tiene `base: '/'`, correcto para un dominio raíz tipo `usuario.github.io` (no para un sub-path tipo `usuario.github.io/repo`).

## Opciones recomendadas para automatizar (pendiente de implementar)

Cualquiera de estas dos es estándar y de bajo mantenimiento; ninguna está implementada todavía en este repo:

### Opción A — GitHub Actions + GitHub Pages nativo (recomendada)

Workflow que compila en cada push a `develop` (o a `master`/`main` si se decide usar esa como rama de publicación) y despliega el resultado usando las actions oficiales `actions/upload-pages-artifact` + `actions/deploy-pages`. No requiere ninguna dependencia nueva en `package.json`; requiere habilitar "GitHub Actions" como fuente en Settings → Pages del repo.

### Opción B — paquete `gh-pages`

Agregar `gh-pages` como devDependency y un script `"deploy": "npm run build && gh-pages -d dist"` que se corre manualmente (o desde CI) y publica `dist/` a una rama `gh-pages`. Más simple de entender, pero requiere acordarse de correrlo o igual conectarlo a un workflow.

## Al decidir implementar

- Confirmar en Settings → Pages del repo en GitHub cuál es la fuente configurada actualmente (rama + carpeta, o "GitHub Actions").
- Elegir una sola rama como "fuente de verdad para producción" (`develop` es la activa hoy; si se prefiere seguir la convención `main`/`master` para producción, habría que decidir el flujo de merge).
- Una vez elegida la opción, actualizar este documento con el estado real (esta sección de "pendiente" debe reemplazarse por la descripción del pipeline efectivamente implementado).
