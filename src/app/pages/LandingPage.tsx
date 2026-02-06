import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Waves,
  MapPin,
  Users,
  Award,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  Ruler,
  TrendingUp
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { swimEvents } from '../data/events';
import { toast } from 'sonner';

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1650166551215-0796207fae73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjBvZiUyMGNvcnRleiUyMGJhamElMjBjYWxpZm9ybmlhfGVufDF8fHx8MTc3MDM0NDMyNXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Blu serial aguas abiertas"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/40 to-blue-900/60" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Waves className="size-20 text-white mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl text-white mb-6">
            Blu serial aguas abiertas
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Diseñado para desafiar a
            atletas de todos los niveles; disfruta la belleza natural y la
            diversidad marina del Golfo de California.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() => document.getElementById('swims')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver eventos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-blue-900"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contactanos
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">About Our Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organizamos eventos de natación en aguas abiertas en las impresionantes aguas de Baja California Sur, México
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center size-16 bg-blue-100 rounded-full mb-6">
                <MapPin className="size-8 text-blue-600" />
              </div>
              <h3 className="text-2xl mb-4">Ubicaciones espectaculares</h3>
              <p className="text-gray-600">
                Nadar en aguas cristalinas con vistas impresionantes de la costa de Baja California Sur, desde bahías tranquilas hasta olas desafiantes del Pacífico.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center size-16 bg-blue-100 rounded-full mb-6">
                <Users className="size-8 text-blue-600" />
              </div>
              <h3 className="text-2xl mb-4">Todos los niveles</h3>
              <p className="text-gray-600">
                Ya seas principiante o nadador experimentado, tenemos eventos diseñados para cada nivel de habilidad.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center size-16 bg-blue-100 rounded-full mb-6">
                <Award className="size-8 text-blue-600" />
              </div>
              <h3 className="text-2xl mb-4">Organización profesional</h3>
              <p className="text-gray-600">
                La seguridad es lo primero con personal experimentado, embarcaciones de apoyo y planificación integral para cada evento.
              </p>
            </Card>
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl mb-4">¿Por qué Baja California Sur?</h3>
                <p className="text-gray-700 mb-4">
                  Baja California Sur ofrece algunas de las condiciones más hermosas y diversas del mundo para practicar natación en aguas abiertas. Con aguas cristalinas, abundante vida marina y temperaturas cálidas durante todo el año, es el destino perfecto para los amantes de las aguas abiertas.
                </p>
                <p className="text-gray-700">
                  Nuestros eventos aprovechan bahías protegidas, sitios declarados Patrimonio de la Humanidad por la UNESCO y costas espectaculares del Pacífico para brindar experiencias de natación únicas y memorables.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">300+</div>
                  <div className="text-gray-600">Días de sol</div>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24°C</div>
                  <div className="text-gray-600">Temperatura promedio del agua</div>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                  <div className="text-gray-600">Nadadores anualmente</div>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                  <div className="text-gray-600">Eventos por año</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Swims Section */}
      <section id="swims" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">Próximos eventos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige entre nuestra selección de eventos de natación en aguas abiertas durante todo el año
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {swimEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.heroImage}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full font-medium">
                    {event.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.shortDescription}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-blue-600 shrink-0" />
                      <span className="text-gray-600 truncate">{event.date.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="size-4 text-blue-600 shrink-0" />
                      <span className="text-gray-600">{event.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-4 text-blue-600 shrink-0" />
                      <span className="text-gray-600 truncate">{event.difficulty}</span>
                    </div>
                  </div>

                  <Link to={`/event/${event.id}`}>
                    <Button className="w-full group">
                      Ver detalles
                      <ChevronRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">Nuestros socios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trabajamos con organizaciones líderes para ofrecer eventos excepcionales
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'BCS Tourism Board',
              'La Paz Municipality',
              'Cabo Pulmo National Park',
              'Pacific Open Water',
              'Sea of Cortez Foundation',
              'BCS Lifeguard Association',
              'Marina La Paz',
              'Baja Adventure Company'
            ].map((partner, index) => (
              <Card key={index} className="p-8 flex items-center justify-center hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <Heart className="size-12 text-blue-600 mx-auto mb-3" />
                  <p className="font-medium text-gray-700">{partner}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">Nuestros patrocinadores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gracias a nuestros patrocinadores que hacen posible estos eventos
            </p>
          </div>

          <div className="space-y-12">
            {/* Title Sponsors */}
            <div>
              <h3 className="text-2xl text-center mb-8 text-gray-700">Patrocinadores principales</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  'AquaSport Equipment',
                  'Ocean Safety Systems',
                  'Baja Wellness Resort'
                ].map((sponsor, index) => (
                  <Card key={index} className="p-12 flex items-center justify-center hover:shadow-xl transition-shadow">
                    <div className="text-center">
                      <Waves className="size-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-xl font-medium text-gray-800">{sponsor}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Supporting Sponsors */}
            <div>
              <h3 className="text-xl text-center mb-8 text-gray-600">Patrocinadores</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  'SwimTech',
                  'Hydration Plus',
                  'Sports Nutrition Co',
                  'Fitness Tracker Pro',
                  'Beach Hotels BCS',
                ].map((sponsor, index) => (
                  <Card key={index} className="p-6 flex items-center justify-center hover:shadow-lg transition-shadow">
                    <p className="font-medium text-gray-600 text-center text-sm">{sponsor}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="text-center pt-8">
              <Button variant="outline" size="lg">
                Conviértete en patrocinador
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">Ponte en contacto</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ¿Tienes preguntas? ¿Quieres registrarte? Nos encantaría saber de ti
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <h3 className="text-2xl mb-6">Envíanos un mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+52 612 123 4567"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntanos sobre tu experiencia en natación y qué evento te interesa..."
                    rows={5}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Enviar mensaje
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="p-8">
                <h3 className="text-2xl mb-6">Información de contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="size-6 text-blue-600 mt-1 shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Email</div>
                      <a href="mailto:info@bcsopenwater.com" className="text-blue-600 hover:underline">
                        info@bcsopenwater.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="size-6 text-blue-600 mt-1 shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Teléfono</div>
                      <a href="tel:+526121234567" className="text-blue-600 hover:underline">
                        +52 612 123 4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="size-6 text-blue-600 mt-1 shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Ubicación</div>
                      <p className="text-gray-600">
                        La Paz, Baja California Sur<br />
                        México, C.P. 23000
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50">
                <h3 className="text-xl mb-4">Horario de oficina</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                  <p>Sábado: 10:00 AM - 2:00 PM</p>
                  <p>Domingo: Cerrado</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Waves className="size-8" />
                <span className="font-bold text-xl">Blu serial aguas abiertas</span>
              </div>
              <p className="text-gray-400">
                Uniendo a la comunidad de natación en aguas abiertas en la hermosa Baja California Sur.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">Sobre nosotros</a></li>
                <li><a href="#swims" className="hover:text-white transition-colors">Eventos</a></li>
                <li><a href="#partners" className="hover:text-white transition-colors">Patrocinadores</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Guías de seguridad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consejos de entrenamiento</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Síguenos</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  <Facebook className="size-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                  <Instagram className="size-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                  <Twitter className="size-6" />
                </a>
                <a href="mailto:info@bcsopenwater.com" className="hover:text-gray-300 transition-colors">
                  <Mail className="size-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Blu serial aguas abiertas. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
