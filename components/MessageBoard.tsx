import React from 'react';
import { motion } from 'framer-motion';

const MessageBoard: React.FC = () => {
  return (
    <div className="py-20 px-4 bg-indigo-950 relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
                backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}
        ></div>

        <div className="max-w-3xl mx-auto relative z-10">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-black border-4 border-blue-500 p-6 sm:p-10 shadow-[10px_10px_0_0_#1e40af]"
            >
                <div className="flex items-center gap-4 mb-6 border-b-2 border-blue-800 pb-4">
                    <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-2xl border-2 border-white">
                        ⚡
                    </div>
                    <div>
                        <h3 className="text-blue-400 text-sm">FROM: COMMAND CENTER (FRIENDS & FAMILY)</h3>
                        <p className="text-gray-500 text-xs">TO: RANGER AXCELL</p>
                    </div>
                </div>

                <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-200 font-mono">
                    <p>
                        <span className="text-blue-400 font-bold text-lg">MISSION UPDATE: LEVEL 32 REACHED!</span>
                    </p>
                    <p>
                        Happy Birthday, Ranger Axcell! Another year of defending the universe from boredom and sadness has been successfully completed. 
                        Your transformation into Level 32 brings new powers and wisdom.
                    </p>
                    <p>
                        We are incredibly grateful for your heroism, kindness, and the joy you bring to our squad.
                    </p>
                    <div className="bg-blue-900/30 p-4 border border-blue-600 rounded">
                        <p className="text-blue-300 mb-2 text-xs">CURRENT BUFFS APPLIED:</p>
                        <ul className="list-none space-y-2 pl-2 text-xs sm:text-sm text-yellow-300">
                            <li>➤ Infinite Health & Prosperity</li>
                            <li>➤ Maximum Luck Stat</li>
                            <li>➤ Unlocked "Best Year Yet" Achievement</li>
                        </ul>
                    </div>
                    <p>
                        Go Go Power Ranger! May your year be filled with morphinominal moments and legendary victories.
                    </p>
                    
                    <div className="text-right mt-8 pt-4 border-t border-gray-800">
                        <span className="animate-pulse text-green-500">MISSION STATUS: SUCCESS ▶</span>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

export default MessageBoard;