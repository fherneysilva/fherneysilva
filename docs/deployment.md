# Despliegue

## Estado actual

El sitio se despliega automáticamente a GitHub Pages con GitHub Actions, definido en [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).

- **Disparador**: cada push a `master`.
- **Build**: `npm ci` + `npm run build` (Node 20), genera `dist/`.
- **Publicación**: `actions/upload-pages-artifact` + `actions/deploy-pages` (mecanismo nativo de GitHub Pages, sin rama `gh-pages` ni paquetes de terceros).

## Flujo de ramas

- **`develop`** — rama activa de trabajo. Todo el desarrollo y las pruebas ocurren acá. Los pushes a `develop` **no** disparan ningún despliegue.
- **`master`** — rama de producción. Refleja lo que está publicado en `www.fherneysilva.com`. Se actualiza haciendo merge manual desde `develop` cuando algo está listo para publicarse:

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

## Dominio propio

Comprado en Squarespace Domains (2 años, con auto-renovación) y conectado:

1. **DNS** (en el panel de Squarespace): registro `CNAME` — `www` → `fherneysilva.github.io`.
2. **`public/CNAME`** — contiene `www.fherneysilva.com`, para que Vite lo incluya en cada build y GitHub Pages sepa qué dominio servir.
3. **GitHub → Settings → Pages → Custom domain** — configurado con `www.fherneysilva.com`, HTTPS forzado una vez GitHub terminó de emitir el certificado.
4. **`index.html`** — `canonical`, `og:url`, `og:title`, `og:description` y `twitter:card` ya apuntan a `https://www.fherneysilva.com/`.

`fherneysilva.github.io` sigue existiendo pero GitHub lo redirige automáticamente al dominio propio.

**Pendiente opcional**: agregar una imagen `og:image` real (ya se diseñaron opciones, ver conversación con Claude) — hoy las tarjetas de redes sociales muestran solo texto, sin imagen de preview.
