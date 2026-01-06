
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Play, Star, ShieldCheck, Sparkles, Loader2, Quote } from 'lucide-react';
import { SERVICES, BRAND_NAME, TEAM_MEMBERS } from '../constants';
import { GoogleGenAI } from "@google/genai";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScroll / totalHeight) * 100;
      
      setScrollProgress(progress);
      setScrollY(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAiConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `You are the Elite Style Concierge for PROSTYLE, a luxury architectural hair salon. 
      Available Services: ${SERVICES.map(s => `${s.name} (Price: ₹${s.price})`).join(', ')}.
      User Request: "${aiInput}"
      Task: Recommend ONE service that fits best. 
      Provide your response in JSON format: 
      { "recommendation": "Service Name", "narrative": "A 2-sentence sophisticated stylist note on why this fits.", "vibe": "3 descriptive words" }`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const result = JSON.parse(response.text || '{}');
      setAiResponse(result);
    } catch (error) {
      console.error("Concierge Error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in duration-1000 bg-[#020202]">
      {/* Cinematic Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] pointer-events-none">
        <div 
          className="h-full bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all duration-150 ease-out relative overflow-hidden"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[gold-shimmer_2s_infinite]" />
        </div>
      </div>

      {/* Hero Section: THE PROSTYLE */}
      <section className="relative h-[100vh] -mt-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            style={{ 
              transform: `scale(${1 + scrollY * 0.0004}) translateY(${scrollY * 0.15}px)`,
              filter: `brightness(${0.6 - scrollY * 0.0003})`
            }}
            alt="Prostyle Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[#020202]" />
        </div>

        <div className="relative h-full flex flex-col justify-center items-center px-8 text-center z-10">
          <div className="space-y-12" style={{ transform: `translateY(${-scrollY * 0.05}px)` }}>
            <div className="inline-flex items-center gap-6 px-8 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 animate-in fade-in zoom-in duration-1000 delay-300">
              <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]" />
              <span className="text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase">Now Accepting Private Commisions</span>
            </div>
            
            <h1 className="text-[12vw] md:text-[10rem] font-serif leading-none tracking-tighter text-[#F5F5F0] mix-blend-difference drop-shadow-2xl uppercase">
              THE <span className="italic gold-text-shimmer">PROSTYLE</span>
            </h1>
            
            <div className="max-w-2xl mx-auto space-y-10">
              <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed opacity-70 italic">
                Architectural hair design and structural grooming rituals for the modern icon.
              </p>
              
              <div className="flex flex-wrap justify-center gap-12 pt-6">
                <Link 
                  to="/book" 
                  className="group relative px-16 py-7 bg-[#D4AF37] text-black text-[10px] font-bold tracking-[0.5em] uppercase rounded-full overflow-hidden transition-all shadow-[0_30px_60px_rgba(212,175,55,0.3)] hover:shadow-[0_40px_80px_rgba(212,175,55,0.5)] active:scale-95"
                >
                  <span className="relative z-10">Reserve Session</span>
                  <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
                <Link 
                  to="/menu" 
                  className="group flex items-center gap-4 text-[10px] font-bold tracking-[0.5em] uppercase text-white/50 hover:text-white transition-all"
                >
                  The Collection
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
            <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-white rotate-90 mb-4">Explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>
      </section>

      {/* The AI Style Concierge */}
      <section className="py-32 px-8 bg-[#020202] relative">
        <div className="max-w-4xl mx-auto">
          <div className="glass p-12 md:p-20 rounded-[4rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] group-hover:bg-[#D4AF37]/20 transition-all duration-1000" />
            
            <div className="relative z-10 space-y-12">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37]">
                  <Sparkles size={28} />
                </div>
                <div>
                  <h3 className="text-3xl font-serif text-white italic">Style Concierge</h3>
                  <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-500 mt-1">AI-Powered Personalized Curation</p>
                </div>
              </div>

              {!aiResponse ? (
                <form onSubmit={handleAiConsultation} className="space-y-8">
                  <p className="text-gray-400 text-lg font-light leading-relaxed">
                    Describe your aesthetic goal, a mood, or an upcoming event. Our intelligence will curate your transformation.
                  </p>
                  <div className="relative">
                    <input 
                      type="text"
                      className="w-full bg-white/5 border-b border-white/10 p-6 text-xl text-white outline-none focus:border-[#D4AF37] transition-all font-serif italic"
                      placeholder="e.g., 'Modern classic for a gallery opening...'"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={isAiLoading || !aiInput.trim()}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-[#D4AF37] hover:text-white transition-colors disabled:opacity-30"
                    >
                      {isAiLoading ? <Loader2 className="animate-spin" /> : <ArrowUpRight size={24} />}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 space-y-10">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4AF37]">{aiResponse.vibe}</span>
                    <h4 className="text-5xl font-serif text-white italic leading-tight">{aiResponse.recommendation}</h4>
                    <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                      "{aiResponse.narrative}"
                    </p>
                  </div>
                  <div className="flex gap-8">
                    <Link 
                      to={`/book?service=${SERVICES.find(s => s.name === aiResponse.recommendation)?.id || ''}`}
                      className="px-10 py-5 bg-[#D4AF37] text-black text-[10px] font-bold tracking-[0.4em] uppercase rounded-full hover:bg-white transition-all"
                    >
                      Accept Recommendation
                    </Link>
                    <button 
                      onClick={() => {setAiResponse(null); setAiInput('');}}
                      className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-500 hover:text-white transition-colors"
                    >
                      Reset Consultant
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee: The Brand Pulse */}
      <div className="py-24 bg-[#050505] overflow-hidden border-y border-white/5">
        <div className="flex animate-marquee whitespace-nowrap text-[6rem] md:text-[10rem] font-serif italic text-white/[0.02] gap-32 select-none uppercase tracking-tighter">
          <span>Structural Precision</span>
          <span>Architectural Alchemy</span>
          <span>Obsidian Rituals</span>
          <span>Structural Precision</span>
          <span>Architectural Alchemy</span>
          <span>Obsidian Rituals</span>
        </div>
      </div>

      {/* The Philosophy: Architecture of Hair */}
      <section className="py-40 px-8 md:px-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[4rem] group border border-white/5 shadow-2xl reveal-up">
            <img 
              src="https://images.unsplash.com/photo-1599351431247-f10b21ce53e1?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale transition-transform duration-[2s] group-hover:scale-105"
              alt="Technique"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-12 left-12 flex gap-4">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                <Play size={18} fill="currentColor" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white self-center">Watch the Ritual</span>
            </div>
          </div>

          <div className="space-y-16 reveal-up">
            <div className="space-y-6">
              <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.6em] uppercase">The Philosophy</span>
              <h2 className="text-6xl md:text-8xl font-serif text-[#F5F5F0] leading-tight tracking-tighter italic">
                The Architecture <br/>of Self.
              </h2>
            </div>
            
            <p className="text-gray-500 text-xl font-light leading-relaxed italic border-l-2 border-[#D4AF37] pl-10 py-2">
              "We approach every silhouette as a structural challenge. It is not about cutting away; it is about revealing the fundamental geometry of your persona."
            </p>

            <div className="grid grid-cols-2 gap-12 pt-8">
              <div className="space-y-4">
                <h4 className="text-white font-serif text-3xl italic">01. Measure</h4>
                <p className="text-gray-600 text-xs font-light leading-relaxed">Analyzing bone structure and growth patterns with surgical intent.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-serif text-3xl italic">02. Sculpt</h4>
                <p className="text-gray-600 text-xs font-light leading-relaxed">Bespoke technical execution using globally refined hand-tools.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-serif text-3xl italic">03. Refine</h4>
                <p className="text-gray-600 text-xs font-light leading-relaxed">Infusing Obsidian mineral treatments for structural integrity.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-serif text-3xl italic">04. Finish</h4>
                <p className="text-gray-600 text-xs font-light leading-relaxed">Setting the silhouette for high-impact longevity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Collections: The List */}
      <section className="px-8 md:px-24 py-40 bg-[#020202]">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
            <div className="space-y-6 reveal-up">
              <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-[#D4AF37]">The Catalog</span>
              <h2 className="text-7xl md:text-[9rem] font-serif text-[#F5F5F0] leading-none tracking-tighter italic">Iconic Collections.</h2>
            </div>
            <div className="md:text-right reveal-up">
              <Link to="/menu" className="inline-flex items-center gap-6 group">
                 <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-500 group-hover:text-white transition-colors">Enter The Vault</span>
                 <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={24} />
                 </div>
              </Link>
            </div>
          </div>

          <div className="space-y-px">
            {SERVICES.slice(0, 3).map((service, idx) => (
              <Link 
                key={service.id} 
                to={`/menu`}
                className="group relative block py-24 border-b border-white/5 hover:border-[#D4AF37] transition-all duration-700 overflow-hidden"
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12 px-4">
                  <div className="flex items-center gap-10 md:gap-20">
                    <span className="text-[10px] font-bold text-[#D4AF37] opacity-20 group-hover:opacity-100 transition-opacity">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-4">
                      <h3 className="text-5xl md:text-8xl font-serif text-[#F5F5F0] group-hover:italic group-hover:translate-x-8 transition-all duration-700 ease-out">
                        {service.name}
                      </h3>
                      <div className="flex gap-6 items-center translate-x-0 group-hover:translate-x-8 transition-all duration-700 delay-75">
                         <p className="text-[9px] font-bold tracking-[0.5em] uppercase text-gray-600 group-hover:text-[#D4AF37]">
                           {service.category} Collection
                         </p>
                         <span className="w-8 h-px bg-white/10" />
                         <p className="text-[9px] font-bold tracking-[0.5em] uppercase text-gray-700">{service.duration}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-12 group-hover:-translate-x-4 transition-transform duration-700">
                    <div className="text-right">
                      <span className="text-3xl font-light text-gray-600 group-hover:text-white transition-colors font-serif italic">₹{service.price}</span>
                      <p className="text-[8px] font-bold text-gray-800 uppercase tracking-widest mt-2">Reserved Investment</p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition-all duration-1000 scale-110 group-hover:scale-100 pointer-events-none blur-3xl group-hover:blur-0">
                  <img src={service.image} className="w-full h-full object-cover grayscale" alt={service.name} />
                  <div className="absolute inset-0 bg-[#020202]/40" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Accreditations */}
      <section className="py-40 border-b border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-3 gap-24">
          <div className="flex flex-col items-center text-center gap-8 group">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-[#D4AF37] border border-white/5 group-hover:border-[#D4AF37]/40 transition-all duration-700">
               <ShieldCheck size={36} strokeWidth={1} />
            </div>
            <div className="space-y-4">
              <h5 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white">Private Sanctuary</h5>
              <p className="text-xs text-gray-500 font-light leading-relaxed max-w-[200px]">Sessions conducted in complete discretion and isolation.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-8 group">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-[#D4AF37] border border-white/5 group-hover:border-[#D4AF37]/40 transition-all duration-700">
               <Star size={36} strokeWidth={1} />
            </div>
            <div className="space-y-4">
              <h5 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white">Global Pedigree</h5>
              <p className="text-xs text-gray-500 font-light leading-relaxed max-w-[200px]">Technicians trained in the ateliers of London, Paris & Milan.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-8 group">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-[#D4AF37] border border-white/5 group-hover:border-[#D4AF37]/40 transition-all duration-700">
               <Quote size={36} strokeWidth={1} />
            </div>
            <div className="space-y-4">
              <h5 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white">Cult Reputation</h5>
              <p className="text-xs text-gray-500 font-light leading-relaxed max-w-[200px]">Over 1,000 architectural transformations documented annually.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-60 bg-[#020202] text-center px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4AF37]/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-16">
          <h2 className="text-7xl md:text-[10rem] font-serif italic text-white leading-none tracking-tighter uppercase">Define the Silhouette.</h2>
          <div className="flex justify-center">
             <Link 
               to="/book" 
               className="group relative px-24 py-10 bg-white text-black text-[12px] font-bold tracking-[0.6em] uppercase rounded-full shadow-2xl hover:bg-[#D4AF37] transition-all"
             >
               Secure Reservation
             </Link>
          </div>
        </div>
      </section>

      {/* Refined Minimalist Footer */}
      <footer className="pt-40 pb-20 px-12 md:px-24 bg-[#020202] border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start gap-24 border-b border-white/5 pb-24">
           <div className="space-y-12">
              <Link to="/" className="text-6xl font-bold tracking-[0.5em] uppercase font-serif hover:gold-text-shimmer transition-all">
                {BRAND_NAME}
              </Link>
              <div className="space-y-6">
                <p className="text-gray-600 max-w-xs text-[10px] font-bold leading-relaxed uppercase tracking-widest">
                  The Architect of Male Aesthetic. <br/> Established MMXXIV • New York.
                </p>
                <div className="flex gap-6 text-[9px] font-bold tracking-widest text-[#D4AF37]">
                   <span className="flex items-center gap-2">
                     <span className="flex h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                     STATUS: NOW BOOKING
                   </span>
                </div>
              </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-3 gap-24">
              <div className="space-y-10">
                <p className="text-[10px] font-bold tracking-[0.6em] uppercase text-gray-700">The Archive</p>
                <nav className="flex flex-col gap-6 text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                  <Link to="/menu" className="hover:text-[#D4AF37] transition-colors">The Vault</Link>
                  <Link to="/team" className="hover:text-[#D4AF37] transition-colors">Artists</Link>
                  <Link to="/gallery" className="hover:text-[#D4AF37] transition-colors">THE PROSTYLE</Link>
                </nav>
              </div>
              <div className="space-y-10">
                <p className="text-[10px] font-bold tracking-[0.6em] uppercase text-gray-700">Channels</p>
                <div className="flex flex-col gap-6 text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
                  <Link to="/contact" className="hover:text-white transition-colors">Concierge</Link>
                </div>
              </div>
              <div className="hidden md:block space-y-10">
                <p className="text-[10px] font-bold tracking-[0.6em] uppercase text-gray-700">Governance</p>
                <div className="flex flex-col gap-6 text-[11px] font-bold tracking-[0.2em] text-gray-800 uppercase">
                  <span>Privacy Charter</span>
                  <span>Service Terms</span>
                </div>
              </div>
           </div>
        </div>
        
        <div className="pt-16 flex flex-col md:flex-row justify-between gap-12 text-[9px] font-bold tracking-[0.6em] uppercase text-gray-800">
           <p>© 2024 {BRAND_NAME}. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-12">
             <span>NEW YORK</span>
             <span>LONDON</span>
             <span>MILAN</span>
             <span>DUBAI</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
