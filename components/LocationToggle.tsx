
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DATA } from '../constants';

type LocationKey = 'athens' | 'filiatra';

export const LocationToggle: React.FC = () => {
  const [active, setActive] = useState<LocationKey>('athens');

  const getLabel = (loc: LocationKey) => loc === 'athens' ? 'ΑΘΗΝΑ' : 'ΦΙΛΙΑΤΡΑ';

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Toggle Switch */}
      <div className="flex bg-white/5 backdrop-blur-sm p-1 rounded-lg border border-white/10">
        {(['athens', 'filiatra'] as LocationKey[]).map((loc) => (
          <button
            key={loc}
            onClick={() => setActive(loc)}
            className={`relative px-8 py-3 rounded-md text-sm font-sans font-medium tracking-wider transition-colors duration-300 z-10 ${
              active === loc ? 'text-aegean' : 'text-white/60 hover:text-white'
            }`}
          >
            {active === loc && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-white shadow-lg rounded-md"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                style={{ zIndex: -1 }}
              />
            )}
            {getLabel(loc)}
          </button>
        ))}
      </div>

      {/* Morphing Card */}
      <div className="relative w-full max-w-md">
        <AnimatePresence mode="wait">
            <motion.div
                key={active}
                layoutId="locationCard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="bg-marble/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-xl w-full md:w-[420px] shadow-2xl"
            >
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center justify-between mb-6">
                         <h3 className="font-serif text-3xl text-gold">
                            {DATA.locations[active].label}
                        </h3>
                        {/* Map Icon */}
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                             <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                    </div>
                   
                    <div className="h-[1px] w-full bg-white/10 mb-6" />
                    
                    <div className="space-y-6">
                        <div className="flex flex-col group">
                            <span className="text-[10px] uppercase text-white/40 tracking-widest mb-1 group-hover:text-gold transition-colors">ΔΙΕΥΘΥΝΣΗ</span>
                            <p className="font-sans text-white/90 text-lg font-light leading-relaxed">
                                {DATA.locations[active].address}
                            </p>
                        </div>
                        
                        <div className="flex flex-col group">
                            <span className="text-[10px] uppercase text-white/40 tracking-widest mb-1 group-hover:text-gold transition-colors">ΕΠΙΚΟΙΝΩΝΙΑ</span>
                            <p className="font-mono text-white/90 text-xl tracking-tight">
                                {DATA.locations[active].phone}
                            </p>
                            <p className="font-sans text-white/70 text-sm mt-1">
                                {DATA.locations[active].email}
                            </p>
                        </div>

                         <a 
                            href={DATA.locations[active].mapUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block text-center mt-2 w-full py-3 border border-white/20 text-white/80 hover:bg-white hover:text-aegean transition-all text-xs uppercase tracking-widest font-medium rounded"
                         >
                             ΟΔΗΓΙΕΣ ΧΑΡΤΗ
                         </a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
