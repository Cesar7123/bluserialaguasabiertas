export interface SwimRouteData {
  label: string;
  color: string;
  path: [number, number, boolean][]; // [lat, lng, isBuoy]
  isLoop: boolean;
}

export interface SwimEvent {
  id: string;
  title: string;
  shortDescription: string;
  date: string;
  distance: string;
  difficulty: string;
  location: string;
  description: string;
  heroImage: string;
  mapDescription: string;
  registrationLink: string;
  price: string;
  routes: SwimRouteData[];
}

function buildRoute(
  label: string,
  color: string,
  path: [number, number, boolean][],
  isLoop: boolean
): SwimRouteData {
  return { label, color, path, isLoop };
}

/* ── Helper to generate legacy out-and-back paths ── */
function generatePath(
  startLat: number,
  startLng: number,
  deltaLat: number,
  deltaLng: number,
  buoyCount: number
): [number, number, boolean][] {
  const path: [number, number, boolean][] = [[startLat, startLng, false]];

  for (let i = 1; i <= buoyCount; i++) {
    const t = i / (buoyCount + 1);
    path.push([startLat + deltaLat * t, startLng + deltaLng * t, true]);
  }

  path.push([startLat + deltaLat, startLng + deltaLng, true]);

  for (let i = buoyCount; i >= 1; i--) {
    const t = i / (buoyCount + 1);
    path.push([startLat + deltaLat * t, startLng + deltaLng * t, true]);
  }

  path.push([startLat, startLng, false]);

  return path;
}

