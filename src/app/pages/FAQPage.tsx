import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '../components/ui/button';

const SITE_URL = 'https://bluserialaguasabiertas.com';

const faqs = [
  { question: '¿Quién puede participar en los nados?', answer: 'La participación depende de la distancia, la edad, la experiencia y la condición física de cada persona. Antes de inscribirte, revisa la información específica del evento y elige una distancia acorde con tu preparación. En menores de edad se requiere autorización de madre, padre o tutor.' },
  { question: '¿Qué incluye la inscripción?', answer: 'Incluye acceso al nado, gorro oficial, medalla de participación, seguridad acuática y abastecimiento de recuperación en meta.' },
  { question: '¿Dónde se realizan los eventos?', answer: 'El serial se lleva a cabo en playas emblemáticas de La Paz, Baja California Sur, como Coromuel, Caimancito, Tecolote y Pichilingue.' },
  { question: '¿Qué equipo es obligatorio?', answer: 'Debes llevar boya inflada obligatoria, goggles, gorra oficial del serial y carta de exoneración. El número de competencia debe permanecer visible según las instrucciones de la organización. Cualquier equipo adicional debe ser autorizado por la organización y puede cambiar la categoría o elegibilidad para premios.' },
  { question: '¿Puedo solicitar un reembolso o transferir mi inscripción?', answer: 'No hay reembolsos y las inscripciones son intransferibles. Si tienes una situación particular, escríbenos antes del evento.' },
  { question: '¿Qué reglas debo respetar durante el recorrido?', answer: 'Debes seguir el recorrido marcado y rodear correctamente las boyas de giro. No está permitido caminar, impulsarte en el fondo o recibir apoyo físico para avanzar, excepto cuando exista una emergencia o rescate. Está permitido nadar con cualquier estilo y aprovechar la estela de otro nadador, pero no la de una embarcación.' },
  { question: '¿Qué ocurre si necesito ayuda o veo a otro nadador en peligro?', answer: 'La seguridad tiene prioridad sobre cualquier regla competitiva. Pide ayuda, responde a las indicaciones de oficiales y apoya a otro nadador en una emergencia. El personal de seguridad puede retirar a una persona del agua si existe riesgo, agotamiento o una condición que comprometa su integridad.' },
  { question: '¿Cómo funcionan las advertencias y descalificaciones?', answer: 'El árbitro puede emitir advertencias y descalificar por incumplir el recorrido, interferir con otros participantes, recibir ventaja indebida o mostrar conducta antideportiva. Como referencia de competencia, dos advertencias amarillas pueden resultar en descalificación y una roja puede implicar descalificación inmediata.' },
  { question: '¿Las embarcaciones y kayaks pueden acercarse a los nadadores?', answer: 'Las embarcaciones y kayaks de apoyo deben mantenerse a una distancia segura, evitar atravesar o bloquear al grupo y seguir las instrucciones del árbitro y del equipo de seguridad. La interferencia con otro participante puede afectar la elegibilidad del nadador acompañado.' },
  { question: '¿Cómo consulto los resultados?', answer: 'Los resultados oficiales disponibles se publican en la página de cada evento y enlazan a la plataforma SportHive.' },
];

export default function FAQPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Preguntas frecuentes sobre natación en aguas abiertas | Blu Serial';
    const description = 'Resuelve tus dudas sobre inscripciones, distancias, requisitos, sedes y seguridad del Blu Serial Aguas Abiertas en La Paz, BCS.';
    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    const previousDescription = meta.content;
    meta.content = description;
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    const previousCanonical = canonical.href;
    canonical.href = `${SITE_URL}/preguntas-frecuentes`;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    });
    document.head.appendChild(script);

    const ctx = gsap.context(() => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.from('.faq-reveal', { opacity: 0, y: 22, duration: 0.45, stagger: 0.06, ease: 'power2.out' });
      }
    }, pageRef);
    return () => { ctx.revert(); meta!.content = previousDescription; canonical!.href = previousCanonical; script.remove(); };
  }, []);

  return (
    <div ref={pageRef} className="min-h-[calc(100dvh-4rem)] bg-sky-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link to="/" className="faq-reveal mb-10 inline-flex min-h-11 items-center gap-2 text-sky-900 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700">
          <ArrowLeft className="size-4" aria-hidden="true" /> Regresar al inicio
        </Link>
        <header className="faq-reveal mb-12 max-w-3xl">
          <p className="mb-3 font-semibold uppercase tracking-[0.18em] text-sky-700">Guía del participante</p>
          <h1 className="mb-5 text-5xl font-semibold text-slate-950 sm:text-7xl">Preguntas frecuentes</h1>
          <p className="text-lg leading-8 text-slate-700">Todo lo que necesitas saber para prepararte y disfrutar tu próximo nado en el Mar de Cortés.</p>
        </header>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-reveal group rounded-2xl border border-sky-100 bg-white shadow-sm open:shadow-md">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-lg font-semibold text-slate-950 marker:hidden [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown className="size-5 shrink-0 text-sky-700 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="border-t border-sky-100 px-5 pb-5 pt-4 leading-7 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
        <section className="faq-reveal mt-12 rounded-2xl border border-cyan-200 bg-cyan-50 p-6 sm:p-8" aria-labelledby="rules-heading">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-800">Reglas del evento</p>
          <h2 id="rules-heading" className="mb-3 text-3xl text-slate-950">La seguridad está primero</h2>
          <p className="max-w-2xl leading-7 text-slate-700">Estas respuestas resumen criterios de seguridad y competencia de aguas abiertas para orientar a participantes. En caso de cambios por clima, condiciones del agua o seguridad, prevalecen las instrucciones del director de carrera, árbitro y equipo de seguridad.</p>
        </section>
        <div className="faq-reveal mt-12 rounded-2xl bg-[#123b4a] p-6 text-white sm:p-8">
          <h2 className="mb-2 text-3xl">¿Todavía tienes dudas?</h2>
          <p className="mb-6 text-slate-200">Escríbenos y te ayudamos a elegir el evento adecuado para ti.</p>
          <Button asChild className="bg-cyan-400 text-slate-950 hover:bg-cyan-300"><Link to="/#contact">Contactar al equipo</Link></Button>
        </div>
      </div>
    </div>
  );
}
