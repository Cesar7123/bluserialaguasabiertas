import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.assign(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Inicio', sectionId: 'home' },
    { label: 'Sobre nosotros', sectionId: 'about' },
    { label: 'Eventos', sectionId: 'swims' },
    { label: 'Inscripciones', sectionId: 'pricing' },
    { label: 'Colaboradores', sectionId: 'partners' },
    { label: 'Galería', sectionId: 'gallery' },
    { label: 'Contacto', sectionId: 'contact' },
  ];

  return (
    <nav aria-label="Navegación principal" className="fixed top-0 left-0 right-0 z-50 bg-[#123b4a]/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Blu" className="h-15 w-auto rounded-sm shadow-sm" />
            {/* <span className="font-bold text-xl text-white">Blu aguas abiertas</span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="min-h-11 text-white hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <Link to="/preguntas-frecuentes" className="hidden md:inline-flex min-h-11 items-center rounded-full border border-white/40 px-4 text-sm font-semibold text-white hover:bg-white hover:text-[#123b4a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 transition-colors">
            Preguntas frecuentes
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-white/10 text-white focus-visible:outline-2 focus-visible:outline-cyan-300"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-navigation" className="md:hidden py-4 border-t border-white/20">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="block min-h-11 w-full text-left px-4 py-3 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-cyan-300 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Link to="/preguntas-frecuentes" onClick={() => setIsOpen(false)} className="block min-h-11 px-4 py-3 font-semibold text-cyan-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-cyan-300">
              Preguntas frecuentes
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
