import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import BlurFade from '@/components/magicui/blur-fade';
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";

const IMAGES = [
  { src: "https://images.pexels.com/photos/5427671/pexels-photo-5427671.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Classroom" },
  { src: "https://images.pexels.com/photos/4019754/pexels-photo-4019754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Students" },
  { src: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Library" },
  { src: "https://images.pexels.com/photos/8471850/pexels-photo-8471850.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Science Lab" },
  { src: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Sports" },
  { src: "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Art" },
  { src: "https://images.pexels.com/photos/764681/pexels-photo-764681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", alt: "Outdoor" },
];

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

const ImageGallery = ({ images, openLightbox }) => {
  return (
    <div className="flex items-center space-x-6 lg:space-x-8">
      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        <GalleryImage image={images[0]} index={0} openLightbox={openLightbox} />
        <GalleryImage image={images[1]} index={1} openLightbox={openLightbox} />
      </div>
      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        <GalleryImage image={images[2]} index={2} openLightbox={openLightbox} />
        <GalleryImage image={images[3]} index={3} openLightbox={openLightbox} />
        <GalleryImage image={images[4]} index={4} openLightbox={openLightbox} />
      </div>
      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
        <GalleryImage image={images[5]} index={5} openLightbox={openLightbox} />
        <GalleryImage image={images[6]} index={6} openLightbox={openLightbox} />
      </div>
    </div>
  );
};

const GalleryImage = ({ image, index, openLightbox }) => (
  <BlurFade inView>
    <div className="h-64 w-44 overflow-hidden rounded-lg">
      <img 
        src={image.src} 
        alt={image.alt} 
        className="h-full w-full object-cover object-center rounded-lg cursor-pointer hover:opacity-90 transition-opacity" 
        onClick={() => openLightbox(index)}
      />
    </div>
  </BlurFade>
);

const Lightbox = ({ images, currentIndex, zoom, onClose, onPrev, onNext, onZoomIn, onZoomOut, onImageClick }) => (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
    onClick={onClose}
  >
    <button 
      onClick={onClose}
      className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 focus:outline-none z-50"
      aria-label="Close lightbox"
    >
      <X size={24} />
    </button>
    
    <button 
      onClick={onPrev}
      className="absolute left-4 p-2 text-white hover:text-gray-300 focus:outline-none z-50"
      aria-label="Previous image"
    >
      <ChevronLeft size={32} />
    </button>
    
    <div 
      className="max-w-4xl max-h-screen p-4 flex items-center justify-center"
      style={{ 
        transform: `scale(${zoom})`,
        transition: 'transform 0.3s ease-in-out'
      }}
      onClick={onImageClick}
    >
      <img 
        src={images[currentIndex].src} 
        alt={images[currentIndex].alt}
        className="max-w-full max-h-[80vh] object-contain"
      />
    </div>
    
    <button 
      onClick={onNext}
      className="absolute right-4 p-2 text-white hover:text-gray-300 focus:outline-none z-50"
      aria-label="Next image"
    >
      <ChevronRight size={32} />
    </button>
    
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50">
      <button 
        onClick={onZoomOut}
        className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 focus:outline-none"
        aria-label="Zoom out"
        disabled={zoom <= MIN_ZOOM}
      >
        <ZoomOut size={20} />
      </button>
      <button 
        onClick={onZoomIn}
        className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 focus:outline-none"
        aria-label="Zoom in"
        disabled={zoom >= MAX_ZOOM}
      >
        <ZoomIn size={20} />
      </button>
    </div>
    
    <div className="absolute bottom-4 right-4 text-white text-sm z-50">
      {currentIndex + 1} / {images.length}
    </div>
  </div>
);

const HomeHero = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const navigate = useNavigate();

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleNavigation = (e, direction) => {
    e.stopPropagation();
    setZoomLevel(1);
    setCurrentImageIndex(prevIndex => {
      if (direction === 'next') {
        return (prevIndex + 1) % IMAGES.length;
      } else {
        return (prevIndex - 1 + IMAGES.length) % IMAGES.length;
      }
    });
  };

  const handleZoom = (e, action) => {
    e.stopPropagation();
    setZoomLevel(prevZoom => {
      if (action === 'in') {
        return Math.min(prevZoom + ZOOM_STEP, MAX_ZOOM);
      } else {
        return Math.max(prevZoom - ZOOM_STEP, MIN_ZOOM);
      }
    });
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  // Handle direct navigation without event handling
  const navigateToAdmission = () => {
    navigate('/admission');
    console.log('Direct navigation to admission triggered');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      
      switch (e.key) {
        case 'ArrowRight':
          setCurrentImageIndex(prev => (prev + 1) % IMAGES.length);
          setZoomLevel(1);
          break;
        case 'ArrowLeft':
          setCurrentImageIndex(prev => (prev - 1 + IMAGES.length) % IMAGES.length);
          setZoomLevel(1);
          break;
        case 'Escape':
          closeLightbox();
          break;
        case '+':
          setZoomLevel(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
          break;
        case '-':
          setZoomLevel(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <div style={{ marginTop: '4.4rem' }} className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-28 lg:pb-48 lg:pt-56">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          {/* Hero content */}
          <div className="sm:max-w-lg">
            <div className="z-10 flex">
              <div className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                <AnimatedShinyText className="inline-flex items-center text-neutral-400 justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  ✨ Ridoana Comprehensive School
                  <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Inspiring Excellence, Shaping Tomorrow's Leaders
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              At Ridoana Comprehensive School, we provide a nurturing and dynamic learning environment where every student can thrive. Explore our diverse range of programs, dedicated faculty, and state-of-the-art facilities that support academic excellence and personal growth.
            </p>
          </div>
          
          {/* Gallery and action button */}
          <div>
            <div className="mt-10">
              <div className="lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <ImageGallery images={IMAGES} openLightbox={openLightbox} />
                </div>
              </div>
              
              {/* Fixed enrollment navigation - React Router Link component */}
              <Link 
                to="/admission"
                className="inline-block rounded-md border border-transparent bg-black px-8 py-3 text-center font-medium text-white  cursor-pointer z-10 relative"
              >
                Enrol Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          images={IMAGES}
          currentIndex={currentImageIndex}
          zoom={zoomLevel}
          onClose={closeLightbox}
          onPrev={(e) => handleNavigation(e, 'prev')}
          onNext={(e) => handleNavigation(e, 'next')}
          onZoomIn={(e) => handleZoom(e, 'in')}
          onZoomOut={(e) => handleZoom(e, 'out')}
          onImageClick={handleImageClick}
        />
      )}
    </div>
  );
};

export default HomeHero;