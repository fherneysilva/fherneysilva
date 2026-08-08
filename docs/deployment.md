# Despliegue

## Estado actual

El sitio se despliega automáticamente a GitHub Pages con GitHub Actions, definido en [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).

- **Disparador**: cada push a `master`.
- **Build**: `npm ci` + `npm run build` (Node 22), genera `dist/`.
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

`vite.config.js` tiene `base: './'` (rutas relativas) — ver [Compatibilidad con hosting en subcarpeta](#compatibilidad-con-hosting-en-subcarpeta-fallback-de-githubio) más abajo para el porqué.

## Dominio propio

Comprado en Squarespace Domains (2 años, con auto-renovación) y conectado:

1. **DNS** (en el panel de Squarespace): registro `CNAME` — `www` → `fherneysilva.github.io`.
2. **`public/CNAME`** — contiene `www.fherneysilva.com`, para que Vite lo incluya en cada build y GitHub Pages sepa qué dominio servir.
3. **GitHub → Settings → Pages → Custom domain** — configurado con `www.fherneysilva.com`, HTTPS forzado una vez GitHub terminó de emitir el certificado.
4. **`index.html`** — `canonical`, `og:url`, `og:title`, `og:description` y `twitter:card` ya apuntan a `https://www.fherneysilva.com/`.

`fherneysilva.github.io` sigue existiendo como URL alternativa del mismo despliegue.

## Compatibilidad con hosting en subcarpeta (fallback de github.io)

El repo hoy se llama `fherneysilva.github.io` (convención especial de GitHub que sirve el sitio en la raíz de `usuario.github.io`). Si en algún momento se renombra a otra cosa (ej. `fherneysilva`, para que GitHub muestre su `README.md` en el perfil — ver [`content-guide.md`](content-guide.md) si aplica), la URL *default* de Pages para ese repo pasa a ser `usuario.github.io/nombre-repo/` (con subcarpeta) en vez de la raíz. El dominio propio (`www.fherneysilva.com`) sigue funcionando igual en cualquiera de los dos casos — esta sección es sobre esa URL alternativa de respaldo.

Para que el sitio cargue correctamente **tanto en la raíz (dominio propio) como en una subcarpeta (fallback de github.io)**, sin tener que elegir una u otra:

- **`vite.config.js`** usa `base: './'` (rutas relativas) en vez de `base: '/'` — así los archivos JS/CSS generados se piden relativos a donde esté `index.html`, no desde la raíz del dominio.
- **`index.html`** — el favicon usa el placeholder `%BASE_URL%favicon.svg` (Vite lo reemplaza en build time por la ruta relativa correcta). Los metadatos de SEO (`canonical`, `og:*`, `twitter:*`, JSON-LD) **sí** quedan siempre apuntando a la URL absoluta del dominio propio a propósito — no deben cambiar según dónde se sirva el sitio, ya que representan la URL canónica real para buscadores/redes sociales.
- **Imágenes referenciadas desde componentes** (`About.jsx`, `Siscodex.jsx`, el fallback de `AsciiPortrait.jsx`) usan `` `${import.meta.env.BASE_URL}assets/archivo.ext` `` en vez de una ruta absoluta hardcodeada (`/assets/archivo.ext`) — los assets en `public/` no pasan por el empaquetador de Vite, así que sus rutas no se reescriben automáticamente y hay que prefijarlas a mano con `BASE_URL`.
- **Links de navegación** (`NavBar.jsx`, `SidebarNav.jsx`) usan anclas relativas (`href="#about"`) en vez de absolutas (`href="/#about"`), para que la navegación se quede dentro de la subcarpeta si el sitio se está sirviendo desde ahí.
- **`App.jsx`** — la única ruta de React Router usa `path="*"` (en vez de `path="/"`), porque bajo una subcarpeta el `pathname` real es `/nombre-repo/`, no `/`, y no habría necesidad de que coincida exactamente ya que el sitio no tiene rutas alternativas que distinguir.

Si se agrega contenido nuevo que referencie un archivo de `public/` (imagen, PDF, etc.) directamente en un componente `.jsx`, hay que usar el mismo patrón de `import.meta.env.BASE_URL` para no reintroducir una ruta absoluta rota.
