
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BackgroundShader } from './components/BackgroundShader';
import { Navbar } from './components/Navbar';
import { ServicesGrid } from './components/ServicesGrid';
import { LocationToggle } from './components/LocationToggle';
import { Timeline } from './components/Timeline';
import { Stats } from './components/Stats';
import { ContactSection } from './components/ContactSection';
import { DATA } from './constants';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Interpolate colors: Aegean Blue -> Olive Green
  // Used for accents and border colors
  const primaryColor = useTransform(
    smoothScroll,
    [0, 0.6],
    ["#2C5F7F", "#B8954A"]
  );

  const textColor = useTransform(
    smoothScroll, 
    [0, 1], 
    ["#FAFAF8", "#F5F5F0"]
  );

  return (
    <div ref={containerRef} className="relative w-full font-sans selection:bg-gold selection:text-white">
      {/* WebGL Background */}
      <div className="fixed inset-0 z-0">
        <BackgroundShader scrollProgress={smoothScroll} />
      </div>

      <Navbar currentThemeColor={primaryColor} />

      {/* Main Content */}
      <main className="relative z-10 w-full flex flex-col items-center overflow-hidden">
        
        {/* 1. HERO */}
        <section className="relative min-h-screen w-full flex items-center justify-center px-6 py-24 md:py-0">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left z-10 order-1 lg:order-1">
                <motion.h1 
                  style={{ color: textColor }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8"
                >
                  {DATA.hero.h1}
                </motion.h1>
                
                <motion.p 
                  style={{ color: textColor }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="font-sans text-lg md:text-xl opacity-80 max-w-xl font-light leading-relaxed mb-12"
                >
                  {DATA.hero.sub}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                    <a href="#contact" className="bg-gold text-white px-8 py-4 rounded shadow-lg shadow-gold/20 font-medium uppercase tracking-widest text-xs hover:bg-white hover:text-aegean transition-colors text-center flex items-center justify-center">
                        {DATA.hero.cta_primary}
                    </a>
                    <a href="#services" className="px-8 py-4 rounded border border-white/20 text-white font-medium uppercase tracking-widest text-xs hover:bg-white/10 transition-colors text-center flex items-center justify-center">
                        {DATA.hero.cta_secondary}
                    </a>
                </motion.div>
            </div>
            
            {/* Visual (Right Side) - Statue / Arch */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
               className="flex relative h-[500px] lg:h-[700px] w-full justify-center items-end order-2 lg:order-2 mt-12 lg:mt-0"
            >
                {/* Decorative Glow Behind Statue */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-gold/20 rounded-full blur-[60px] lg:blur-[100px] pointer-events-none"></div>

                {/* Arch Container */}
                <div className="relative w-full max-w-[320px] lg:max-w-[460px] h-[480px] lg:h-[680px] rounded-t-full lg:rounded-t-[230px] overflow-hidden border border-white/10 shadow-2xl shadow-black/30 backdrop-blur-sm z-10 group">
                    
                    {/* Statue Image - ATHENA */}
                    <img 
                      src="/images/athena.png"
                      alt="Statue of Athena"
                      className="w-full h-full object-cover object-top opacity-100 scale-105"
                    />
                    
                    {/* Gradient Overlay to blend bottom into AEGEAN theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-aegean via-transparent to-transparent pointer-events-none opacity-50"></div>
                    
                    {/* Subtle Inner Highlight */}
                    <div className="absolute inset-0 rounded-t-full lg:rounded-t-[230px] border-t border-white/20 pointer-events-none"></div>
                </div>
            </motion.div>
          </div>
        </section>

        {/* 2. LEGACY & TIMELINE */}
        <section id="history" className="w-full max-w-7xl px-6 py-24 md:py-32 relative">
           <div className="text-center max-w-3xl mx-auto mb-20">
               <motion.span 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="text-gold font-mono text-sm tracking-widest uppercase mb-4 block"
               >
                 {DATA.legacy.subtitle}
               </motion.span>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="font-serif text-4xl md:text-5xl text-marble mb-8 leading-tight"
               >
                 {DATA.legacy.title}
               </motion.h2>
               <motion.p 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="font-sans text-lg md:text-xl text-marble/80 leading-relaxed font-light whitespace-pre-line"
               >
                 {DATA.legacy.about}
               </motion.p>
           </div>
           
           <Timeline />
        </section>

        {/* 3. STATS (Why Choose Us) */}
        <section className="w-full bg-white/5 backdrop-blur-sm border-y border-white/10 py-20">
            <Stats />
        </section>

        {/* 4. SERVICES */}
        <section id="services" className="w-full max-w-7xl px-6 py-24 md:py-32">
           <div className="mb-16 md:mb-24">
               <h2 className="font-serif text-4xl md:text-5xl text-marble mb-4">Οι Υπηρεσίες Μας</h2>
               <div className="w-24 h-1 bg-gold rounded-full"></div>
           </div>
           <ServicesGrid />
        </section>

        {/* 5. LOCATIONS */}
        <section id="locations" className="w-full min-h-screen flex flex-col items-center justify-center relative px-6 py-24">
          <div className="text-center mb-16 z-10">
            <h2 className="font-serif text-4xl md:text-5xl text-marble mb-6">Τα Γραφεία Μας</h2>
            <p className="font-sans text-marble/60 max-w-xl mx-auto">
              Εξυπηρετούμε με την ίδια συνέπεια και επαγγελματισμό, είτε βρίσκεστε στην Αθήνα είτε στη Μεσσηνία.
            </p>
          </div>
          
          <LocationToggle />
        </section>

        {/* 6. CONTACT */}
        <section id="contact" className="w-full py-24 md:py-32 px-6">
             <div className="text-center mb-16">
                 <h2 className="font-serif text-4xl md:text-5xl text-marble mb-4">Επικοινωνία</h2>
                 <p className="text-marble/60">Είμαστε εδώ για να απαντήσουμε σε κάθε σας ερώτημα.</p>
             </div>
             <ContactSection />
        </section>

        {/* FOOTER */}
        <footer className="w-full bg-charcoal border-t border-white/5 pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div className="space-y-6">
                    <h4 className="font-serif text-2xl text-gold">{DATA.company}</h4>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xs">{DATA.tagline}</p>
                </div>
                <div className="space-y-6">
                    <h5 className="text-xs uppercase tracking-widest text-white/40">ΣΥΝΤΟΜΟΙ ΣΥΝΔΕΣΜΟΙ</h5>
                    <div className="flex flex-col gap-3">
                         <a href="#history" className="text-white/70 hover:text-gold text-sm transition-colors">Η Ιστορία μας</a>
                         <a href="#services" className="text-white/70 hover:text-gold text-sm transition-colors">Υπηρεσίες</a>
                         <a href="#locations" className="text-white/70 hover:text-gold text-sm transition-colors">Γραφεία</a>
                         <a href="#contact" className="text-white/70 hover:text-gold text-sm transition-colors">Επικοινωνία</a>
                    </div>
                </div>
                <div className="space-y-6">
                    <h5 className="text-xs uppercase tracking-widest text-white/40">ΕΠΙΚΟΙΝΩΝΙΑ</h5>
                    <div className="space-y-4">
                        <div>
                            <span className="text-xs text-gold/80 block mb-1">ΑΘΗΝΑ</span>
                            <p className="text-white/80 text-sm">{DATA.locations.athens.address}</p>
                            <p className="text-white/60 text-sm mt-1">{DATA.locations.athens.phone}</p>
                        </div>
                         <div>
                            <span className="text-xs text-gold/80 block mb-1">ΦΙΛΙΑΤΡΑ</span>
                            <p className="text-white/80 text-sm">{DATA.locations.filiatra.address}</p>
                            <p className="text-white/60 text-sm mt-1">{DATA.locations.filiatra.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
                 <p>© 2025 {DATA.company}. All rights reserved.</p>
                 <p>Με ❤️ από την Αθήνα και τη Φιλιάτρα</p>
            </div>
        </footer>

      </main>
    </div>
  );
}
