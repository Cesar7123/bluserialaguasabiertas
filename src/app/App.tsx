import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navigation } from './components/Navigation';
import LandingPage from './pages/LandingPage';
import EventPage from './pages/EventPage';
import FAQPage from './pages/FAQPage';

function RouteFocus() {
  const location = useLocation();

  useEffect(() => {
    const main = document.getElementById('main-content');
    main?.focus({ preventScroll: true });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-x-hidden">
        <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
        <Navigation />
        <div className="pt-16">
          <RouteFocus />
          <main id="main-content" tabIndex={-1} className="outline-none">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/event/:eventId" element={<EventPage />} />
            <Route path="/preguntas-frecuentes" element={<FAQPage />} />
          </Routes>
          </main>
        </div>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}
