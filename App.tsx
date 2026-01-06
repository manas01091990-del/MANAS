
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Scissors, 
  Calendar, 
  Image as ImageIcon, 
  MessageSquare, 
  Users,
  Menu as MenuIcon,
  X,
  MessageCircle,
  Phone
} from 'lucide-react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Book from './pages/Book';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Team from './pages/Team';
import { BRAND_NAME, PHONE_NUMBER } from './constants';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const statuses = [
    "Establishing Connection",
    "Calibrating Aesthetics",
    "Refining Obsidian Base",
    "Polishing Gold Accents",
    "Synchronizing PROSTYLE"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 500);
          setTimeout(onComplete, 1900);
          return 100;
        }
        // Accelerate near the end for a more "snappy" feel
        const step = prev > 80 ? 2 : 1;
        return prev + step;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % statuses.length);
    }, 800);
    return () => clearInterval(statusInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col pointer-events-none">
      {/* Dynamic Background Glow */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ${isExiting ? 'opacity-0' : 'opacity-100'}`} />
      
      {/* Top Shutter */}
      <div className={`flex-1 bg-[#050505] relative z-20 transition-none ${isExiting ? 'preloader-exit-top' : ''}`}>
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
      </div>
      
      {/* Central Content */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center z-30 transition-all duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] ${isExiting ? 'opacity-0 scale-110 blur-2xl translate-y-[-20px]' : 'opacity-100 scale-100'}`}>
        {/* Radial Ambient Glow */}
        <div className="absolute w-[80vw] h-[80vw] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse" />
        
        <div className="space-y-16 text-center w-full max-w-xl px-12 relative z-10">
          <div className="space-y-8">
             <div className="flex items-center justify-center gap-6 overflow-hidden">
               <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
               <span className="text-[#D4AF37] text-[10px] font-bold tracking-[1em] uppercase block animate-in slide-in-from-bottom-2 duration-700">
                 {statuses[statusIndex]}
               </span>
               <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
             </div>
             
             <div className="relative inline-block">
                <h1 className="text-7xl md:text-[10rem] font-serif font-bold gold-text-shimmer tracking-[0.2em] italic transition-all duration-700">
                  {BRAND_NAME}
                </h1>
                {/* Underline Glow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-px bg-[#D4AF37] blur-[2px] opacity-50" />
             </div>
          </div>

          <div className="space-y-8 max-w-sm mx-auto">
            <div className="relative w-full h-[1px] bg-white/5 overflow-hidden rounded-full">
               <div 
                 className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8B735B] via-[#D4AF37] to-[#8B735B] transition-all duration-300 ease-out"
                 style={{ width: `${progress}%` }}
               >
                 {/* Shine effect on the progress bar itself */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-[gold-shimmer_2s_infinite]" />
               </div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.6em] text-white/20 uppercase tabular-nums">
              <span>Calibration</span>
              <span className="text-[#D4AF37]">{progress}%</span>
            </div>
          </div>

          <div className="pt-12 opacity-40">
             <span className="text-white text-[8px] font-bold tracking-[0.8em] uppercase block">
               ESTABLISHED MMXXIV • NEW YORK CITY
             </span>
          </div>
        </div>
      </div>

      {/* Bottom Shutter */}
      <div className={`flex-1 bg-[#050505] relative z-20 transition-none ${isExiting ? 'preloader-exit-bottom' : ''}`}>
        <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
      </div>
    </div>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/menu', label: 'Vault', icon: Scissors },
    { path: '/book', label: 'Reserve', icon: Calendar },
    { path: '/team', label: 'Artists', icon: Users },
    { path: '/reviews', label: 'Voices', icon: MessageSquare },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 md:hidden">
      <nav className="glass border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex justify-around items-center px-4 py-4">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link 
              key={path} 
              to={path} 
              className={`flex flex-col items-center transition-all duration-300 ${isActive ? 'text-[#D4AF37] scale-110' : 'text-gray-500 hover:text-white'}`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className={`text-[8px] font-bold tracking-widest uppercase mt-1 ${isActive ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

const Header = ({ onOpenMenu, isScrolled }: { onOpenMenu: () => void, isScrolled: boolean }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-6 md:px-10 z-40 transition-all duration-500 ${
      isScrolled 
      ? 'bg-black/40 backdrop-blur-xl border-b border-white/5' 
      : 'bg-[#050505] border-b border-transparent'
    }`}>
      <div className="flex items-center gap-4 md:gap-8">
        <button onClick={onOpenMenu} className="group p-2 -ml-2 text-[#F5F5F0] md:hidden">
          <MenuIcon size={24} className="group-hover:text-[#D4AF37] transition-colors" />
        </button>
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-[0.5em] uppercase font-serif gold-text-shimmer drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
          {BRAND_NAME}
        </Link>
      </div>
      
      <div className="flex items-center gap-4 md:gap-12">
        <nav className="hidden md:flex items-center gap-12 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">The Vision</Link>
          <Link to="/menu" className="hover:text-[#D4AF37] transition-colors">The Vault</Link>
          <Link to="/team" className="hover:text-[#D4AF37] transition-colors">Artists</Link>
        </nav>
        
        <Link 
          to="/book" 
          className="px-5 py-2 md:px-8 md:py-3 bg-[#D4AF37] text-black text-[9px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase rounded-full hover:bg-white transition-all shadow-lg active:scale-95 shadow-[#D4AF37]/20"
        >
          Book Appointment
        </Link>
      </div>
    </header>
  );
};

const WhatsAppFloat = () => (
  <a 
    href={`https://wa.me/91${PHONE_NUMBER}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-32 right-8 w-14 h-14 bg-[#D4AF37] text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] z-40 transition-transform active:scale-90 hover:scale-110 md:bottom-12"
  >
    <MessageCircle size={26} />
  </a>
);

const Drawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />
      <div className="absolute top-0 left-0 bottom-0 w-[85%] bg-[#050505] p-12 flex flex-col gap-16 animate-in slide-in-from-left duration-500">
        <div className="flex justify-between items-center border-b border-white/5 pb-8">
          <span className="font-bold tracking-[0.4em] uppercase font-serif gold-text-shimmer text-lg">{BRAND_NAME}</span>
          <button onClick={onClose} className="p-3 bg-white/5 rounded-full text-white"><X size={24} /></button>
        </div>
        <nav className="flex flex-col gap-10">
          {['Home', 'Services', 'Artists', 'Reserve', 'Gallery', 'Contact'].map((item) => (
            <Link 
              key={item} 
              to={item === 'Home' ? '/' : (item === 'Reserve' ? '/book' : (item === 'Artists' ? '/team' : `/${item.toLowerCase()}`))} 
              onClick={onClose} 
              className="text-5xl font-serif italic text-[#F5F5F0] hover:text-[#D4AF37] transition-all hover:translate-x-4 inline-block"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-4 pt-8 border-t border-white/5">
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Global Concierge</p>
          <p className="text-xl text-[#F5F5F0] font-light tracking-tight">{PHONE_NUMBER}</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <div className={`min-h-screen flex flex-col pt-24 bg-[#050505] transition-opacity duration-1000 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <Header onOpenMenu={() => setIsMenuOpen(true)} isScrolled={isScrolled} />
        <Drawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/book" element={<Book />} />
            <Route path="/team" element={<Team />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <BottomNav />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}
