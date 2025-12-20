
import React, { useState } from 'react';
import { motion, MotionValue, AnimatePresence } from 'framer-motion';
import { DATA } from '../constants';

interface NavbarProps {
  currentThemeColor: MotionValue<string>;
}

export const Navbar: React.FC<NavbarProps> = ({ currentThemeColor }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'history', label: 'ΙΣΤΟΡΙΑ' },
    { id: 'services', label: 'ΥΠΗΡΕΣΙΕΣ' },
    { id: 'digital', label: 'DIGITAL' },
    { id: 'locations', label: 'ΓΡΑΦΕΙΑ' },
    { id: 'contact', label: 'ΕΠΙΚΟΙΝΩΝΙΑ' }
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 50 }}
        className="fixed top-0 left-0 right-0 z-[60] w-full"
      >
        <motion.div 
          style={{ 
            borderBottomColor: currentThemeColor,
          }}
          className="relative flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-lg bg-aegean/10 border-b transition-colors duration-500"
        >
          {/* Left Side: Logo */}
          <div className="flex items-center gap-3 z-50">
              <div className="w-8 h-8 rounded border border-gold/50 flex items-center justify-center bg-white/5">
                  <span className="font-serif text-gold font-bold text-lg">Π</span>
              </div>
              <a href="#" className="font-serif text-xl text-marble tracking-wide hover:opacity-80 transition-opacity">
                  {DATA.company}
              </a>
          </div>

          {/* Right Side: Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className="group relative text-[11px] uppercase tracking-[0.15em] text-marble/70 hover:text-gold transition-colors font-sans font-medium"
              >
                {item.label}
              </a>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="ml-2 px-5 py-2 rounded border border-gold/40 bg-gold/10 text-gold text-[10px] uppercase tracking-widest font-sans hover:bg-gold hover:text-white transition-colors"
            >
              PORTAL ΠΕΛΑΤΩΝ
            </motion.button>
          </nav>

          {/* Mobile Hamburger */}
          <button 
              onClick={toggleMenu}
              className="md:hidden text-marble z-50 focus:outline-none flex flex-col items-center justify-center gap-1 p-2"
              aria-label="Toggle menu"
          >
              <div className="relative w-6 h-4">
                  <motion.span 
                      animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                      className="absolute top-0 left-0 w-full h-[2px] bg-gold origin-center rounded-full"
                  />
                  <motion.span 
                      animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                      className="absolute top-[8px] left-0 w-full h-[2px] bg-gold rounded-full"
                  />
                  <motion.span 
                      animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gold origin-center rounded-full"
                  />
              </div>
              <span className="text-[9px] font-bold tracking-widest text-gold leading-none">MENU</span>
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-50 bg-aegean/98 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
                  onClick={() => setIsMobileMenuOpen(false)}
              >
                  {menuItems.map((item) => (
                      <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-3xl font-serif text-marble hover:text-gold transition-colors tracking-wide font-medium"
                      >
                          {item.label}
                      </a>
                  ))}
                  <button className="mt-8 px-8 py-3 rounded border border-gold text-gold hover:bg-gold hover:text-white transition-colors uppercase tracking-widest text-sm font-sans font-bold">
                      PORTAL ΠΕΛΑΤΩΝ
                  </button>
              </motion.div>
          )}
      </AnimatePresence>
    </>
  );
};
