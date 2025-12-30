import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Maximize2 } from 'lucide-react';
import PixelButton from './PixelButton';

// PENTING: Masukkan foto ke folder 'public' dan ganti nama file di bawah ini
const photos = [
  "/galeri1.jpg", // Ganti dengan nama file foto Anda di folder public
  "/galeri2.jpg",
  "/galeri3.jpg",
  // Tambahkan baris baru jika foto lebih banyak
  "https://picsum.photos/800/600?random=1", // Ini contoh placeholder (bisa dihapus)
  "https://picsum.photos/800/600?random=2", // Ini contoh placeholder (bisa dihapus)
];

const GallerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = photos.length - 1;
      if (nextIndex >= photos.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/800x600/1f2937/white?text=Add+Photo+To+Public+Folder";
  };

  return (
    <div className="py-20 px-4 bg-gray-900 border-t-4 border-b-4 border-gray-800 relative overflow-hidden">
       {/* Background Decor */}
       <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl text-yellow-400 mb-4 text-shadow-pixel flex items-center justify-center gap-3">
            <ImageIcon className="w-8 h-8" />
            <span>MEMORY ARCHIVE</span>
          </h2>
          {/* Technical text removed here */}
        </div>

        {/* Main Viewer Frame */}
        <div className="relative bg-black p-4 border-4 border-gray-600 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] max-w-4xl mx-auto">
            
            {/* Monitor Header */}
            <div className="flex justify-between items-center mb-2 px-2 border-b border-gray-800 pb-2">
                <span className="text-gray-400 text-[10px]">VIEWER.EXE</span>
                <span className="text-blue-400 text-[10px] animate-pulse">● LIVE</span>
            </div>

            {/* Image Container */}
            <div className="relative w-full aspect-video sm:aspect-[16/9] bg-gray-800 overflow-hidden border-2 border-gray-700 group">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={currentIndex}
                        src={photos[currentIndex]}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        onError={handleImageError}
                        className="absolute w-full h-full object-contain bg-black"
                    />
                </AnimatePresence>

                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
                
                {/* Navigation Buttons (Overlay) */}
                <div className="absolute inset-0 flex justify-between items-center p-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full border border-white/20 backdrop-blur-sm transition-all hover:scale-110"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button 
                        className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full border border-white/20 backdrop-blur-sm transition-all hover:scale-110"
                        onClick={() => paginate(1)}
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

                {/* Counter Badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded border border-gray-500 z-20">
                    <span className="text-yellow-400 text-xs font-mono">
                        {currentIndex + 1} / {photos.length}
                    </span>
                </div>
            </div>

            {/* Controls / Thumbnails Indicator */}
            <div className="mt-4 flex flex-col items-center">
                 {/* Progress Bar */}
                 <div className="w-full h-2 bg-gray-800 rounded-full mb-4 overflow-hidden">
                    <motion.div 
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / photos.length) * 100}%` }}
                    />
                 </div>

                 {/* Manual Controls */}
                 <div className="flex gap-4">
                    <PixelButton onClick={() => paginate(-1)} variant="secondary" className="px-4 py-2 text-[10px]">
                        PREV
                    </PixelButton>
                    <PixelButton onClick={() => paginate(1)} variant="blue" className="px-4 py-2 text-[10px]">
                        NEXT
                    </PixelButton>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;