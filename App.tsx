import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import SnakeGame from './components/SnakeGame';
import GallerySection from './components/GallerySection';
import MessageBoard from './components/MessageBoard';
import SleepSection from './components/SleepSection';
import { Volume2, VolumeX } from 'lucide-react';

const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="min-h-screen bg-[#111] text-white selection:bg-pink-500 selection:text-white">
      {/* Global CRT Effects */}
      <div className="scanlines"></div>
      <div className="crt-flicker"></div>

      {/* Audio Toggle (Visual only for this demo) */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-4 right-4 z-50 bg-black border-2 border-green-500 p-2 text-green-500 hover:bg-green-900 transition-colors"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Main Content */}
      <main className="relative z-10 pb-20">
        <HeroSection />

        <section className="py-20 px-4 flex flex-col items-center bg-gradient-to-b from-[#111] to-[#1a1a1a]">
          <h2 className="text-2xl sm:text-3xl text-center mb-8 text-blue-400">
            <span className="text-yellow-400 text-4xl block mb-2">★</span>
            BONUS STAGE
          </h2>
          <SnakeGame />
        </section>

        {/* Special Funny Section */}
        <SleepSection />

        <GallerySection />
        
        <MessageBoard />

        <footer className="py-10 text-center text-gray-600 text-[10px]">
          <p>© 2024 AXCELL'S 30TH BIRTHDAY EDITION</p>
          <p className="mt-2">MADE WITH LOVE</p>
        </footer>
      </main>
    </div>
  );
};

export default App;