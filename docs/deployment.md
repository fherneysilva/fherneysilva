# Despliegue

## Estado actual

El sitio se despliega automáticamente a GitHub Pages con GitHub Actions, definido en [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).

- **Disparador**: cada push a `master`.
- **Build**: `npm ci` + `npm run build` (Node 20), genera `dist/`.
- **Publicación**: `actions/upload-pages-artifact` + `actions/deploy-pages` (mecanismo nativo de GitHub Pages, sin rama `gh-pages` ni paquetes de terceros).

## Flujo de ramas

- **`develop`** — rama activa de trabajo. Todo el desarrollo y las pruebas ocurren acá. Los pushes a `develop` **no** disparan ningún despliegue.
- **`master`** — rama de producción. Refleja lo que está publicado en `fherneysilva.github.io`. Se actualiza haciendo merge manual desde `develop` cuando algo está listo para publicarse:

  ```sh
  git checkout master
  git merge develop
  git push origin master   # esto dispara el deploy automáticamente
  git checkout develop     # volver a seguir trabajando acá
  ```

## Paso manual único (ya hecho / a verificar)

GitHub Pages debe tener configurado **Settings → Pages → Source → "GitHub Actions"** en el repositorio (en vez de una rama específica). Esto se configura una sola vez desde la interfaz de GitHub — no se puede hacer vía git. Si el workflow falla en el primer run con un error relacionado a Pages, es la señal de que este paso falta.

## Cómo generar el build localmente (para probar antes de mergear a master)

```sh
npm run build      # genera dist/ con el sitio estático listo para servir
npm run preview    # sirve dist/ localmente para verificar antes de publicar
```

`vite.config.js` tiene `base: '/'`, correcto para un dominio raíz tipo `usuario.github.io` (no para un sub-path tipo `usuario.github.io/repo`). Si en el futuro se conecta un dominio propio (custom domain), este valor no cambia — sigue siendo la raíz.

## Dominio propio (pendiente)

Fherney planea comprar `www.fherneysilva.com`. Cuando esté listo, conectar un dominio propio a GitHub Pages requiere:

1. Configurar los registros DNS del dominio (CNAME o registros A, según el proveedor) apuntando a GitHub Pages.
2. Agregar un archivo `CNAME` en la raíz de `public/` con el dominio (ej. `www.fherneysilva.com`), para que Vite lo incluya en el build.
3. Configurarlo también en Settings → Pages → Custom domain.
4. Actualizar `og:url` y demás referencias de dominio en `index.html` una vez esté funcionando (hasta entonces, deben seguir apuntando a `fherneysilva.github.io`, que es donde el sitio realmente vive).

No implementar nada de esto hasta que el dominio esté efectivamente comprado y listo para conectar.
