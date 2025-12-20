
import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../constants';

export const WebDesignSection: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Narrative Section */}
      <div className="max-w-7xl mx-auto px-6 mb-24 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gold font-mono text-xs tracking-[0.3em] uppercase mb-6 block"
            >
              {DATA.digital.subtitle}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl lg:text-7xl text-marble leading-[1.1] mb-8"
            >
              {DATA.digital.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-sans text-xl md:text-2xl text-marble/90 font-light leading-relaxed mb-8"
            >
              {DATA.digital.description}
            </motion.p>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="p-8 border-l border-gold/30 bg-white/[0.03] backdrop-blur-sm"
             >
                <p className="font-serif italic text-2xl text-gold/80 leading-relaxed">
                  "{DATA.digital.narrative}"
                </p>
             </motion.div>
          </div>
        </div>
      </div>

      {/* 2. Philosophy Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {DATA.digital.philosophy.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="w-12 h-[1px] bg-gold/50 mb-6 group-hover:w-24 transition-all duration-500" />
              <h4 className="font-serif text-2xl text-marble mb-4 group-hover:text-gold transition-colors">
                {item.title}
              </h4>
              <p className="font-sans text-marble/60 text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Portfolio Showcase Title */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
         <h5 className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase border-b border-white/5 pb-4">
           SELECTED PROJECTS
         </h5>
      </div>

      {/* 4. Horizontal Scrolling Gallery - Cards always in color */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 px-6 overflow-x-auto pb-16 no-scrollbar snap-x snap-mandatory">
          {DATA.digital.projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="min-w-[300px] md:min-w-[400px] aspect-[4/5] relative rounded-lg overflow-hidden group snap-center"
            >
              {/* Image without grayscale */}
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-gold font-mono text-[10px] tracking-widest uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  {project.category}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-marble mb-4">
                  {project.title}
                </h3>
                
                <div className="flex items-center gap-2 text-white/50 group-hover:text-gold transition-colors">
                  <span className="text-[10px] uppercase tracking-widest font-bold">VIEW PROJECT</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              
              {/* Subtle Frame */}
              <div className="absolute inset-4 border border-white/10 pointer-events-none group-hover:border-gold/30 transition-colors duration-500" />
            </motion.a>
          ))}
          {/* Visual Spacer */}
          <div className="min-w-[100px] h-full" />
        </div>
      </div>
    </div>
  );
};
