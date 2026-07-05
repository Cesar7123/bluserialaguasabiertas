import { useState, useEffect, useRef } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { auto as formatAuto } from '@cloudinary/url-gen/qualifiers/format';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CloudinaryResource {
  public_id: string;
  format: string;
  version: number;
}

export default function Gallery() {
  const [images, setImages] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const IMAGES_PER_PAGE = 12;

  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/cloudinary');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data.resources || []);
      } catch (error) {
        console.error('Error fetching Cloudinary images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (cloudName) {
      fetchImages();
    } else {
      setLoading(false);
    }
  }, [cloudName]);

  const goNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'Escape') setSelectedIndex(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  if (!cloudName) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No hay imágenes disponibles en la galería</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Cargando galería...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No hay imágenes disponibles en la galería</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.slice(0, visibleCount).map((resource, index) => (
          <div
            key={resource.public_id}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedIndex(index)}
          >
            <AdvancedImage
              cldImg={cld
                .image(resource.public_id)
                .format(formatAuto())
                .quality(auto())
                .resize(fill().width(400).height(400))}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {visibleCount < images.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount(prev => Math.min(prev + IMAGES_PER_PAGE, images.length))}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Ver más ({images.length - visibleCount} más)
          </button>
        </div>
      )}

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl font-light z-10"
            >
              ×
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}

            <AdvancedImage
              cldImg={cld
                .image(images[selectedIndex].public_id)
                .format(formatAuto())
                .quality(auto())}
              className="w-full h-full object-contain"
            />

            {images.length > 1 && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
