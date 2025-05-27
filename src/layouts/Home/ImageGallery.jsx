import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Play, Pause, Download, Info } from 'lucide-react';

const ImageGallery = () => {
  // Sample image data - in a real app this would come from props or API
  const images = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Mountain landscape",
      caption: "Beautiful mountain view at sunset"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/5428155/pexels-photo-5428155.jpeg",
      alt: "Beach scene",
      caption: "Tropical beach with palm trees"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "City skyline",
      caption: "Urban skyline at night"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/5427671/pexels-photo-5427671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Forest path",
      caption: "Serene forest walking path"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/5427681/pexels-photo-5427681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Desert landscape",
      caption: "Desert sand dunes at dawn"
    }
  ];

  // State management
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  // Handle slideshow functionality
  useEffect(() => {
    let slideTimer;
    if (isPlaying && isLightboxOpen) {
      slideTimer = setInterval(() => {
        handleNext();
      }, 3000); // Change slide every 3 seconds
    }
    return () => clearInterval(slideTimer);
  }, [isPlaying, currentIndex, isLightboxOpen]);

  // Open lightbox with selected image
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    setIsLightboxOpen(true);
    setZoomLevel(1);
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsPlaying(false);
    setZoomLevel(1);
    setShowInfo(false);
  };

  // Navigate to next image
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
    setZoomLevel(1);
  };

  // Navigate to previous image
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
    setZoomLevel(1);
  };

  // Handle zoom in
  const zoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel(zoomLevel + 0.5);
    }
  };

  // Handle zoom out
  const zoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.5);
    }
  };

  // Toggle slideshow
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle image info
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      
      switch (e.key) {
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'Escape':
          closeLightbox();
          break;
        case '+':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case ' ': // Spacebar
          togglePlay();
          e.preventDefault();
          break;
        case 'i':
          toggleInfo();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, currentIndex, zoomLevel, isPlaying, showInfo]);

  return (
    <div className="container mx-auto mb-5 mx-auto p-6 bg-gray-100 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Image Gallery</h2>
      
      {/* Enhanced masonry-style gallery grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* First large image */}
        <div 
          className="col-span-12 md:col-span-6 overflow-hidden rounded-xl  cursor-pointer transition transform hover:scale-105 hover:shadow-xl"
          onClick={() => openLightbox(0)}
        >
          <div className="relative h-80 group">
            <img 
              src={images[0].src} 
              alt={images[0].alt} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
              <div className="p-4 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                <h3 className="font-bold text-lg">{images[0].alt}</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Two medium images */}
        <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-4">
          <div 
            className="col-span-2 sm:col-span-1 overflow-hidden rounded-xl  cursor-pointer transition transform hover:scale-105 "
            onClick={() => openLightbox(1)}
          >
            <div className="relative h-40 group">
              <img 
                src={images[1].src} 
                alt={images[1].alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0  group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                <div className="p-3 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="font-bold text-sm">{images[1].alt}</h3>
                </div>
              </div>
            </div>
          </div>
          <div 
            className="col-span-2 sm:col-span-1 overflow-hidden rounded-xl  cursor-pointer transition transform hover:scale-105 "
            onClick={() => openLightbox(2)}
          >
            <div className="relative h-40 group">
              <img 
                src={images[2].src} 
                alt={images[1].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0  group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                <div className="p-3 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="font-bold text-sm">{images[2].alt}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Two wide images */}
        <div 
          className="col-span-12 md:col-span-8 overflow-hidden rounded-xl shadow-lg cursor-pointer transition transform hover:scale-105 hover:shadow-xl"
          onClick={() => openLightbox(3)}
        >
          <div className="relative h-60 group">
            <img 
              src={images[3].src} 
              alt={images[3].alt} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0   group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
              <div className="p-4 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                <h3 className="font-bold text-lg">{images[3].alt}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className="col-span-12 md:col-span-4 overflow-hidden rounded-xl shadow-lg cursor-pointer transition transform hover:scale-105 hover:shadow-xl"
          onClick={() => openLightbox(4)}
        >
          <div className="relative h-60 group">
            <img 
              src={images[4].src} 
              alt={images[4].alt} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
              <div className="p-4 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                <h3 className="font-bold text-lg">{images[4].alt}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lightbox overlay - unchanged */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col">
            {/* Top toolbar */}
            <div className="flex justify-between items-center p-4 text-white">
              <div className="text-sm">
                {currentIndex + 1} / {images.length}
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={toggleInfo} 
                  className="p-2 rounded-full hover:bg-gray-800 transition"
                  aria-label="Show image information"
                >
                  <Info size={20} />
                </button>
                <button 
                  onClick={closeLightbox} 
                  className="p-2 rounded-full hover:bg-gray-800 transition"
                  aria-label="Close lightbox"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Main image container */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              {/* Navigation buttons */}
              <button 
                onClick={handlePrev} 
                className="absolute left-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              
              {/* Main image */}
              <div 
                className="max-h-full max-w-full overflow-auto"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.3s ease'
                }}
              >
                {selectedImage && (
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.alt} 
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
              
              <button 
                onClick={handleNext} 
                className="absolute right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Info panel */}
            {showInfo && selectedImage && (
              <div className="absolute inset-x-0 bottom-20 bg-black bg-opacity-75 p-4 text-white">
                <h3 className="font-bold">{selectedImage.alt}</h3>
                <p>{selectedImage.caption}</p>
              </div>
            )}
            
            {/* Bottom toolbar */}
            <div className="flex justify-center items-center p-4 bg-black bg-opacity-75 text-white">
              <div className="flex space-x-6">
                <button 
                  onClick={zoomOut} 
                  className="p-2 rounded-full hover:bg-gray-800 transition"
                  aria-label="Zoom out"
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut size={20} className={zoomLevel <= 0.5 ? "opacity-50" : ""} />
                </button>
                <button 
                  onClick={zoomIn} 
                  className="p-2 rounded-full hover:bg-gray-800 transition"
                  aria-label="Zoom in"
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn size={20} className={zoomLevel >= 3 ? "opacity-50" : ""} />
                </button>
                <button 
                  onClick={togglePlay} 
                  className="p-2 rounded-full hover:bg-gray-800 transition"
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-800 transition"
                  aria-label="Download image"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;