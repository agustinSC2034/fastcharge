# Validación de la primera versión

Fecha: 15/11/2026.

- Astro check: sin errores, advertencias ni sugerencias.
- Build estático probado tanto en raíz como con BASE_PATH=/fastcharge.
- Verificación automática de assets locales, secciones requeridas y exclusión de marcas/archivos comerciales del build público.
- npm audit: cero vulnerabilidades después de actualizar Astro y sus integraciones.
- Revisión visual en navegador integrado: escritorio 1920x1080, notebook 1366x900 y móviles 360x800, 390x844 y 430x932. Sin desbordes horizontales en las medidas revisadas.
- Hero con imagen fallback y video: reproducción, botón pausa, carga de archivo. Respeto de reduced-motion/saveData implementado; no se afirma prueba en dispositivos físicos.
- Selector: las seis potencias, selección visual, contenido y teclado ArrowLeft verificados.
- Mapa: teselas visibles, controles y filtro Gastronomía verificados. Sin estaciones ficticias operativas.
- App: reserva demo, duración 30 minutos, sesión con 18,4 kWh, regreso al mapa. Confirmación explícita de que no se creó una reserva real.
- Contacto: campos completos con datos de prueba; descarga real de consulta-fastcharge.txt, texto leído y sin envío a servidor.
- Variante comercial local: ambos logos cargan y la página tiene noindex,nofollow. Marcas ausentes de HTML público y archivos comerciales excluidos del artefacto público.
- CSS: foco visible, movimiento reducido y tamaños móviles revisados. Esta revisión no constituye certificación WCAG ni reemplaza pruebas con lector de pantalla.

Rendimiento: JavaScript principal alrededor de 10 KB sin comprimir; mapa separado y cargado por proximidad; CSS principal alrededor de 30 KB; fuentes locales e imágenes WebP. Video con H.264/faststart y carga posterior al contenido. No se reportan puntajes Lighthouse ni métricas Core Web Vitals de campo no medidos.

La generación final del video y la verificación pública se registran en el historial de GitHub Actions y en la entrega del proyecto.