export const swimEvents: SwimEvent[] = [
  {
    id: 'el-coromuel',
    title: 'El Coromuel',
    shortDescription: 'Primera etapa del serial en la icónica Playa El Coromuel',
    date: 'Domingo 24 de mayo de 2026',
    distance: '500 m · 750 m · 1.5 km · 3 km',
    difficulty: 'Intermedio',
    location: 'Playa El Coromuel, La Paz, BCS',
    description:
      'Da inicio al BLU Serial Aguas Abiertas 2026 en la emblemática Playa El Coromuel. La distancia de 500 metros está abierta a infantiles y principiantes; no suma puntos para el serial. Las distancias de 750 m, 1.5 km y 3 km suman puntos para el marcador overall. Hora de inicio: 7:00 a.m. Cupo limitado a 150 nadadores.',
    heroImage: '/coromuel.jpeg',
    mapDescription:
      'Salida desde Playa El Coromuel. El recorrido sigue la curva natural de la bahía de La Paz. Embarcaciones de seguridad posicionadas cada 500 metros.',
    registrationLink: 'https://www.huamdeportiva.com/blu-serial-aguas-abiertas',
    price: '$850 MXN',
    routes: [
      buildRoute('500 m', '#2563EB',
        [
          [24.195952, -110.300880, false],
          [24.196327, -110.301477, false],
          [24.197356, -110.301136, false],
          [24.198276, -110.301254, true],
          [24.198276, -110.301254, false],
        ],
        true),
      buildRoute('750 m', '#3B82F6',
        [
          [24.195952, -110.300880, false],
          [24.196327, -110.301477, false],
          [24.197356, -110.301136, false],
          [24.198276, -110.301254, true],
          [24.198966, -110.301160, true],
        ],
        true),
      buildRoute('1500 m', '#143b8e',
        [
          [24.195952, -110.300880, false],
          [24.196327, -110.301477, false],
          [24.197356, -110.301136, false],
          [24.198276, -110.301254, true],
          [24.198966, -110.301160, true],
          [24.202568, -110.301453, true],
        ],
        true),
      buildRoute('3000 m', '#0ea5e9',
        [
          [24.195952, -110.300880, false],
          [24.196327, -110.301477, false],
          [24.197356, -110.301136, false],
          [24.198276, -110.301254, true],
          [24.198966, -110.301160, true],
          [24.202568, -110.301453, true],
          [24.206077, -110.301061, false],
          [24.209231, -110.301337, true],
        ],
        true),
    ],
  },
  {
    id: 'el-caimancito',
    title: 'El Caimancito',
    shortDescription: 'Segunda etapa en la tranquila Playa El Caimancito',
    date: 'Domingo 05 de julio de 2026',
    distance: '500 m · 750 m · 1.5 km · 3 km',
    difficulty: 'Intermedio',
    location: 'Playa El Caimancito, La Paz, BCS',
    description:
      'La segunda etapa del serial te espera en Playa El Caimancito, conocida por sus aguas tranquilas y su ambiente familiar. Un escenario perfecto para continuar sumando puntos en el serial. Hora de inicio: 7:00 a.m. Cupo limitado a 150 nadadores.',
    heroImage: '/caimancito.jpeg',
    mapDescription:
      'Salida desde Playa El Caimancito. Recorrido paralelo a la costa con aguas generalmente tranquilas. Seguridad acuática proporcionada por Natación Flippers.',
    registrationLink: 'https://www.huamdeportiva.com/blu-serial-aguas-abiertas',
    price: '$850 MXN',
    routes: [
      buildRoute('500 m', '#2563EB',
        [
          [24.205722, -110.300281, false],
          [24.205906, -110.300989, false],
          [24.207838, -110.301096, true],
        ],
        true),
      buildRoute('750 m', '#3B82F6',
        [
          [24.205722, -110.300281, false],
          [24.205906, -110.300989, false],
          [24.207838, -110.301096, false],
          [24.208462, -110.301186, true],
        ],
        true),
      buildRoute('1500 m', '#143b8e',
        [
          [24.205722, -110.300281, false],
          [24.205906, -110.300989, false],
          [24.207838, -110.301096, false],
          [24.208462, -110.301186, true],
          [24.212075, -110.301351, true],
        ],
        true),
      buildRoute('3000 m', '#0ea5e9',
        [
          [24.205722, -110.300281, false],
          [24.205906, -110.300989, false],
          [24.207838, -110.301096, false],
          [24.208462, -110.301186, false],
          [24.212075, -110.301351, false],
          [24.214402, -110.301408, false],
          [24.216272, -110.305416, true],
        ],
        true),
    ],
  },
  {
    id: 'el-tecolote',
    title: 'El Tecolote',
    shortDescription: 'Tercera etapa en la espectacular Playa El Tecolote',
    date: 'Domingo 09 de agosto de 2026',
    distance: '500 m · 750 m · 1.5 km · 3 km',
    difficulty: 'Intermedio',
    location: 'Playa El Tecolote, La Paz, BCS',
    description:
      'La tercera etapa nos lleva a Playa El Tecolote, famosa por sus aguas cristalinas de tonos turquesa y su impresionante vista hacia la Isla Espíritu Santo. Hora de inicio: 7:00 a.m. Cupo limitado a 150 nadadores.',
    heroImage:
      '/tecolote.jpeg',
    mapDescription:
      'Salida desde Playa El Tecolote con vistas panorámicas a la Isla Espíritu Santo. Recorrido costero con aguas cristalinas de alta visibilidad.',
    registrationLink: 'https://www.huamdeportiva.com/blu-serial-aguas-abiertas',
    price: '$850 MXN',
    routes: [
      buildRoute('500 m', '#2563EB',
        [
          [24.336348, -110.322735, false],
          [24.336269, -110.325064, true],
        ],
        true),
      buildRoute('750 m', '#3B82F6',
        [
          [24.336348, -110.322735, false],
          [24.336269, -110.325064, false],
          [24.335527, -110.326306, true],
        ],
        true),
      buildRoute('1500 m', '#143b8e',
        [
          [24.336348, -110.322735, false],
          [24.336269, -110.325064, false],
          [24.335527, -110.326306, false],
          [24.334762, -110.327681, false],
          [24.333095, -110.329158, true],
        ],
        true),
      buildRoute('3000 m', '#0ea5e9',
        [
          [24.336348, -110.322735, false],
          [24.336269, -110.325064, false],
          [24.335527, -110.326306, false],
          [24.334762, -110.327681, false],
          [24.333095, -110.329158, false],
          [24.328800, -110.334544, true],
        ],
        true),
    ],
  },
  {
    id: 'playa-pichilingue',
    title: 'Playa Pichilingue',
    shortDescription: 'Gran final del serial con la distancia especial de 6 km',
    date: 'Domingo 22 de noviembre de 2026',
    distance: '500 m · 750 m · 1.5 km · 3 km · 6 km',
    difficulty: 'Intermedio',
    location: 'Playa Pichilingue, La Paz, BCS',
    description:
      'La gran final del BLU Serial Aguas Abiertas 2026 se celebra en Playa Pichilingue. Esta etapa especial incluye la distancia de 6 km, el mayor desafío del serial. Hora de inicio: 7:00 a.m. Cupo limitado a 150 nadadores.',
    heroImage:
      '/pichilingue.jpeg',
    mapDescription:
      'Salida desde Playa Pichilingue. Recorrido costero con opción de 6 km — la distancia más larga del serial. Embarcaciones de apoyo y kayaks de seguridad.',
    registrationLink: 'https://www.huamdeportiva.com/blu-serial-aguas-abiertas',
    price: '$850 MXN',
    routes: [
      buildRoute('500 m', '#2563EB',
        [
          [24.283163, -110.328407, false],
          [24.283734, -110.329982, true],
        ],
        true),
      buildRoute('750 m', '#3B82F6',
        [
          [24.283163, -110.328407, false],
          [24.283734, -110.329982, false],
          [24.284869, -110.330561, true],
        ],
        true),
      buildRoute('1500 m', '#143b8e',
        [
          [24.283163, -110.328407, false],
          [24.283734, -110.329982, false],
          [24.284869, -110.330561, true],
          [24.283384, -110.334714, true],
        ],
        true),
      buildRoute('3000 m', '#0ea5e9',
        [
          [24.283163, -110.328407, false],
          [24.283734, -110.329982, false],
          [24.284869, -110.330561, false],
          [24.283384, -110.334714, false],
          [24.284826, -110.335717, false],
          [24.285850, -110.333421, false],
          [24.287096, -110.332949, false],
          [24.288332, -110.331656, true],
        ],
        true),
      buildRoute('6000 m', '#0ea8e9',
        [
          [24.283163, -110.328407, false],
          [24.283734, -110.329982, false],
          [24.284869, -110.330561, false],
          [24.283384, -110.334714, false],
          [24.284826, -110.335717, false],
          [24.285850, -110.333421, false],
          [24.287096, -110.332949, false],
          [24.288332, -110.331656, false],
          [24.290553, -110.333736, false],
          [24.293356, -110.337118, false],
          [24.295185, -110.338082, false],
          [24.299509, -110.338291, true],
        ],
        true),
    ],
  },
];
