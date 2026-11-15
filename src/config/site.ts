export const site = {
  name: 'FastCharge',
  description:
    'Una nueva red de carga rápida para vehículos eléctricos en Argentina. Alta potencia, ubicaciones estratégicas y una experiencia digital simple.',
  launchYear: 2027,
  corporateAddress:
    'Av. Alicia Moreau de Justo 1930, Piso 5, Ciudad Autónoma de Buenos Aires, Argentina.',
  commercialPreview: import.meta.env.PUBLIC_COMMERCIAL_PREVIEW === 'true',
  contactEndpoint: import.meta.env.PUBLIC_CONTACT_ENDPOINT || '',
};
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const navigation = [
  ['Inicio', 'inicio'],
  ['Quiénes somos', 'fastcharge'],
  ['Soluciones', 'soluciones'],
  ['App', 'app'],
  ['Ubicaciones', 'ubicaciones'],
  ['Contacto', 'contacto'],
];
