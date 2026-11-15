export interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  status: 'planned' | 'operational';
  power: number;
}
// Only verified, approved stations belong here. Corporate address is NOT a station.
export const stations: Station[] = [];
export const categories = [
  {
    id: 'all',
    label: 'Toda la red',
    copy: 'Estamos desarrollando una red para conectar tus recorridos. Las ubicaciones se publicarán a medida que sean confirmadas.',
  },
  {
    id: 'food',
    label: 'Gastronomía',
    copy: 'Una comida, un café, una pausa. Pensamos la carga como parte de las paradas que ya hacés.',
  },
  {
    id: 'road',
    label: 'Rutas y servicios',
    copy: 'Puntos de paso y corredores de circulación: energía para acompañar los viajes.',
  },
  {
    id: 'parking',
    label: 'Estacionamientos',
    copy: 'Sumar energía mientras hacés tus compras o continuás con tus actividades.',
  },
];
export const demoChargers = [
  {
    id: 'demo-01',
    name: 'Estación de demostración',
    power: 120,
    connector: 'CCS2',
    available: true,
  },
  {
    id: 'demo-02',
    name: 'Estación de demostración',
    power: 60,
    connector: 'CCS2',
    available: false,
  },
];
