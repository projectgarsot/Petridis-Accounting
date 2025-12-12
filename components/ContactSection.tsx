
import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../constants';

export const ContactSection: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      
      {/* Form Side */}
      <div className="lg:col-span-3 p-8 md:p-12 text-marble">
        <h3 className="font-serif text-3xl mb-8 text-gold">Στείλτε μας μήνυμα</h3>
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-marble/60 font-semibold">ΟΝΟΜΑ *</label>
                    <input type="text" className="w-full border-b border-white/10 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent placeholder-white/20" placeholder="Το ονοματεπώνυμό σας" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-marble/60 font-semibold">EMAIL *</label>
                    <input type="email" className="w-full border-b border-white/10 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent placeholder-white/20" placeholder="name@example.com" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-marble/60 font-semibold">Γραφείο Προτίμησης</label>
                <select className="w-full border-b border-white/10 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent text-marble [&>option]:text-charcoal">
                    <option>Αθήνα (Κεντρικά)</option>
                    <option>Φιλιατρά (Υποκατάστημα)</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-marble/60 font-semibold">ΜΗΝΥΜΑ</label>
                <textarea rows={4} className="w-full border-b border-white/10 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent resize-none placeholder-white/20" placeholder="Πώς μπορούμε να σας βοηθήσουμε;"></textarea>
            </div>

            <button type="button" className="mt-4 px-8 py-4 bg-gold text-white font-medium text-sm tracking-widest uppercase hover:bg-white hover:text-aegean transition-colors w-full md:w-auto rounded-sm shadow-lg shadow-gold/20">
                ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ
            </button>
        </form>
      </div>

      {/* Info Side */}
      <div className="lg:col-span-2 bg-aegean/80 text-white p-8 md:p-12 flex flex-col justify-between border-l border-white/5">
         <div>
            <h3 className="font-serif text-2xl mb-8 text-gold">Στοιχεία Επικοινωνίας</h3>
            
            <div className="space-y-8">
                {/* Athens Group */}
                <div>
                    <span className="text-xs uppercase tracking-widest text-white/50 block mb-2">ΑΘΗΝΑ</span>
                    <div className="flex flex-col xl:flex-row xl:items-baseline gap-1 xl:gap-3">
                        <p className="font-mono text-lg">{DATA.locations.athens.phone}</p>
                        <span className="hidden xl:inline text-white/20">|</span>
                        <a href={`mailto:${DATA.locations.athens.email}`} className="text-sm hover:text-gold transition-colors text-white/80">{DATA.locations.athens.email}</a>
                    </div>
                </div>

                {/* Filiatra Group */}
                <div>
                    <span className="text-xs uppercase tracking-widest text-white/50 block mb-2">ΦΙΛΙΑΤΡΑ</span>
                    <div className="flex flex-col xl:flex-row xl:items-baseline gap-1 xl:gap-3">
                        <p className="font-mono text-lg">{DATA.locations.filiatra.phone}</p>
                         <span className="hidden xl:inline text-white/20">|</span>
                        <a href={`mailto:${DATA.locations.filiatra.email}`} className="text-sm hover:text-gold transition-colors text-white/80">{DATA.locations.filiatra.email}</a>
                    </div>
                </div>
            </div>
         </div>

         <div className="mt-12 pt-8 border-t border-white/10">
             <p className="text-sm text-white/60 mb-2">Ωράριο Λειτουργίας</p>
             <p className="font-serif text-xl">Δευτέρα - Παρασκευή</p>
             <p className="font-sans opacity-80">09:00 - 17:00</p>
         </div>
      </div>

    </div>
  );
};
