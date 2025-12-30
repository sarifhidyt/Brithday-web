import React from 'react';
import { motion } from 'framer-motion';
import { BatteryCharging, Moon, ZapOff } from 'lucide-react';

const SleepSection: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x800/1f2937/white?text=Insert+Photo+In+Public+Folder";
  };

  return (
    <div className="py-20 px-4 bg-black relative border-t-4 border-b-4 border-gray-800">
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
            backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }}
      ></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
            <div className="inline-flex items-center gap-3 bg-gray-900 border-2 border-gray-600 px-4 py-2 rounded-full mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-red-400 text-xs tracking-widest">SYSTEM ALERT</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl text-white mb-4 flex items-center justify-center gap-4">
                <ZapOff className="text-gray-500" />
                <span>AFK MODE DETECTED</span>
                <ZapOff className="text-gray-500" />
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto">
                Ranger Blue energy levels critical. Initiating emergency recharge sequence.
                Even heroes need their beauty sleep.
            </p>
        </motion.div>

        {/* Photos Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Photo 1 */}
            <motion.div 
                initial={{ rotate: -2, x: -50, opacity: 0 }}
                whileInView={{ rotate: -2, x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
            >
                <div className="absolute -top-6 -right-6 text-4xl text-blue-300 font-bold z-20 animate-bounce">
                    Zzz...
                </div>
                <div className="bg-gray-800 p-3 border-4 border-gray-600 shadow-[10px_10px_0_0_rgba(255,255,255,0.1)]">
                    <div className="relative overflow-hidden aspect-[3/4]">
                        <img 
                            src="/sleep1.jpg" 
                            alt="Axcell Sleeping 1" 
                            onError={handleImageError}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        {/* Overlay Scanlines */}
                        <div className="absolute inset-0 bg-black/20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-green-400 text-[10px] p-2 font-mono text-left">
                            &gt; STATUS: DREAMING OF CAKE...
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Photo 2 */}
            <motion.div 
                initial={{ rotate: 2, x: 50, opacity: 0 }}
                whileInView={{ rotate: 2, x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative mt-8 md:mt-0"
            >
                 <motion.div 
                    animate={{ y: [-10, -30, -10], opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-10 -left-4 text-2xl text-purple-300 font-bold z-20"
                >
                    Zzz...
                </motion.div>

                <div className="bg-gray-800 p-3 border-4 border-gray-600 shadow-[10px_10px_0_0_rgba(255,255,255,0.1)]">
                    <div className="relative overflow-hidden aspect-[3/4]">
                        <img 
                            src="/sleep2.jpg" 
                            alt="Axcell Sleeping 2" 
                            onError={handleImageError}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                         {/* Overlay Scanlines */}
                         <div className="absolute inset-0 bg-black/20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

                         <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-yellow-400 text-[10px] p-2 font-mono text-left">
                            &gt; WARNING: LOW BATTERY
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>

        {/* Battery Animation */}
        <div className="mt-12 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 text-green-400 mb-2 animate-pulse">
                <BatteryCharging size={24} />
                <span className="text-sm">RECHARGING: 30% COMPLETE</span>
            </div>
            <div className="w-64 h-4 bg-gray-800 border-2 border-gray-600 p-0.5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "30%" }}
                    transition={{ duration: 2 }}
                    className="h-full bg-green-500 rounded-full"
                ></motion.div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default SleepSection;