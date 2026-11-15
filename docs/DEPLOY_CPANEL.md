# Despliegue en Nuthost / cPanel

No se configuró ni modificó el dominio definitivo.

1. En una consola PowerShell en la raíz del proyecto, configurar el dominio real:

```powershell
$env:SITE_URL='https://DOMINIO-REAL'
$env:BASE_PATH='/'
$env:PUBLIC_COMMERCIAL_PREVIEW='false'
npm ci
npm run build
```

2. Revisar `dist/index.html`, `dist/robots.txt` y sitemap. Sustituir DOMINIO-REAL antes de generar, nunca publicar ese valor de ejemplo.
3. Respaldar la carpeta destino y su `.htaccess` existente. Subir **el contenido de `dist/`**, no la carpeta contenedora, al document root del dominio en cPanel. No subir `src/`, `private/`, documentos, dependencias ni archivos .env.
4. No requiere servidor Node, base de datos ni rewrite de SPA. Conservar el `.htaccess` existente. Si ya hay un sitio en el destino, revisar el reemplazo y sus reglas antes de modificarlo.
5. Verificar HTTPS, hero/video, fuentes, las seis potencias, mapa, demo y formulario. Comprobar robots, sitemap y canonical con el dominio final. Eliminar caché del hosting cuando corresponda.

Si se publica bajo una subcarpeta, usarla como BASE_PATH. Para volver a GitHub Pages: SITE_URL=https://agustinsc2034.github.io y BASE_PATH=/fastcharge. GitHub Actions establece estos valores automáticamente, independientemente del entorno local.

No se necesita cambiar DNS en esta etapa. La integración real de contacto requiere un receptor antes de activar PUBLIC_CONTACT_ENDPOINT.
