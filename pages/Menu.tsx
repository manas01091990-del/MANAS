
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, X, ArrowUpRight, Clock, ChevronRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { Service, ServiceCategory } from '../types';

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const categories: (ServiceCategory | 'All')[] = ['All', 'Haircut', 'Coloring', 'Styling', 'Treatment', 'Grooming'];

  const filteredServices = useMemo(() => {
    return SERVICES.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="px-8 md:px-24 py-20 min-h-screen bg-[#050505] animate-in slide-in-from-bottom-10 duration-700">
      <div className="mb-32 space-y-6 text-center max-w-4xl mx-auto">
        <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.6em] uppercase">Service Catalog</span>
        <h1 className="text-7xl md:text-[9rem] font-serif text-[#F5F5F0] leading-none tracking-tighter italic">
          The Vault.
        </h1>
        <p className="text-gray-500 font-light text-lg">A curated menu of transformation. Select your desired evolution.</p>
      </div>

      {/* Luxury Filter Bar */}
      <div className="sticky top-28 z-30 mb-20 space-y-8 max-w-3xl mx-auto">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by collection..."
            className="w-full pl-16 pr-8 py-7 bg-[#0A0A0A] border border-white/5 rounded-full text-[#F5F5F0] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 transition-all font-light"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4 justify-center overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-10 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap border ${
                selectedCategory === cat 
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]' 
                : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* The List Layout */}
      <div className="space-y-px">
        {filteredServices.map(service => (
          <div 
            key={service.id}
            onClick={() => setSelectedService(service)}
            className="group relative block py-20 border-b border-white/5 hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-10"
          >
            <div className="flex items-center gap-10 md:gap-20">
               <span className="text-xs font-bold text-gray-700 font-serif italic">Exclusive</span>
               <div className="space-y-2">
                 <h2 className="text-4xl md:text-7xl font-serif text-white group-hover:italic group-hover:translate-x-4 transition-all duration-500">{service.name}</h2>
                 <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] opacity-60">{service.category}</p>
               </div>
            </div>

            <div className="flex items-center gap-12 self-end md:self-auto">
               <div className="text-right">
                  <p className="text-2xl font-light text-gray-400 font-serif italic">₹{service.price}</p>
                  <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">{service.duration}</p>
               </div>
               <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                  <ArrowUpRight size={24} />
               </div>
            </div>

            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-[#D4AF37]/5 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Editorial Side Drawer / Bottom Sheet */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-700 ${selectedService ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedService(null)} />
        
        <div 
          className={`absolute right-0 bottom-0 top-0 w-full md:w-[600px] lg:w-[700px] bg-[#050505] border-l border-white/10 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col shadow-[-50px_0_100px_rgba(0,0,0,0.8)] ${selectedService ? 'translate-x-0 translate-y-0' : 'translate-x-full md:translate-x-full translate-y-full md:translate-y-0'}`}
        >
          {selectedService && (
            <>
              {/* Header */}
              <div className="absolute top-8 right-8 z-20 flex gap-4">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="w-14 h-14 bg-white/5 text-white rounded-full flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all active:scale-90"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cinematic Image Frame */}
              <div className="h-[40vh] md:h-[50vh] w-full relative overflow-hidden shrink-0">
                <img 
                  src={selectedService.image} 
                  className="w-full h-full object-cover grayscale transition-all duration-[2s] hover:grayscale-0 hover:scale-110" 
                  alt={selectedService.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-[#D4AF37] mb-2 block">{selectedService.category} Collection</span>
                  <h2 className="text-5xl md:text-7xl font-serif text-white italic leading-none">{selectedService.name}</h2>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-10 md:p-16 space-y-12 no-scrollbar">
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-white/5 pb-8">
                    <div className="flex items-center gap-4 text-gray-500">
                      <Clock size={18} className="text-[#D4AF37]" />
                      <span className="text-[11px] font-bold uppercase tracking-widest">{selectedService.duration} Session</span>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-serif text-[#F5F5F0] italic">₹{selectedService.price}</p>
                      <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Base Investment</p>
                    </div>
                  </div>

                  <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed font-serif italic">
                    {selectedService.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 flex flex-col justify-between gap-4">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Service Highlights</p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-xs text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Architectural precision
                      </li>
                      <li className="flex items-center gap-3 text-xs text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Obsidian mineral wash
                      </li>
                      <li className="flex items-center gap-3 text-xs text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Signature finish
                      </li>
                    </ul>
                  </div>
                  <div className="p-8 bg-[#D4AF37]/5 rounded-[2rem] border border-[#D4AF37]/10 flex flex-col justify-between gap-4">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">Availability</p>
                    <p className="text-xs text-[#D4AF37]/80 leading-relaxed">
                      This collection is currently in high demand. We recommend reserving at least 48 hours in advance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Action */}
              <div className="p-8 md:p-12 border-t border-white/5 bg-[#050505] mt-auto">
                <Link 
                  to={`/book?service=${selectedService.id}`}
                  className="group w-full py-8 bg-[#D4AF37] text-black rounded-full text-[11px] font-bold tracking-[0.5em] uppercase flex items-center justify-center gap-6 shadow-2xl hover:bg-white transition-all active:scale-95"
                >
                  Add to Reservation <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="w-full mt-4 py-4 text-gray-600 hover:text-white text-[9px] font-bold tracking-[0.4em] uppercase transition-all"
                >
                  Return to Archive
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
