
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  User, 
  Scissors, 
  MessageCircle, 
  Copy,
  ChevronLeft,
  ArrowRight,
  Lock,
  Zap,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { SERVICES, PHONE_NUMBER, BRAND_NAME } from '../constants';

const MAX_BOOKINGS_PER_SLOT = 2;

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', 
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', 
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', 
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', 
  '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', 
  '09:00 PM', '09:30 PM', '10:00 PM'
];

const Book = () => {
  const [searchParams] = useSearchParams();
  const initialServiceId = searchParams.get('service');
  
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [step, setStep] = useState<'form' | 'processing' | 'confirm'>('form');
  const [bookingId, setBookingId] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceId: initialServiceId || '',
    date: getTodayDate(),
    time: '',
    notes: ''
  });

  useEffect(() => {
    const syncAndCleanup = () => {
      const saved = localStorage.getItem('prostyle_booked_slots');
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        const today = getTodayDate();
        const validSlots = parsed.filter(slot => {
          const [date] = slot.split('|');
          return date >= today;
        });
        setBookedSlots(validSlots);
        localStorage.setItem('prostyle_booked_slots', JSON.stringify(validSlots));
      }
    };
    syncAndCleanup();
    const interval = setInterval(syncAndCleanup, 60000);
    return () => clearInterval(interval);
  }, []);

  const selectedService = useMemo(() => 
    SERVICES.find(s => s.id === formData.serviceId), 
    [formData.serviceId]
  );

  const generateId = () => {
    return `PS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Luxury wait to simulate secure processing
    setTimeout(() => {
      const slotKey = `${formData.date}|${formData.time}`;
      const updatedBookings = [...bookedSlots, slotKey];
      setBookedSlots(updatedBookings);
      localStorage.setItem('prostyle_booked_slots', JSON.stringify(updatedBookings));

      setBookingId(generateId());
      setStep('confirm');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const handleWhatsAppRedirect = () => {
    const serviceName = selectedService?.name || "Service";
    const message = `RESERVATION REQUEST: ${BRAND_NAME}
-------------------------
ID: ${bookingId}
CLIENT: ${formData.name}
PHONE: ${formData.phone}
SERVICE: ${serviceName}
DATE: ${formData.date}
TIME: ${formData.time}
NOTES: ${formData.notes || 'None'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/91${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const getBookingCount = (time: string) => {
    const slotKey = `${formData.date}|${time}`;
    return bookedSlots.filter(s => s === slotKey).length;
  };

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-8 animate-in fade-in duration-500">
        <div className="relative mb-8">
           <Loader2 className="text-[#D4AF37] animate-spin" size={64} strokeWidth={1} />
           <ShieldCheck className="absolute inset-0 m-auto text-white/20" size={24} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4AF37] animate-pulse">Securing Atelier Slot</p>
        <h2 className="text-3xl font-serif italic text-white mt-4">Verifying Availability...</h2>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="px-8 py-20 max-w-2xl mx-auto min-h-screen bg-[#050505] animate-in zoom-in-95 duration-700">
        <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,1)]">
          <div className="bg-gradient-to-br from-[#D4AF37] to-[#8B735B] p-12 text-black text-center space-y-4">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-2 shadow-2xl">
              <CheckCircle size={40} className="text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="text-4xl font-serif italic font-bold">Slot Secured.</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80 mt-2">Reservation code generated</p>
            </div>
          </div>

          <div className="p-10 md:p-14 space-y-12">
            <div className="text-center space-y-4 pb-10 border-b border-white/5">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-600">Private Booking ID</p>
              <div className="flex items-center justify-center gap-6">
                <span className="text-5xl font-serif text-[#F5F5F0] tracking-widest gold-text-shimmer">{bookingId}</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(bookingId);
                    // Could add a toast here
                  }}
                  className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-white/10 transition-all active:scale-90"
                  aria-label="Copy booking ID"
                >
                  <Copy size={20} />
                </button>
              </div>
              <p className="text-[9px] text-gray-500 italic">Save this ID for your arrival at the atelier.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { label: 'Member', value: formData.name },
                { label: 'Selection', value: selectedService?.name },
                { label: 'Timeframe', value: `${formData.date} @ ${formData.time}` },
                { label: 'Total Value', value: `₹${selectedService?.price}`, highlight: true }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-gray-500 uppercase tracking-widest text-[9px] font-bold">{item.label}</span>
                  <span className={`${item.highlight ? 'text-[#D4AF37] font-serif text-2xl italic' : 'text-[#F5F5F0] font-light text-lg'}`}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-6">
              <button 
                onClick={handleWhatsAppRedirect}
                className="w-full py-8 bg-[#D4AF37] text-black rounded-full text-[11px] font-bold tracking-[0.5em] uppercase flex items-center justify-center gap-4 shadow-2xl hover:bg-white hover:scale-[1.02] transition-all active:scale-95"
              >
                Finalize via WhatsApp <MessageCircle size={22} />
              </button>
              
              <button 
                onClick={() => setStep('form')}
                className="w-full py-4 text-gray-600 text-[9px] font-bold tracking-[0.4em] uppercase hover:text-white transition-colors flex items-center justify-center gap-3"
              >
                <ChevronLeft size={14} /> Back to details
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center opacity-30">
          <p className="text-[8px] font-bold tracking-[0.5em] uppercase text-white">Confidential & Secure • {BRAND_NAME}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-20 max-w-6xl mx-auto min-h-screen bg-[#050505] animate-in fade-in duration-1000">
      <div className="mb-20 text-center space-y-6">
        <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.6em] uppercase text-center block">Reservation Desk</span>
        <h1 className="text-7xl md:text-8xl font-serif text-[#F5F5F0] leading-none tracking-tighter italic text-center">Secure Your Session.</h1>
      </div>

      <form onSubmit={handleInitialSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-[#0A0A0A] rounded-[3rem] p-10 md:p-14 border border-white/5 space-y-12 shadow-2xl">
            <h3 className="text-2xl font-serif text-[#F5F5F0] italic flex items-center gap-4">
              <User className="text-[#D4AF37]" size={24} /> Client Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Full Name</label>
                <input 
                  required
                  type="text"
                  className="w-full p-6 bg-white/5 border border-white/5 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#D4AF37]/50 font-light transition-all"
                  placeholder="Alexander Thorne"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Contact Number</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 font-light">+91</span>
                  <input 
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    className="w-full pl-16 pr-6 py-6 bg-white/5 border border-white/5 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#D4AF37]/50 font-light transition-all"
                    placeholder="98106..."
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Service Selection</label>
                <div className="relative">
                  <select 
                    required
                    className="w-full p-6 bg-white/5 border border-white/5 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#D4AF37]/50 appearance-none font-light pr-12 transition-all cursor-pointer"
                    value={formData.serviceId}
                    onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
                  >
                    <option value="" className="bg-[#0A0A0A]">Select Treatment...</option>
                    {SERVICES.map(s => <option key={s.id} value={s.id} className="bg-[#0A0A0A]">{s.name}</option>)}
                  </select>
                  <Scissors className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Preferred Date</label>
                <div className="relative">
                  <input 
                    required
                    type="date"
                    min={getTodayDate()}
                    className="w-full p-6 bg-white/5 border border-white/5 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#D4AF37]/50 font-light transition-all block cursor-pointer [color-scheme:dark]"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value, time: ''})} 
                  />
                  <CalendarIcon className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Special Instructions (Optional)</label>
              <textarea 
                className="w-full p-6 bg-white/5 border border-white/5 rounded-2xl text-white outline-none focus:ring-1 focus:ring-[#D4AF37]/50 font-light transition-all h-32"
                placeholder="Allergies, specific requests, etc."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0A0A0A] rounded-[3rem] p-10 border border-white/5 space-y-8 h-full flex flex-col shadow-2xl">
            <h3 className="text-2xl font-serif text-[#F5F5F0] italic flex items-center gap-4">
              <Clock className="text-[#D4AF37]" size={24} /> Selection
            </h3>
            
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">Available Slots (2 Max)</p>
            
            <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto no-scrollbar pr-2 flex-grow">
              {timeSlots.map((slot) => {
                const count = getBookingCount(slot);
                const isFull = count >= MAX_BOOKINGS_PER_SLOT;
                const isPartiallyFull = count === 1;

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isFull}
                    onClick={() => setFormData({...formData, time: slot})}
                    className={`relative py-5 rounded-2xl text-[10px] font-bold tracking-widest uppercase transition-all border flex items-center justify-center ${
                      isFull 
                        ? 'bg-black/60 text-gray-800 border-white/5 cursor-not-allowed line-through' 
                        : formData.time === slot 
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]' 
                        : isPartiallyFull
                        ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]'
                        : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {isFull && <Lock size={10} className="absolute left-3 top-3 opacity-30" />}
                    {isPartiallyFull && !isFull && formData.time !== slot && (
                      <span className="absolute -top-1 -right-1 bg-white text-black text-[7px] px-1.5 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                        <Zap size={6} fill="black" /> LAST SPOT
                      </span>
                    )}
                    {slot}
                  </button>
                );
              })}
            </div>

            <div className="pt-8 border-t border-white/5 space-y-6 mt-auto">
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Investment</p>
                <p className="text-3xl font-serif italic text-[#D4AF37]">₹{selectedService?.price || '0'}</p>
              </div>
              
              <button 
                type="submit"
                disabled={!formData.name || !formData.phone || !formData.serviceId || !formData.date || !formData.time}
                className="w-full py-7 bg-white text-black rounded-full text-[10px] font-bold tracking-[0.4em] uppercase disabled:opacity-20 flex items-center justify-center gap-4 shadow-xl hover:bg-[#D4AF37] transition-all active:scale-95"
              >
                Review Reservation <ArrowRight size={18} />
              </button>
              
              <p className="text-[9px] text-gray-700 text-center uppercase tracking-[0.2em] leading-relaxed">
                Step 1: Reserve for {formData.date || 'Selected Date'}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Book;
