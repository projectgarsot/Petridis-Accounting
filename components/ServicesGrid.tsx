import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../constants';
import { Service } from '../types';

export const ServicesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {DATA.services.map((service, i) => (
        <SpotlightCard key={service.id} index={i} service={service} />
      ))}
    </div>
  );
};

const getIcon = (id: string) => {
  // Lucide-style SVG icons
  const props = { className: "w-6 h-6", strokeWidth: 1.5, stroke: "currentColor", fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24" };
  
  switch (id) {
    case 'tax':
      return (
        <svg {...props}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
      );
    case 'accounting':
      return (
        <svg {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
      );
    case 'payroll':
      return (
        <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      );
    case 'formation':
        return (
            <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
        );
    case 'declarations':
        return (
            <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        );
    case 'consulting':
        return (
            <svg {...props}><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg>
        );
    default:
      return null;
  }
};

interface CardProps {
  index: number;
  service: Service;
}

const SpotlightCard: React.FC<CardProps> = ({ service, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative h-full min-h-[300px] rounded-lg border border-aegean/20 bg-white/5 overflow-hidden group cursor-pointer flex flex-col"
    >
      {/* Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(184, 149, 74, 0.15), transparent 40%)`,
        }}
      />
      
      <div className="relative p-8 flex flex-col h-full z-10">
        <div className="w-10 h-10 mb-6 text-aegean/80 group-hover:text-gold transition-colors duration-300">
           {getIcon(service.id)}
        </div>
        
        <span className="text-[10px] font-bold tracking-[0.2em] text-gold/80 uppercase mb-2">
            {service.subtitle}
        </span>
        
        <h3 className="font-serif text-2xl text-aegean dark:text-marble mb-4 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        
        <p className="font-sans text-sm text-marble/70 leading-relaxed mb-6 flex-grow group-hover:text-marble/90 transition-colors">
          {service.desc}
        </p>

        <a href="#contact" className="flex items-center text-gold text-xs font-bold uppercase tracking-wider mt-auto group-hover:translate-x-1 transition-transform">
             <span>Μάθετε Περισσότερα</span>
             <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>
      
      {/* Border Glow */}
      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 rounded-lg transition-colors duration-500" />
    </motion.div>
  );
};