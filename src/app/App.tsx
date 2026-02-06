import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Navigation } from './components/Navigation';
import LandingPage from './pages/LandingPage';
import EventPage from './pages/EventPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/event/:eventId" element={<EventPage />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}
