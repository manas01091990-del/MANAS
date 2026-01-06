
import React from 'react';
import { Phone, MapPin, Mail, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { ADDRESS, PHONE_NUMBER, BRAND_NAME } from '../constants';

const Contact = () => {
  return (
    <div className="px-8 md:px-24 py-20 min-h-screen bg-[#050505] animate-in fade-in duration-1000">
      <div className="mb-20 text-center space-y-6">
        <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.6em] uppercase">Connect</span>
        <h1 className="text-7xl md:text-9rem font-serif text-[#F5F5F0] leading-none tracking-tighter italic">Contact.</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start max-w-7xl mx-auto">
        <div className="space-y-16">
          <div className="space-y-10">
            <h2 className="text-4xl font-serif text-[#F5F5F0] italic">The Atelier</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#D4AF37] shrink-0 border border-white/5">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Location</p>
                  <p className="text-lg font-light text-[#F5F5F0] leading-relaxed">{ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#D4AF37] shrink-0 border border-white/5">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Concierge</p>
                  <p className="text-lg font-light text-[#F5F5F0] leading-relaxed">+91 {PHONE_NUMBER}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#D4AF37] shrink-0 border border-white/5">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Operations</p>
                  <div className="text-lg font-light text-[#F5F5F0] space-y-2">
                    <p>Mon - Fri: 09:00 - 20:00</p>
                    <p>Sat - Sun: 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Digital Narrative</h2>
            <div className="flex gap-6">
              <a href="#" className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-[#F5F5F0] hover:bg-[#D4AF37] hover:text-black transition-all border border-white/5 shadow-xl">
                <Instagram size={28} />
              </a>
              <a href={`https://wa.me/91${PHONE_NUMBER}`} className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-[#D4AF37] hover:bg-white hover:text-black transition-all border border-white/5 shadow-xl">
                <MessageCircle size={28} />
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="rounded-[3rem] overflow-hidden border border-white/5 h-[500px] shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-1000">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1715456345678!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
              allowFullScreen 
              loading="lazy"
            />
          </div>
          <div className="bg-[#D4AF37] text-black p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
            <h3 className="text-2xl font-serif italic mb-6">Concierge Inquiries</h3>
            <p className="text-sm leading-relaxed mb-8 font-medium">
              For event bookings or VIP membership inquiries, connect directly with our studio manager.
            </p>
            <a 
              href={`https://wa.me/91${PHONE_NUMBER}`}
              className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] border-b-2 border-black pb-1 hover:pb-2 transition-all"
            >
              Start Direct Chat <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
