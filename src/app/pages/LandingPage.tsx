import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
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
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      <section
        id="home"
        ref={heroRef}
        className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        <motion.video
          src="/hero.MP4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-x-0 top-[-15%] h-[125%] w-full object-cover sm:top-0 sm:h-full"
          style={{ y: heroY }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/40 to-blue-900/60" />

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto -mt-40 md:-mt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ opacity: heroOpacity }}
        >
          {/* <motion.img
            src="/shark.svg"
            alt="Blu"
            className="size-24 md:size-32 mx-auto mb-6 animate-float"
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          /> */}
          <motion.h1
            className="text-5xl md:text-7xl text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Blu serial aguas abiertas
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Diseñado para desafiar a
            atletas de todos los niveles disfruta la belleza natural y la
            diversidad marina del Golfo de California.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
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
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">Sobre el Serial</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              El serial de natación en aguas abiertas más prestigioso del noroeste de México
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="size-8 text-blue-600" />,
                title: '4 sedes icónicas',
                desc: 'Coromuel, Caimancito, Tecolote y Pichilingue. Las playas más emblemáticas de la bahía de La Paz como escenario de competencia.',
              },
              {
                icon: <Users className="size-8 text-blue-600" />,
                title: 'Todos los niveles',
                desc: 'Distancias desde 500 m para infantiles y principiantes hasta 6 km para nadadores experimentados. Ramas femenil y varonil.',
              },
              {
                icon: <Award className="size-8 text-blue-600" />,
                title: 'Organización profesional',
                desc: 'Seguridad acuática con Natación Flippers, embarcaciones de apoyo, servicio de primeros auxilios y abastecimiento en meta.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card className="p-8 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="inline-flex items-center justify-center self-center size-16 bg-blue-100 rounded-full mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl mb-4">Misión, Visión y Objetivo</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Misión:</strong> Ser el serial de natación en aguas abiertas más prestigioso del noroeste de México, ofreciendo a los atletas inolvidables experiencias en el Golfo de California.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Visión:</strong> Convertirnos en un referente nacional e internacional de la natación en aguas abiertas, promoviendo la salud, el deporte y la conservación de los ecosistemas marinos en BCS.
                </p>
                <p className="text-gray-700">
                  <strong>Objetivo:</strong> Priorizamos tres ejes importantes para BCS: <strong>la salud, el deporte y la conservación de los ecosistemas marinos</strong>.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '4', label: 'Nados del serial' },
                  { num: '5', label: 'Distancias' },
                  { num: '150', label: 'Cupo por evento' },
                  { num: '7:00', label: 'Hora de inicio' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="bg-white rounded-lg p-6 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stat.num}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Swims Section */}
      <section id="swims" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">Próximos eventos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige entre nuestra selección de eventos de natación en aguas abiertas durante todo el año
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {swimEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">Inscripciones</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige la modalidad que mejor se adapte a ti y asegura tu lugar en el serial
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Nado individual',
                price: '$850 MXN',
                desc: 'Por nado. Válido hasta el miércoles previo a cada evento.',
                features: [
                  'Acceso a 1 nado',
                  'Gorro de natación oficial',
                  'Medalla de participación',
                  'Seguridad acuática',
                  'Abastecimiento en meta',
                ],
                border: 'border-blue-100',
                badge: null,
              },
              {
                title: 'Serial completo',
                price: '$3,000 MXN',
                desc: 'Precio temprano. Hasta el 20 de Mayo de 2026.',
                features: [
                  'Acceso a los 4 nados',
                  'Gorro de natación oficial (1)',
                  'Medalla de participación por nado',
                  'Trofeo al primer lugar',
                  'Puntuación para serial',
                ],
                border: 'border-blue-600',
                badge: 'RECOMENDADO',
              }
            ].map((plan, i) => (
              <motion.div
                key={plan.title + plan.price}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card className={`p-8 text-center hover:shadow-xl transition-shadow border-2 ${plan.border} relative h-full flex flex-col`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="text-2xl mb-2">{plan.title}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-4">{plan.price}</div>
                  <p className="text-gray-600 mb-6">{plan.desc}</p>
                  <ul className="text-left text-sm text-gray-600 space-y-2 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f}>✓ {f}</li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <a href="https://www.huamdeportiva.com/blu-serial-aguas-abiertas" target="_blank" rel="noopener noreferrer">
                      Inscribirme
                    </a>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 text-gray-600">
            <p>Precio tardío del serial completo: <strong>$3,000 MXN</strong> (del 1 de abril al 20 de mayo de 2026)</p>
            <p className="text-sm mt-2">⚠️ No habrá reembolso. Las inscripciones son intransferibles.</p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">Colaboradores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gracias a quienes hacen posible este serial
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'HUAM Deportiva', desc: 'Organización de eventos deportivos en BCS' },
              { name: 'Tania Robles Natación', desc: 'Rayas by Tania Robles' },
              { name: 'CEMDA', desc: 'Centro Mexicano de Derecho Ambiental, A.C.' },
              { name: 'Natación Flippers', desc: 'Salvamento acuático y guardavidas' },
            ].map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <Card className="p-8 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="text-center">
                    <Heart className="size-12 text-blue-600 mx-auto mb-3" />
                    <p className="font-bold text-gray-800 mb-1">{partner.name}</p>
                    <p className="text-sm text-gray-500">{partner.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">Patrocinadores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ¿Te interesa patrocinar el serial? Conecta tu marca con la comunidad de natación en aguas abiertas.
            </p>
          </motion.div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:bluaguasabiertas@gmail.com">
                Conviértete en patrocinador
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">Ponte en contacto</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ¿Tienes preguntas? ¿Quieres registrarte? Nos encantaría saber de ti
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full">
                <h3 className="text-2xl mb-6">Envíanos un mensaje</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nombre *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre completo"
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
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="612 203 1658"
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
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Card className="p-8">
                <h3 className="text-2xl mb-6">Información de contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="size-6 text-blue-600 mt-1 shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Email</div>
                      <a href="mailto:bluaguasabiertas@gmail.com" className="text-blue-600 hover:underline">
                        bluaguasabiertas@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="size-6 text-blue-600 mt-1 shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Teléfono</div>
                      <a href="tel:+526122031658" className="text-blue-600 hover:underline">
                        612 203 1658
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="size-6 text-blue-600 mt-1 shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Ubicación</div>
                      <p className="text-gray-600">
                        La Paz, Baja California Sur<br />
                        México
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Calendar className="size-6 text-blue-600 mt-1 shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Inscripciones</div>
                      <a href="https://www.huamdeportiva.com/blu-serial-aguas-abiertas" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        www.huamdeportiva.com
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50">
                <h3 className="text-xl mb-4">Paquete del competidor</h3>
                <div className="space-y-2 text-gray-700">
                  <p>• Gorra de natación oficial</p>
                  <p>• Abastecimiento de recuperación en meta</p>
                  <p>• Servicio de primeros auxilios</p>
                  <p>• Seguridad acuática durante el evento</p>
                  <p className="text-sm text-gray-500 mt-2">La playera conmemorativa es opcional y se adquiere por separado.</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e4958] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.jpg" alt="Blu" className="h-10 w-auto rounded-sm shadow-sm" />
              </div>
              <p className="text-gray-400">
                El serial de natación en aguas abiertas más prestigioso del noroeste de México. La Paz, Baja California Sur.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">Sobre nosotros</a></li>
                <li><a href="#swims" className="hover:text-white transition-colors">Eventos</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Inscripciones</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Requisitos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Boya inflada obligatoria</li>
                <li>Googles</li>
                <li>Gorra oficial del serial</li>
                <li>Carta de exoneración</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-4">Síguenos</h4>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61583398012502" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  <Facebook className="size-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                  <Instagram className="size-6" />
                </a>
                <a href="mailto:bluaguasabiertas@gmail.com" className="hover:text-gray-300 transition-colors">
                  <Mail className="size-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Blu Serial Aguas Abiertas. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
