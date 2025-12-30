import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Gamepad2, Zap, Shield, Star } from 'lucide-react';

const HeroSection: React.FC = () => {
  // Stats animation variants
  const barVariants: Variants = {
    hidden: { width: 0 },
    visible: (custom: number) => ({
      width: `${custom}%`,
      transition: { duration: 1.5, delay: 0.5, ease: "easeOut" }
    })
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black/40">
      
      {/* Background Grid Animation */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
            backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(20deg)',
            transformOrigin: 'top'
        }}
      ></div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 text-center mb-8"
      >
        <h1 className="text-3xl sm:text-5xl text-yellow-400 animate-pulse drop-shadow-[4px_4px_0_rgba(180,83,9,1)] tracking-tighter">
          CHOOSE YOUR HERO
        </h1>
        <p className="text-blue-300 text-xs sm:text-sm mt-2 tracking-widest">PLAYER 1 SELECTED</p>
      </motion.div>

      {/* Main Character Card Layout */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-5xl w-full z-10">
        
        {/* Character Image Frame */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative group"
        >
            {/* Background Decor */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg opacity-50 blur-lg group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            
            <div className="relative border-[6px] border-blue-600 bg-blue-950/80 p-2 shadow-[12px_12px_0_0_rgba(0,0,0,0.5)]">
                <div className="absolute top-2 left-2 right-2 flex justify-between z-20">
                    <span className="bg-red-600 text-white text-[10px] px-2 py-1 border border-white">P1</span>
                    <span className="text-yellow-400 animate-pulse">Lv.30</span>
                </div>
                
                {/* IMAGE PLACEHOLDER - Pastikan file axcell-ranger.png ada di folder public */}
                <div className="w-64 h-80 sm:w-80 sm:h-96 bg-gray-900 overflow-hidden relative">
                     {/* Scanline overlay for image */}
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
                     
                     <img 
                        src="/axcell-ranger.png" 
                        alt="Axcell Ranger" 
                        className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                            // Fallback jika gambar belum ada
                            e.currentTarget.src = "https://placehold.co/400x600/1e3a8a/FFF?text=Insert+Ranger+Photo";
                        }}
                     />
                </div>
                
                <div className="bg-blue-900 text-center py-2 mt-2 border-t-4 border-blue-700">
                    <h2 className="text-white text-lg tracking-widest text-shadow-pixel">AXCELL</h2>
                    <p className="text-blue-300 text-[10px]">CLASS: BLUE RANGER</p>
                </div>
            </div>
        </motion.div>

        {/* Character Stats */}
        <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-md bg-black/80 border-2 border-blue-500 p-6 shadow-[8px_8px_0_0_#1e3a8a]"
        >
            <div className="flex items-center gap-2 mb-6 border-b border-blue-800 pb-2">
                <Shield className="text-blue-400" />
                <h3 className="text-blue-400 text-lg">ATTRIBUTES</h3>
            </div>

            <div className="space-y-4 font-mono text-xs sm:text-sm">
                {/* Stat 1 */}
                <div>
                    <div className="flex justify-between mb-1 text-gray-300">
                        <span>WISDOM (AGE)</span>
                        <span className="text-yellow-400">30 / 100</span>
                    </div>
                    <div className="h-4 bg-gray-800 border border-gray-600 relative overflow-hidden">
                        <motion.div 
                            custom={30} 
                            variants={barVariants} 
                            initial="hidden" 
                            animate="visible"
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                        ></motion.div>
                    </div>
                </div>

                {/* Stat 2 */}
                <div>
                    <div className="flex justify-between mb-1 text-gray-300">
                        <span>CHARISMA</span>
                        <span className="text-yellow-400">MAX</span>
                    </div>
                    <div className="h-4 bg-gray-800 border border-gray-600 relative overflow-hidden">
                         <motion.div 
                            custom={100} 
                            variants={barVariants} 
                            initial="hidden" 
                            animate="visible"
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-300"
                        ></motion.div>
                    </div>
                </div>

                {/* Stat 3 */}
                <div>
                    <div className="flex justify-between mb-1 text-gray-300">
                        <span>HAPPINESS</span>
                        <span className="text-yellow-400">OVERLOAD</span>
                    </div>
                    <div className="h-4 bg-gray-800 border border-gray-600 relative overflow-hidden">
                        <motion.div 
                            animate={{ width: ["90%", "100%", "90%"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-purple-500"
                        ></motion.div>
                    </div>
                </div>

                {/* Abilities */}
                <div className="pt-4 mt-4 border-t border-dashed border-gray-700">
                    <h4 className="text-blue-300 mb-2 flex items-center gap-2"><Zap size={14} /> SPECIAL SKILLS:</h4>
                    <ul className="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
                        <li className="flex items-center gap-1">★ SUPER KICK</li>
                        <li className="flex items-center gap-1">★ LEADERSHIP</li>
                        <li className="flex items-center gap-1">★ INFINITE JOY</li>
                        <li className="flex items-center gap-1">★ PARTY MODE</li>
                    </ul>
                </div>
            </div>
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 animate-bounce text-blue-400 text-xs flex flex-col items-center"
      >
        <span>SCROLL TO START GAME</span>
        <span className="text-2xl">▼</span>
      </motion.div>
    </div>
  );
};

export default HeroSection;