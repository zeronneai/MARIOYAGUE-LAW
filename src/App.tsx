/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useLanguage } from './context/LanguageContext';
import { 
  Shield, 
  Scale, 
  Gavel, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X,
  ArrowRight,
  CheckCircle2,
  Briefcase
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-burgundy flex items-center justify-center rounded-sm">
             <img 
               src="https://res.cloudinary.com/dsprn0ew4/image/upload/v1773424907/my_law_logo_transparent_gvtvdw.png" 
               alt="MY Law Logo" 
               className="w-9 h-9 object-contain"
               referrerPolicy="no-referrer"
             />
          </div>
          <span className={`text-xl font-serif tracking-tighter transition-colors text-burgundy`}>
            MARIO YAGUE <span className="font-light">LAW</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm uppercase tracking-widest font-medium hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-4 border-l border-burgundy/10 pl-8">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-burgundy/60 hover:text-burgundy transition-colors"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            <a 
              href="#contact" 
              className="bg-burgundy text-beige px-6 py-2.5 text-xs uppercase tracking-widest font-bold hover:bg-burgundy-dark transition-all animate-pulse-white"
            >
              {t.nav.consultation}
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-burgundy/60"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <button className="text-burgundy" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif border-b border-gray-100 pb-2"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#fdfcfb]">
      {/* Video Layer */}
      <div className={`absolute inset-0 transition-all duration-1000 ${videoEnded ? 'z-0' : 'z-20'}`}>
        <video 
          autoPlay 
          muted 
          playsInline
          onEnded={() => setVideoEnded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dsprn0ew4/video/upload/v1773682589/hf_20260316_173029_b6123ab2-7d29-4e7d-92bf-f37414eb4292_x0co70.mp4" type="video/mp4" />
        </video>
        {/* Overlays that appear after video ends to ensure text readability */}
        <div className={`absolute inset-0 bg-gradient-to-b from-[#fdfcfb]/60 via-transparent to-[#fdfcfb]/60 md:bg-gradient-to-r md:from-[#fdfcfb]/40 md:via-transparent md:to-[#fdfcfb]/20 transition-opacity duration-1000 ${videoEnded ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-0 bg-black/30 md:hidden transition-opacity duration-1000 ${videoEnded ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={videoEnded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block bg-gold/10 text-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            {t.hero.badge}
          </span>
          <h1 className="text-burgundy mb-8 tracking-tighter uppercase">
            <span className="block text-4xl md:text-6xl italic font-serif font-light text-gold normal-case mb-2">
              {t.hero.title1}
            </span>
            <span className="block text-8xl md:text-[12rem] font-display leading-none text-white">
              {t.hero.title2}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white md:text-gold max-w-3xl mx-auto mb-12 leading-relaxed font-medium tracking-wide drop-shadow-sm">
            {t.hero.desc}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#contact" className="bg-burgundy text-beige px-8 py-4 rounded-sm flex items-center gap-3 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-xl shadow-burgundy/20 group animate-pulse-white">
              {t.hero.cta1}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="border border-burgundy/20 md:border-gold md:text-gold px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-gold/10 transition-all">
              {t.hero.cta2}
            </a>
          </div>
          
          <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={videoEnded ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              transition={{ duration: 1, delay: 1.5, type: "spring", stiffness: 100 }}
              className="text-center group"
            >
              <p className="text-6xl md:text-7xl font-serif text-white font-bold mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-500">
                15+
              </p>
              <p className="text-sm uppercase tracking-[0.3em] text-white/80 font-light">
                {t.hero.stat1}
              </p>
              <motion.div 
                initial={{ width: 0 }}
                animate={videoEnded ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 2 }}
                className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mt-4"
              />
            </motion.div>

            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={videoEnded ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              transition={{ duration: 1, delay: 1.8, type: "spring", stiffness: 100 }}
              className="text-center group"
            >
              <p className="text-6xl md:text-7xl font-serif text-white font-bold mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-500">
                100%
              </p>
              <p className="text-sm uppercase tracking-[0.3em] text-white/80 font-light">
                {t.hero.stat2}
              </p>
              <motion.div 
                initial={{ width: 0 }}
                animate={videoEnded ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 2.3 }}
                className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mt-4"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t } = useLanguage();
  const services = [
    {
      title: t.services.items[0].title,
      desc: t.services.items[0].desc,
      icon: <Shield className="w-8 h-8" />,
      image: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1773684397/Cinematic_fotorrealista_closeup_photograph_of_the__delpmaspu_ec8mbr.jpg"
    },
    {
      title: t.services.items[1].title,
      desc: t.services.items[1].desc,
      icon: <Scale className="w-8 h-8" />,
      image: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1773684750/Ultrarealistic_gritty_closeup_shot_of_a_highstakes_delpmaspu_jg1vtz.jpg"
    },
    {
      title: t.services.items[2].title,
      desc: t.services.items[2].desc,
      icon: <Users className="w-8 h-8" />,
      image: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1773684750/A_raw_documentarystyle_fotorrealista_photograph_of_delpmaspu_iw2zi3.jpg"
    },
    {
      title: t.services.items[3].title,
      desc: t.services.items[3].desc,
      icon: <Briefcase className="w-8 h-8" />,
      image: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1773684830/A_fotorrealista_powerful_closeup_shot_of_a_handsha_delpmaspu_b79b7j.jpg"
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#fdfcfb] bg-paper-texture relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 relative">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-6xl font-serif font-bold text-burgundy mb-4 tracking-tight relative inline-block"
          >
            {t.services.title}
            {/* Golden drawing line */}
            <motion.div 
              initial={{ width: 0, left: "50%" }}
              whileInView={{ width: "100%", left: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              className="absolute -bottom-2 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_10px_rgba(162,141,110,0.8)]"
            />
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-charcoal/60 max-w-2xl mx-auto mt-6"
          >
            {t.services.desc}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }}
              // Expansion on hover for PC
              whileHover={{ 
                scale: 1.05, 
                zIndex: 20,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              // Expansion on scroll for mobile (using whileInView with a more pronounced scale-up)
              viewport={{ once: false, margin: "-100px" }}
              className="relative aspect-[4/5] md:aspect-[3/5] group cursor-pointer overflow-hidden border border-burgundy/10 bg-black shadow-2xl"
            >
              {/* Background Image for the "Window" */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-burgundy/20 via-transparent to-burgundy/90 z-10" />
              </div>

              {/* Window Frame Effect */}
              <div className="absolute inset-0 border-[12px] border-[#fdfcfb] z-20 pointer-events-none" />
              <div className="absolute inset-[12px] border border-burgundy/5 z-20 pointer-events-none" />
              
              {/* Content Container */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-30">
                <motion.div 
                  className="text-gold mb-4 transform group-hover:-translate-y-2 transition-transform duration-500"
                >
                  {service.icon}
                </motion.div>
                
                <h3 className="text-2xl font-serif text-white mb-3 transition-colors duration-500">
                  {service.title}
                </h3>
                
                <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-700 ease-in-out">
                  <p className="text-sm text-white/90 leading-relaxed mb-6 font-medium">
                    {service.desc}
                  </p>
                  <a href="#contact" className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-2">
                    {t.services.learnMore} <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Glass Reflection Effect */}
              <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-40 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video play blocked:", err));
    }
  }, [isInView]);

  return (
    <section id="about" className="py-24 bg-charcoal text-beige overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-burgundy/10 -skew-x-12 translate-x-32" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: 'url(https://res.cloudinary.com/dsprn0ew4/image/upload/v1773424907/my_law_logo_transparent_gvtvdw.png)' }}
      />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 md:order-1 relative"
        >
          <div className="rounded-sm overflow-hidden shadow-2xl border border-gold/20 bg-black aspect-square md:aspect-auto">
            <video 
              ref={videoRef}
              muted 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/dsprn0ew4/video/upload/v1773684137/hf_20260316_175911_b7461620-37f2-4dc5-a08c-b30e8594cc7d_1_ly88zn.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block">{t.about.badge}</span>
          <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight">
            {t.about.title.split(':')[0]}: <br />
            <span className="text-gold italic font-light">{t.about.title.split(':')[1]}</span>
          </h2>
          <p className="text-beige/70 mb-8 leading-relaxed text-lg">
            {t.about.desc}
          </p>
          
          <div className="space-y-4 mb-10">
            {t.about.list.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium tracking-wide">{item}</span>
              </div>
            ))}
          </div>

          <button className="bg-gold text-charcoal px-10 py-4 font-bold uppercase tracking-widest hover:bg-beige transition-all">
            {t.about.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play();
      // Sequence: Video starts, then content fades in after a short delay
      const timer = setTimeout(() => setShowContent(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section id="contact" ref={sectionRef} className="bg-charcoal lg:bg-[#fdfcfb] relative overflow-hidden">
      {/* Video Container: Relative on mobile (top), Absolute on desktop (background) */}
      <div className="relative lg:absolute lg:inset-0 z-0 h-[350px] lg:h-full">
        <video
          ref={videoRef}
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source src="https://res.cloudinary.com/dsprn0ew4/video/upload/v1773684872/hf_20260316_181202_b4b0a9f5-ec11-4a93-9aaa-fdde00de4eeb_kb252m.mp4" type="video/mp4" />
        </video>
        {/* Overlay: Darker on mobile for readability, lighter on desktop */}
        <div className="absolute inset-0 bg-black/40 lg:bg-[#fdfcfb]/10 z-10" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6 relative z-20 py-16 lg:py-24"
      >
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-5xl font-serif text-white mb-6">{t.contact.title}</h2>
            <p className="text-white/90 mb-10 text-xl leading-relaxed">
              {t.contact.desc}
            </p>
            
            <div className="space-y-10">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-white/20 flex items-center justify-center rounded-full text-white backdrop-blur-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-white/60 font-bold mb-2">{t.contact.call}</p>
                  <a 
                    href="https://wa.me/19154001099?text=Hello%20The%20Bull,%20I%20need%20legal%20advice." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-2xl font-serif text-white hover:text-gold transition-colors"
                  >
                    (915) 400-1099
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-white/20 flex items-center justify-center rounded-full text-white backdrop-blur-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-white/60 font-bold mb-2">{t.contact.email}</p>
                  <a 
                    href="mailto:mario@myr-law.com" 
                    className="text-2xl font-serif text-white hover:text-gold transition-colors"
                  >
                    mario@myr-law.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-white/20 flex items-center justify-center rounded-full text-white backdrop-blur-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-white/60 font-bold mb-2">{t.contact.location}</p>
                  <p className="text-2xl font-serif text-white leading-snug">
                    1521 E. Missouri Ave.<br />
                    El Paso, Texas 79902
                  </p>
                  <div className="mt-6 rounded-sm overflow-hidden border border-white/20 shadow-2xl">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!4v1773437865543!6m8!1m7!1sK68mRS5pkLIjAbNX48fJ_A!2m2!1d31.77054052438731!2d-106.4761808145814!3f3.5237698282924015!4f-5.393087608392349!5f0.7820865974627469" 
                      width="100%" 
                      height="180" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-10 shadow-2xl rounded-sm border-t-4 border-burgundy">
            <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.name}</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder={t.contact.form.placeholderName} />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.phone}</label>
                <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder={t.contact.form.placeholderPhone} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.email}</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder={t.contact.form.placeholderEmail} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.caseType}</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all">
                  {t.contact.form.options.map((opt: string) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.message}</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder={t.contact.form.placeholderMessage}></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-burgundy text-beige py-4 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-lg shadow-burgundy/20">
                  {t.contact.form.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-charcoal text-beige/40 py-16 border-t border-beige/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-burgundy flex items-center justify-center rounded-sm">
                <img 
                  src="https://res.cloudinary.com/dsprn0ew4/image/upload/v1773424907/my_law_logo_transparent_gvtvdw.png" 
                  alt="MY Law Logo" 
                  className="w-7 h-7 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-serif tracking-tighter text-beige">
                MARIO YAGUE <span className="font-light">LAW</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">
              {t.footer.desc}
            </p>
          </div>
          
          <div>
            <h4 className="text-beige text-xs uppercase tracking-widest font-bold mb-6">{t.footer.links}</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#home" className="hover:text-gold transition-colors">{t.nav.home}</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">{t.nav.services}</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">{t.nav.about}</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-beige text-xs uppercase tracking-widest font-bold mb-6">{t.footer.legal}</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">{t.footer.privacy}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t.footer.terms}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t.footer.disclaimer}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-beige/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs uppercase tracking-widest">{t.footer.rights}</p>
          <div className="flex gap-6">
            <div className="w-8 h-8 rounded-full border border-beige/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all cursor-pointer">f</div>
            <div className="w-8 h-8 rounded-full border border-beige/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all cursor-pointer">in</div>
            <div className="w-8 h-8 rounded-full border border-beige/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all cursor-pointer">ig</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Marquee = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-burgundy py-4 overflow-hidden whitespace-nowrap border-y border-gold/20">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex gap-12 items-center"
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-2xl md:text-4xl font-display text-beige uppercase tracking-tighter">
              {t.marquee}
            </span>
            <div className="w-3 h-3 bg-gold rotate-45" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function App() {
  return (
    <div className="selection:bg-gold selection:text-charcoal">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
