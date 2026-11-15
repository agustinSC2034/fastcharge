import { categories, stations, demoChargers } from '../data/locations';
const $ = <T extends HTMLElement>(s: string) => document.querySelector<T>(s)!;
const $$ = <T extends HTMLElement>(s: string) => [...document.querySelectorAll<T>(s)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const menu = $<HTMLButtonElement>('.menu-toggle');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  $('#navigation').classList.remove('open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  $('#navigation').classList.toggle('open', open);
});
$$<HTMLAnchorElement>('#navigation a').forEach((a) => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
window.addEventListener('scroll', () => $('#header').classList.toggle('scrolled', scrollY > 15), {
  passive: true,
});
if (!reduced.matches) {
  const reveals = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove('pending');
          e.target.classList.add('visible');
          reveals.unobserve(e.target);
        }
      }),
    { threshold: 0.08 },
  );
  $$('.reveal').forEach((el) => {
    el.classList.add('pending');
    reveals.observe(el);
  });
}
const video = $<HTMLVideoElement>('#hero-video');
const connection = (
  navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
).connection;
async function playVideo() {
  try {
    await video.play();
    video.classList.add('ready');
  } catch {
    video.classList.remove('ready');
  }
}
if (
  !reduced.matches &&
  !connection?.saveData &&
  !['slow-2g', '2g'].includes(connection?.effectiveType || '')
) {
  const start = () => {
    video.src = video.dataset.src!;
    video.muted = true;
    void playVideo();
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
  video.addEventListener('error', () => {
    video.classList.remove('ready');
  });
  new IntersectionObserver(
    (entries) => {
      if (!video.src) return;
      if (entries[0].isIntersecting && !reduced.matches) void playVideo();
      else video.pause();
    },
    { threshold: 0.1 },
  ).observe(video);
}
reduced.addEventListener('change', () => {
  if (reduced.matches) {
    video.pause();
    video.classList.remove('ready');
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) video.pause();
  else if (!reduced.matches && video.src && $('#inicio').getBoundingClientRect().bottom > 0)
    void playVideo();
});
const tabs = $$<HTMLButtonElement>('[data-charger]');
function selectCharger(index: number, focus = false) {
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
    $(`#charger-${i}`).hidden = i !== index;
  });
  if (focus) tabs[index].focus();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectCharger(i));
  t.addEventListener('keydown', (e) => {
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    selectCharger(next, true);
  });
});
let map: import('leaflet').Map | undefined,
  markers: import('leaflet').LayerGroup | undefined,
  leaflet: typeof import('leaflet') | undefined;
let selectedCategory = 'all';
function filterStations() {
  if (!markers || !leaflet) return;
  markers.clearLayers();
  const list = stations.filter(
    (s) => selectedCategory === 'all' || s.category === selectedCategory,
  );
  for (const s of list) {
    const text = document.createElement('span');
    text.textContent = `${s.name} · ${s.power} kW · ${s.status === 'operational' ? 'Operativa' : 'Planificada'}`;
    leaflet
      .circleMarker([s.lat, s.lng], {
        radius: 8,
        color: '#c1ec76',
        fillColor: '#c1ec76',
        fillOpacity: 0.8,
      })
      .bindPopup(text)
      .addTo(markers);
  }
  $('#network-status').textContent = list.length
    ? `${list.length} ubicaciones confirmadas`
    : 'Ubicaciones por confirmar · Sin estaciones operativas publicadas';
}
$$<HTMLButtonElement>('[data-category]').forEach((button) =>
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category!;
    $$('[data-category]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    $('#network-description').textContent = categories.find((c) => c.id === selectedCategory)!.copy;
    filterStations();
  }),
);
const mapObserver = new IntersectionObserver(
  async (entries) => {
    if (!entries[0].isIntersecting) return;
    mapObserver.disconnect();
    try {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');
      leaflet = L;
      $('#network-map').replaceChildren();
      map = L.map('network-map', {
        scrollWheelZoom: false,
        zoomControl: true,
        minZoom: 3,
        maxZoom: 14,
      }).setView([-38.8, -64.5], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      markers = L.layerGroup().addTo(map);
      filterStations();
    } catch {
      $('#network-map').textContent =
        'Mapa no disponible sin conexión. La red está en desarrollo; todavía no hay ubicaciones confirmadas.';
    }
  },
  { rootMargin: '250px' },
);
mapObserver.observe($('#network-map'));
type DemoState = 'map' | 'reserve' | 'session' | 'history';
function showDemo(state: DemoState) {
  (['map', 'reserve', 'session', 'history'] as DemoState[]).forEach(
    (s) => ($(`#demo-${s}-state`).hidden = s !== state),
  );
  const focusTarget = $<HTMLElement>(`#demo-${state}-state h3`);
  focusTarget.tabIndex = -1;
  focusTarget.focus({ preventScroll: true });
}
$$<HTMLButtonElement>('[data-demo-charger]').forEach((b, i) =>
  b.addEventListener('click', () => {
    $$('[data-demo-charger]').forEach((el) => {
      el.classList.toggle('selected', el === b);
      el.setAttribute('aria-pressed', String(el === b));
    });
    $<HTMLButtonElement>('#demo-reserve').disabled = !demoChargers[i].available;
    $('#demo-selection-status').textContent =
      i === 0 ? 'Disponibilidad simulada' : 'Ocupado en esta demo. Elegí el cargador 01.';
  }),
);
$('#demo-reserve').addEventListener('click', () => showDemo('reserve'));
$('#demo-duration').addEventListener('change', () => {
  $('#duration-summary').textContent = $<HTMLSelectElement>('#demo-duration').value + ' minutos';
});
$('#demo-confirm').addEventListener('click', () => {
  $('#session-duration').textContent = $<HTMLSelectElement>('#demo-duration').value + ' min';
  showDemo('session');
});
$('#demo-history').addEventListener('click', () => showDemo('history'));
$('#nav-history').addEventListener('click', () => showDemo('history'));
$$('[data-demo-back]').forEach((b) => b.addEventListener('click', () => showDemo('map')));
const form = $<HTMLFormElement>('#contact-form');
let submitting = false;
const loadedAt = Date.now();
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (submitting || !form.reportValidity()) return;
  const data = new FormData(form);
  const status = $('#form-status');
  if (data.get('website')) {
    status.textContent = 'No se pudo preparar la consulta.';
    return;
  }
  if (Date.now() - loadedAt < 2500) {
    status.textContent = 'Revisá tus datos e intentá nuevamente.';
    return;
  }
  const payload = {
    name: String(data.get('name')).trim(),
    company: String(data.get('company')).trim(),
    email: String(data.get('email')).trim(),
    reason: String(data.get('reason')),
    message: String(data.get('message')).trim(),
  };
  if (!payload.name || payload.message.length < 10) {
    status.textContent = 'Completá tu nombre y un mensaje de al menos 10 caracteres.';
    return;
  }
  const endpoint = form.dataset.endpoint;
  if (!endpoint) return;
  submitting = true;
  const submit = $<HTMLButtonElement>('#contact-form button[type=submit]');
  submit.disabled = true;
  status.textContent = 'Enviando consulta…';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, website: '', elapsedMs: Date.now() - loadedAt }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error('request failed');
    const receipt = await response.json();
    if (receipt.accepted !== true) throw new Error('missing receipt');
    status.textContent = 'Consulta recibida. Gracias por contactarte.';
    form.reset();
  } catch {
    status.textContent =
      'No pudimos confirmar la recepción. Tus datos siguen en el formulario; intentá nuevamente.';
  } finally {
    submitting = false;
    submit.disabled = false;
  }
});
