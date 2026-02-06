import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Ruler, TrendingUp, ExternalLink } from 'lucide-react';
import { swimEvents } from '../data/events';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const event = swimEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Evento no encontrado</h1>
          <Link to="/">
            <Button>Regresar a inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={event.heroImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <Link to="/" className="inline-flex items-center gap-2 text-white mb-6 hover:underline">
              <ArrowLeft className="size-4" />
              Regresar a eventos
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              {event.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {event.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Detalles del evento</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Calendar className="size-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Fecha</div>
                    <div className="font-medium">{event.date}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Lugar</div>
                    <div className="font-medium">{event.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler className="size-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Distancias</div>
                    <div className="font-medium">{event.distance}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="size-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Dificultad</div>
                    <div className="font-medium">{event.difficulty}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-2xl mb-4">Sobre este evento</h2>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </Card>

            {/* Course Map */}
            <Card className="p-6">
              <h2 className="text-2xl mb-4">Información del recorrido</h2>
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <div className="aspect-video bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-blue-600">
                    <MapPin className="size-12 mx-auto mb-2" />
                    <p className="text-sm">Visualización del recorrido</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{event.mapDescription}</p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl mb-4">Registro</h3>
              <div className="mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{event.price}</div>
                <div className="text-sm text-gray-500">Por participante</div>
              </div>

              <Button
                className="w-full mb-4"
                size="lg"
                onClick={() => {
                  // Scroll to contact form
                  window.location.href = '/#contact';
                }}
              >
                Registrarse
                <ExternalLink className="size-4 ml-2" />
              </Button>

              <div className="border-t pt-4 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-green-500 rounded-full" />
                  <span>Embarcaciones de seguridad</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-green-500 rounded-full" />
                  <span>Medalla y certificado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-green-500 rounded-full" />
                  <span>Hidratación y recuperación después de nadar</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
