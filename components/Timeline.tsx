import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../constants';

export const Timeline: React.FC = () => {
  return (
    <div className="relative max-w-4xl mx-auto px-6">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gold/30" />
      
      <div className="space-y-16 md:space-y-24 py-12">
        {DATA.legacy.events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${i % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse md:text-left'}`}
          >
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 -translate-x-[5px] w-[11px] h-[11px] rounded-full bg-aegean border-2 border-gold z-10 mt-1.5" />
            
            {/* Spacer for timeline */}
            <div className="hidden md:block md:w-1/2" />
            
            {/* Content */}
            <div className="pl-12 md:pl-0 md:w-1/2">
               <span className="font-mono text-gold text-xl md:text-2xl font-medium block mb-2">{event.year}</span>
               <h3 className="font-serif text-2xl md:text-3xl text-marble mb-3">{event.title}</h3>
               <p className="font-sans text-marble/70 leading-relaxed">{event.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};