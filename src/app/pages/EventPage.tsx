import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Ruler, TrendingUp, ExternalLink, Trophy } from 'lucide-react';
import { swimEvents } from '../data/events';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { SwimRouteMap } from '../components/SwimRoute';

const SITE_URL = 'https://bluserialaguasabiertas.com';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const event = swimEvents.find(e => e.id === eventId);

  useEffect(() => {
    if (!event) return;

    const url = `${SITE_URL}/event/${event.id}`;
    const image = `${SITE_URL}${event.heroImage}`;
    const title = `${event.title} - Natación en Aguas Abiertas en La Paz, BCS | Blu Serial`;
    const description = `${event.shortDescription}. ${event.date}. Distancias: ${event.distance}. Inscríbete ahora.`;
    const price = event.price.replace(/[^0-9.]/g, '');

    const prevTitle = document.title;
    document.title = title;

    const metas: { attr: 'name' | 'property'; key: string; content: string }[] = [
      { attr: 'name', key: 'description', content: description },
      { attr: 'property', key: 'og:title', content: title },
      { attr: 'property', key: 'og:description', content: description },
      { attr: 'property', key: 'og:url', content: url },
      { attr: 'property', key: 'og:image', content: image },
      { attr: 'name', key: 'twitter:title', content: title },
      { attr: 'name', key: 'twitter:description', content: description },
      { attr: 'name', key: 'twitter:image', content: image },
    ];

    const prevContents = metas.map(m =>
      document.head.querySelector<HTMLMetaElement>(`meta[${m.attr}="${m.key}"]`)?.getAttribute('content') ?? null
    );
    metas.forEach(m => upsertMeta(m.attr, m.key, m.content));

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute('href') ?? null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SportsEvent',
          name: `${event.title} - Natación en Aguas Abiertas`,
          description: event.description,
          startDate: `${event.isoDate}T07:00:00-07:00`,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: event.location,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'La Paz',
              addressRegion: 'Baja California Sur',
              addressCountry: 'MX',
            },
          },
          image,
          organizer: {
            '@type': 'SportsOrganization',
            name: 'Blu Serial Aguas Abiertas',
            url: SITE_URL,
          },
          offers: {
            '@type': 'Offer',
            url,
            price,
            priceCurrency: 'MXN',
            availability: 'https://schema.org/InStock',
          },
          sport: 'Open Water Swimming',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: event.title, item: url },
          ],
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      metas.forEach((m, i) => {
        const el = document.head.querySelector<HTMLMetaElement>(`meta[${m.attr}="${m.key}"]`);
        if (!el) return;
        if (prevContents[i] === null) el.remove();
        else el.setAttribute('content', prevContents[i]);
      });
      const canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (canonicalEl) {
        if (prevCanonical === null) canonicalEl.remove();
        else canonicalEl.setAttribute('href', prevCanonical);
      }
      script.remove();
    };
  }, [event]);

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
    <div className="min-h-screen bg-slate-50">
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
                    <div className="text-sm text-slate-600">Fecha</div>
                    <div className="font-medium">{event.date}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <div className="text-sm text-slate-600">Lugar</div>
                    <div className="font-medium">{event.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler className="size-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <div className="text-sm text-slate-600">Distancias</div>
                    <div className="font-medium">{event.distance}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="size-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <div className="text-sm text-slate-600">Dificultad</div>
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

            {/* Results */}
            {event.resultsLink && (
              <Card className="p-6 border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center size-10 bg-blue-600 rounded-full shrink-0">
                    <Trophy className="size-5 text-white" />
                  </div>
                  <h2 className="text-2xl">Resultados</h2>
                </div>
                <p className="text-gray-700 mb-5">
                  Consulta los resultados oficiales de este evento en la plataforma SportHive.
                </p>
                <a
                  href={event.resultsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  <Trophy className="size-4" />
                  Ver resultados
                  <ExternalLink className="size-4" />
                </a>
              </Card>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl mb-4">Registro</h3>
              <div className="mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{event.price}</div>
                <div className="text-sm text-slate-600">Por participante</div>
              </div>

              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full mb-4" size="lg">
                  Registrarse
                  <ExternalLink className="size-4 ml-2" />
                </Button>
              </a>

              <div className="border-t pt-4 space-y-3 text-sm text-slate-700">
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

          {/* Course Map — full width */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-2xl">Información del recorrido</h2>
            <p className="text-gray-700 leading-relaxed">{event.mapDescription}</p>
            <SwimRouteMap routes={event.routes} />
          </div>
        </div>
      </div>
    </div>
  );
}
