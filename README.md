# FastCharge

Web institucional estática para una red de carga de vehículos eléctricos en Argentina, en desarrollo con inicio previsto durante 2027. Incluye home completa, catálogo interactivo, mapa, pantalla de la app y formulario de contacto.

## Ejecutar

Requisitos: Node.js 22.12+ (recomendado 24), npm.

```sh
npm ci
npm run dev
```

Abrir http://127.0.0.1:4321. Producción: `npm run build` genera `dist/`; `npm run preview` sirve el resultado. Astro + TypeScript + CSS propio; no requiere Node ni SSR en el hosting. Tipografía Manrope autoalojada. Interacciones nativas, Leaflet cargado al acercarse al mapa.

## Contenido editable

| Archivo                       | Contenido                                                            |
| ----------------------------- | -------------------------------------------------------------------- |
| `src/config/site.ts`          | Marca, dirección corporativa, navegación y publicación               |
| `src/data/chargers.ts`        | Potencias, familia, imagen y descripción                             |
| `src/data/locations.ts`       | Estaciones verificadas y categorías |
| `src/data/partners.ts`        | Marcas de la previsualización comercial                              |
| `src/components/`             | Secciones separadas y componentes visuales                           |
| `src/scripts/interactions.ts` | Catálogo, navegación, mapa y contacto                          |
| `src/styles/global.css`       | Tokens, layouts, responsive y movimiento reducido                    |
| `public/brand/`               | Favicon y versiones reemplazables del logo provisional               |
| `public/media/`               | Fotografías, referencias de producto y video optimizados             |

## Publicación automática

Repositorio: https://github.com/agustinSC2034/fastcharge

GitHub Pages: https://agustinsc2034.github.io/fastcharge/

Cada push a `main` ejecuta `.github/workflows/deploy.yml`: instala con lockfile, valida TypeScript, genera estáticos, comprueba separación comercial y publica. Configuración: `SITE_URL=https://agustinsc2034.github.io`, `BASE_PATH=/fastcharge`, `PUBLIC_COMMERCIAL_PREVIEW=false`.

Todos los assets pasan por el helper `asset()`. No usar rutas absolutas `/media/...` en los componentes. El sitemap, robots y canonical se generan según el sitio/base elegidos.

## Previsualización comercial local

```sh
npm run dev:commercial
```

Abrir http://127.0.0.1:4322. Añade únicamente los logos de Mostaza y AXION: por indicación del usuario, las fotografías no incluyen estas marcas. `private/mostaza.png` y `private/axion.webp` están excluidos de Git; existen en la copia principal local. No se suben los documentos fuente, precios, conceptos descartados ni assets privados. La sección se controla con `PUBLIC_COMMERCIAL_PREVIEW=true`, sin modificar componentes. Incluye noindex, pero esto NO sustituye una contraseña: no desplegar esa variante públicamente sin aprobación de contenido y marcas.

El comando de build público retira los dos logos temporales de `public/commercial/` antes de generar. Si necesitás volver a ver la variante comercial, reiniciá `npm run dev:commercial`.

## Contacto

El botón «Enviar mi consulta» se habilita al configurar un receptor.

Para habilitar recepción, definir `PUBLIC_CONTACT_ENDPOINT` antes de compilar. Contrato: POST JSON con `name`, `company`, `email`, `reason`, `message`, `website` (honeypot) y `elapsedMs`. El servidor debe responder JSON `{ "accepted": true }` SOLO después de aceptar la consulta. Incluye control de respuesta HTTP, timeout y bloqueo de doble envío. El receptor debe validar campos, limitar solicitudes, verificar origen y antispam en servidor; las medidas del navegador no reemplazan esa protección. No poner secretos en variables PUBLIC_.

## Límites de esta primera versión

- Red en desarrollo: no se anuncian estaciones operativas, contratos, direcciones de carga ni fechas de inauguración.
- La pantalla de carga en la web es estática. La aplicación requiere un proyecto independiente.
- Potencias nominales, sin promesas de tiempo de carga. Compatibilidad/configuración final y condiciones locales se validan para cada instalación.
- Mapa con teselas OpenStreetMap y atribución; requiere conectividad. Para tráfico de producción elevado, contratar un proveedor de mapas apropiado y actualizar la URL de teselas.
- El loop de video usa un plano continuo aéreo generado; tiene poster, pausa, mute, playsinline y carga condicionada a movimiento reducido/ahorro de datos. No se prometen métricas de campo antes de tener tráfico real.

Ver `docs/DEPLOY_CPANEL.md`, `docs/MEDIA.md`, `docs/DESIGN.md` y `docs/QA.md`.
