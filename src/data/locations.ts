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
    copy: 'Explorá los tipos de lugares donde planeamos instalar cargadores.',
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
