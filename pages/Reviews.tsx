import React, { useState } from 'react';
import { Star, MessageSquarePlus, X } from 'lucide-react';
import { REVIEWS } from '../constants';

const Reviews = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, content: '', author: '' });

  return (
    <div className="px-8 md:px-24 py-20 min-h-screen bg-[#050505] animate-in slide-in-from-bottom-10 duration-700">
      <div className="mb-24 text-center space-y-6">
        <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.6em] uppercase">Voices of Excellence</span>
        <h1 className="text-7xl md:text-[9rem] font-serif text-[#F5F5F0] leading-none tracking-tighter italic">Vibrations.</h1>
        
        <div className="mt-12 flex flex-col items-center">
          <div className="flex gap-2 text-[#D4AF37]">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} fill="currentColor" />)}
          </div>
          <p className="text-lg font-light text-[#F5F5F0] mt-4 italic">4.9 Overall Alchemy</p>
          <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">Across 248 Bespoke Sessions</p>
        </div>
      </div>

      <div className="flex flex-col gap-10 max-w-4xl mx-auto">
        {REVIEWS.map(review => (
          <div key={review.id} className="bg-[#0A0A0A] p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[#D4AF37]/20 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-2xl font-serif italic text-[#F5F5F0]">{review.author}</h4>
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-1 text-[#D4AF37]">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
            </div>
            <p className="text-[#F5F5F0]/70 text-lg font-light leading-relaxed italic">
              "{review.content}"
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        {!isFormOpen ? (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black text-[10px] font-bold tracking-[0.4em] uppercase rounded-full shadow-2xl hover:bg-[#D4AF37] transition-all"
          >
            <MessageSquarePlus size={18} /> Add Your Frequency
          </button>
        ) : (
          <div className="bg-[#0A0A0A] p-12 md:p-20 rounded-[3rem] border border-white/5 animate-in fade-in zoom-in-95 duration-500 text-left max-w-2xl mx-auto relative overflow-hidden">
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-8 right-8 text-gray-500 hover:text-white"
            >
              <X size={24} />
            </button>
            <h3 className="text-4xl font-serif italic text-white mb-10">Contribute Voice</h3>
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Identity</label>
                <input 
                  type="text" 
                  className="w-full p-6 bg-white/5 border border-white/5 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#D4AF37]/50 font-light"
                  placeholder="How should we record you?"
                  value={newReview.author}
                  onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Intensity</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(r => (
                    <button 
                      key={r}
                      onClick={() => setNewReview({...newReview, rating: r})}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        newReview.rating >= r ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-gray-500'
                      }`}
                    >
                      <Star size={20} fill={newReview.rating >= r ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Narrative</label>
                <textarea 
                  rows={4}
                  className="w-full p-6 bg-white/5 border border-white/5 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#D4AF37]/50 font-light"
                  placeholder="Describe your evolution at PROSTYLE..."
                  value={newReview.content}
                  onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                />
              </div>
              <div className="flex gap-6 pt-4">
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-5 bg-white/5 text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:text-white transition-colors"
                >
                  Discard
                </button>
                <button 
                  className="flex-1 py-5 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-full shadow-xl hover:bg-white transition-all"
                  onClick={() => setIsFormOpen(false)}
                >
                  Transmit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;