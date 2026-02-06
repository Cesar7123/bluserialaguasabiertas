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
}

export const swimEvents: SwimEvent[] = [
  {
    id: "el-coromuel",
    title: "El Coromuel",
    shortDescription: "A scenic 5km swim through the crystal-clear waters of La Paz Bay",
    date: "24 de mayo del 2026",
    distance: "500 mts, 750 mts, 1.5 km, 3 km",
    difficulty: "Intermedio",
    location: "La Paz, BCS",
    description: "Experience the breathtaking beauty of La Paz Bay with this challenging 5km open water swim. Navigate through calm turquoise waters while enjoying views of the Malecón and surrounding mountains. This swim is perfect for intermediate swimmers looking to test their endurance in one of Mexico's most beautiful coastal settings. The course follows the bay's natural curve, offering protection from strong currents while providing an authentic open water experience.",
    heroImage: "https://images.unsplash.com/photo-1619707284867-922f30e176e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd2F0ZXIlMjBzd2ltbWluZyUyMG9jZWFufGVufDF8fHx8MTc3MDM0NDMyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    mapDescription: "The swim starts at Playa Coromuel, follows the coastline north for 2.5km, then returns along the same route. Water depth ranges from 3-15 meters with excellent visibility. Safety boats will be positioned every 500 meters.",
    registrationLink: "#register",
    price: "$850 MXN"
  },
  {
    id: "el-caimancito",
    title: "El Caimancito",
    shortDescription: "Swim through a UNESCO World Heritage marine park",
    date: "April 22, 2026",
    distance: "500 mts, 750 mts, 1.5 km, 3 km",
    difficulty: "Intermedio",
    location: "Cabo Pulmo, BCS",
    description: "Dive into the wonder of Cabo Pulmo National Marine Park, home to one of the oldest coral reefs in North America. This 3km swim offers participants a unique opportunity to swim through protected waters teeming with marine life. Swimmers may encounter schools of tropical fish, sea turtles, and rays in this ecological paradise. The relatively short distance makes it accessible to less experienced open water swimmers while still providing an unforgettable adventure.",
    heroImage: "https://images.unsplash.com/photo-1619707284867-922f30e176e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd2F0ZXIlMjBzd2ltbWluZyUyMG9jZWFufGVufDF8fHx8MTc3MDM0NDMyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    mapDescription: "Starting from the main beach, the route follows the outer reef edge southward for 1.5km before turning back. Average depth is 5-10 meters. The swim takes place during calm morning hours for optimal visibility and safety.",
    registrationLink: "#register",
    price: "$950 MXN"
  },
  {
    id: "el-tecolote",
    title: "El Tecolote",
    shortDescription: "An extreme 10km ocean swim for experienced athletes",
    date: "May 10, 2026",
    distance: "500 mts, 750 mts, 1.5 km, 3 km",
    difficulty: "Intermedio",
    location: "Todos Santos, BCS",
    description: "The ultimate test for experienced open water swimmers. This challenging 10km swim takes place in the Pacific waters off Todos Santos, known for its powerful waves and strong currents. Only swimmers with proven open water experience and excellent physical conditioning should attempt this event. The course offers stunning views of the rugged coastline and provides an adrenaline-pumping experience that will test both mental and physical endurance. Support kayaks and safety boats accompany all swimmers throughout the journey.",
    heroImage: "https://images.unsplash.com/photo-1619707284867-922f30e176e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd2F0ZXIlMjBzd2ltbWluZyUyMG9jZWFufGVufDF8fHx8MTc3MDM0NDMyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    mapDescription: "The course begins at Playa Las Palmas and follows the coastline south for 5km before turning around at Punta Lobos. Swimmers face Pacific swells and must navigate around rocky outcrops. Water temperature averages 20-22°C. Mandatory safety briefing required.",
    registrationLink: "#register",
    price: "$1,200 MXN"
  },
  {
    id: "playa-pichilingue",
    title: "Playa Pichilingue",
    shortDescription: "Monthly 2km evening swims perfect for all levels",
    date: "Every last Friday of the month",
    distance: "500 mts, 750 mts, 1.5 km, 3 km, 6 km",
    difficulty: "Intermedio",
    location: "Various locations in BCS",
    description: "Join our popular monthly Sunset Swim Series, a social and relaxed 2km swim held at different beaches across Baja California Sur. These evening swims are designed to bring the swimming community together in a non-competitive environment. Perfect for beginners wanting to gain open water experience or advanced swimmers looking for a casual training session. Each event ends with a beach gathering where participants can share stories, enjoy refreshments, and watch the spectacular Baja sunset.",
    heroImage: "https://images.unsplash.com/photo-1619707284867-922f30e176e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd2F0ZXIlMjBzd2ltbWluZyUyMG9jZWFufGVufDF8fHx8MTc3MDM0NDMyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    mapDescription: "Routes vary by location but all follow a simple out-and-back format of 1km each way. Courses are chosen for calm conditions and beautiful sunset views. Check monthly announcements for specific locations and course details.",
    registrationLink: "#register",
    price: "$350 MXN per event"
  }
];
