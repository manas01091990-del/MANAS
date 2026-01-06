import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY } from '../constants';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = ['All', 'Portfolio', 'Interior', 'Team'];

  const filteredGallery = GALLERY.filter(img => 
    activeCategory === 'All' || img.category === activeCategory
  );

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredGallery.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <div className="px-8 md:px-24 py-20 min-h-screen bg-[#050505] animate-in fade-in duration-1000">
      <div className="mb-20 text-center space-y-6">
        <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.6em] uppercase">Visual Archive</span>
        <h1 className="text-7xl md:text-[9rem] font-serif text-[#F5F5F0] leading-none tracking-tighter italic">Spaces.</h1>
      </div>

      <div className="flex gap-10 justify-center mb-20 overflow-x-auto no-scrollbar py-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all whitespace-nowrap ${
              activeCategory === cat ? 'text-[#D4AF37] border-b border-[#D4AF37] pb-2' : 'text-gray-600 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGallery.map((img, idx) => (
          <div 
            key={img.id}
            onClick={() => setSelectedImageIndex(idx)}
            className="group relative aspect-square overflow-hidden rounded-[2.5rem] cursor-pointer bg-[#0A0A0A] border border-white/5"
          >
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
              <Maximize2 className="text-[#D4AF37]" size={32} />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8">
          <button 
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-10 right-10 text-white hover:text-[#D4AF37] z-[110] transition-colors"
          >
            <X size={40} />
          </button>
          
          <button 
            onClick={handlePrev}
            className="absolute left-10 text-white p-4 bg-white/5 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all z-[110]"
          >
            <ChevronLeft size={32} />
          </button>
          
          <img 
            src={filteredGallery[selectedImageIndex].url} 
            alt={filteredGallery[selectedImageIndex].title}
            className="max-w-full max-h-[80vh] object-contain select-none animate-in zoom-in-95 duration-500 rounded-2xl shadow-2xl"
          />

          <button 
            onClick={handleNext}
            className="absolute right-10 text-white p-4 bg-white/5 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all z-[110]"
          >
            <ChevronRight size={32} />
          </button>
          
          <div className="absolute bottom-12 left-0 right-0 text-center text-white space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">
              {filteredGallery[selectedImageIndex].category}
            </p>
            <h3 className="text-3xl font-serif italic text-[#F5F5F0]">
              {filteredGallery[selectedImageIndex].title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;