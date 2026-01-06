
import React from 'react';
import { TEAM_MEMBERS } from '../constants';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Team = () => {
  return (
    <div className="px-8 md:px-24 py-20 min-h-screen bg-[#050505] animate-in slide-in-from-bottom-10 duration-700">
      <div className="mb-32 space-y-6 text-center max-w-4xl mx-auto">
        <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.6em] uppercase">The Collective</span>
        <h1 className="text-7xl md:text-[9rem] font-serif text-[#F5F5F0] leading-none tracking-tighter italic">
          The Artisans.
        </h1>
        <p className="text-gray-500 font-light text-lg">Curating the pinnacle of hair design through mastery and vision.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.id} className="group relative">
            {/* Portrait Container with enhanced overflow dynamics */}
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-10 shadow-2xl border border-white/5 group-hover:border-[#D4AF37]/30 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]">
              
              {/* Parallax & Zoom Image */}
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover grayscale scale-100 translate-y-0 group-hover:grayscale-0 group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              
              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-90" />
              
              {/* Animated Text Content within the Frame */}
              <div className="absolute bottom-10 left-10 space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <p className="text-4xl font-serif text-[#F5F5F0] italic group-hover:not-italic transition-all duration-500 tracking-tight">
                  {member.name}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity">
                  {member.title}
                </p>
              </div>
            </div>
            
            {/* Portfolio Description & Specialties */}
            <div className="px-4 space-y-6">
              <p className="text-gray-400 font-light leading-relaxed text-lg">
                {member.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {member.specialties.map(spec => (
                  <span key={spec} className="text-[9px] font-bold uppercase tracking-widest text-[#F5F5F0] bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-[#D4AF37]/20 transition-colors">
                    {spec}
                  </span>
                ))}
              </div>
              <Link 
                to="/book" 
                className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] border-b border-[#D4AF37]/30 pb-2 hover:border-[#D4AF37] transition-all group-hover:translate-x-2"
              >
                Secure Session <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-40 p-20 bg-[#0A0A0A] rounded-[4rem] text-center border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-[100px]" />
        <h2 className="text-4xl md:text-6xl font-serif italic text-[#F5F5F0] mb-8">Elevate Your Career.</h2>
        <p className="text-gray-500 mb-12 max-w-lg mx-auto leading-relaxed font-light">
          We are constantly seeking visionary artists to expand our international collective.
        </p>
        <Link 
          to="/contact" 
          className="px-12 py-5 bg-white text-black text-[10px] font-bold tracking-[0.4em] uppercase rounded-full hover:bg-[#D4AF37] transition-all shadow-xl active:scale-95"
        >
          Join The Collective
        </Link>
      </section>
    </div>
  );
};

export default Team;
