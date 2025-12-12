import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../constants';

export const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
      {DATA.stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="font-mono text-4xl md:text-5xl lg:text-6xl text-gold mb-2 font-medium">
            {stat.value}
          </div>
          <h4 className="font-serif text-marble text-lg md:text-xl mb-1">
            {stat.label}
          </h4>
          <p className="font-sans text-marble/50 text-xs md:text-sm">
            {stat.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
};