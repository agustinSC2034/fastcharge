export const exampleEnergyKwh = 20;

export function estimatedChargeTime(powerKw: number): string {
  const totalMinutes = Math.round((exampleEnergyKwh / powerKw) * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours ? (minutes ? hours + ' h ' + minutes + ' min' : hours + ' h') : minutes + ' min';
}

export const chargers = [
  {
    power: 7.6,
    type: 'AC',
    name: 'J100',
    image: 'j100.webp',
    use: 'Residencias y destinos',
  },
  {
    power: 11.5,
    type: 'AC',
    name: 'J200',
    image: 'j200.webp',
    use: 'Comercios y flotas',
  },
  {
    power: 40,
    type: 'DC',
    name: 'J-DC Wallbox',
    image: 'wallbox.webp',
    use: 'Paradas urbanas',
  },
  {
    power: 60,
    type: 'DC',
    name: 'J-DC',
    image: 'jdc.webp',
    use: 'Ciudad y puntos de paso',
  },
  {
    power: 120,
    type: 'DC',
    name: 'J-DC',
    image: 'jdc.webp',
    use: 'Corredores y servicios',
  },
  {
    power: 240,
    type: 'DC',
    name: 'J-DC',
    image: 'jdc.webp',
    use: 'Rutas y alta demanda',
  },
];
