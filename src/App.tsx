/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
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
  Briefcase,
  Instagram,
  MessageCircle,
  Clock,
  Lock,
  DollarSign,
  Stethoscope,
  FileCheck,
  ClipboardList,
  GraduationCap,
  Award,
  Languages
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
          <div className="w-16 h-16 flex items-center justify-center">
             <img 
               src="https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto/v1774036245/TORO_wiossl.png" 
               alt="MY Law Logo" 
               className={`w-14 h-14 object-contain transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`}
               referrerPolicy="no-referrer"
             />
          </div>
          <span className={`text-xl font-serif tracking-tighter transition-colors ${isScrolled ? 'text-burgundy' : 'text-white'}`}>
            MARIO YAGUE <span className="font-light">LAW</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm uppercase tracking-widest font-medium hover:text-gold transition-colors ${isScrolled ? 'text-burgundy' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-4 border-l border-burgundy/10 pl-8">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${isScrolled ? 'text-burgundy/60 hover:text-burgundy' : 'text-white/60 hover:text-white'}`}
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
            className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isScrolled ? 'text-burgundy/60' : 'text-white/60'}`}
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <button className={`${isScrolled ? 'text-burgundy' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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

const Hero = ({ startAnimation }: { startAnimation: boolean }) => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();

  const xLeft = useTransform(scrollY, [0, 500], [0, -800]);
  const xRight = useTransform(scrollY, [0, 500], [0, 800]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.85]);

  return (
    <section id="home" className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden bg-[#fdfcfb]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto/v1775165505/genera_esa_misma_202604021530_cqegpo.jpg"
          alt="Legal Excellence"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Strong gradient: fades image toward bottom where text lives */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        {/* Subtle blur vignette on the bottom half to reduce noise behind CTAs */}
        <div className="absolute inset-x-0 bottom-0 h-2/3" style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)', maskImage: 'linear-gradient(to top, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          style={{ opacity, scale }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 backdrop-blur-sm px-5 py-2 mb-8 rounded-sm"
          >
            <span className="text-gold font-bold text-xs uppercase tracking-[0.3em]">{t.hero.badge}</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-white mb-6 tracking-tighter uppercase overflow-hidden">
            <motion.span
              style={{ x: xLeft }}
              className="block text-6xl md:text-9xl italic font-serif font-light text-gold normal-case mb-2"
            >
              {t.hero.title1}
            </motion.span>
            <motion.span
              style={{ x: xRight }}
              className="block text-7xl md:text-[13vw] font-display leading-none text-white whitespace-nowrap"
            >
              {t.hero.title2}
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t.hero.desc}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <a
              href="tel:+19154001099"
              className="bg-burgundy text-beige px-8 py-4 rounded-sm flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-xl shadow-burgundy/30 group border border-gold/50 animate-pulse-gold"
            >
              <Phone className="w-5 h-5" />
              {t.hero.cta1}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-sm flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              {t.hero.cta2}
            </a>
          </motion.div>

          {/* Urgency line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={startAnimation ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-white/50 text-xs uppercase tracking-widest mb-12"
          >
            {t.hero.urgency}
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.1 }}
            className="grid grid-cols-3 gap-px bg-white/10 rounded-sm overflow-hidden border border-white/10 backdrop-blur-sm max-w-2xl mx-auto"
          >
            {[
              { val: t.hero.stat1Val, label: t.hero.stat1 },
              { val: t.hero.stat2Val, label: t.hero.stat2 },
              { val: t.hero.stat3Val, label: t.hero.stat3 },
            ].map((stat, i) => (
              <div key={i} className="bg-black/20 py-4 px-4 text-center">
                <div className="text-2xl md:text-3xl font-display text-gold leading-none mb-1">{stat.val}</div>
                <div className="text-white/60 text-[10px] uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
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
      icon: <DollarSign className="w-8 h-8" />,
      image: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1775513586/A_hyper-realistic__high-definition_202604061611_crvk12.jpg"
    },
    {
      title: t.services.items[1].title,
      desc: t.services.items[1].desc,
      icon: <Stethoscope className="w-8 h-8" />,
      image: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1775513704/A_hyper-realistic__high-definition_202604061614_bsw0og.jpg"
    },
    {
      title: t.services.items[2].title,
      desc: t.services.items[2].desc,
      icon: <Shield className="w-8 h-8" />,
      image: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1775513616/A_hyper-realistic__high-definition__202604061612_f3edtl.jpg"
    },
    {
      title: t.services.items[3].title,
      desc: t.services.items[3].desc,
      icon: <ClipboardList className="w-8 h-8" />,
      image: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1775513859/ENLACE_A_LA_202604061615_q2gowo.jpg"
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#fdfcfb] bg-paper-texture relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 relative">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-burgundy/10 border border-burgundy/20 px-5 py-2 mb-6 rounded-sm"
          >
            <span className="text-burgundy font-bold text-xs uppercase tracking-[0.3em]">{t.services.badge}</span>
          </motion.div>

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
            className="text-charcoal/60 max-w-2xl mx-auto mt-6 text-lg"
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
                  loading="lazy"
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

const MeetMario = () => {
  const { t } = useLanguage();
  const credentialIcons = [GraduationCap, Scale, Award, Languages];

  return (
    <section id="meet-mario" className="py-24 bg-charcoal text-beige overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: 'url(https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto/v1773424907/my_law_logo_transparent_gvtvdw.png)' }}
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[400px]"
        >
          <div className="aspect-[4/5] rounded-lg overflow-hidden border-2 border-gold/60 shadow-2xl shadow-black/50 bg-black">
            <img
              src="/mario.jpg"
              alt={t.meetMario.photoAlt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative gold accent line */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-gold/40 pointer-events-none" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-5 block">
            {t.meetMario.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-3 leading-tight tracking-tight text-beige">
            {t.meetMario.name}
          </h2>
          <p className="text-gold text-sm uppercase tracking-widest font-bold mb-8">
            {t.meetMario.subtitle}
          </p>

          <p className="text-beige/75 mb-5 leading-relaxed">{t.meetMario.paragraph1}</p>
          <p className="text-beige/75 mb-10 leading-relaxed">{t.meetMario.paragraph2}</p>

          {/* Credentials grid 2x2 */}
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {t.meetMario.credentials.map((c: { title: string; subtitle: string }, i: number) => {
              const Icon = credentialIcons[i];
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 border border-gold/15 bg-white/5 p-4 rounded-sm"
                >
                  <Icon className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-beige font-serif text-base leading-tight mb-1">{c.title}</p>
                    <p className="text-beige/55 text-xs leading-snug">{c.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-burgundy text-beige px-8 py-4 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-xl shadow-burgundy/30 border border-gold/40 animate-pulse-gold rounded-sm"
          >
            <Phone className="w-5 h-5" />
            {t.meetMario.cta}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
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
        style={{ backgroundImage: 'url(https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto/v1773424907/my_law_logo_transparent_gvtvdw.png)' }}
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
              preload="metadata"
              className="w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/dsprn0ew4/video/upload/v1775164758/Mario_Yague_El_Toro_Final_ohedjn.mp4" type="video/mp4" />
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
                <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-sm font-medium tracking-wide">{item}</span>
              </div>
            ))}
          </div>

          <a
            href="tel:+19154001099"
            className="inline-flex items-center gap-3 bg-gold text-charcoal px-8 py-4 font-bold uppercase tracking-widest hover:bg-gold/90 transition-all shadow-xl shadow-gold/20 rounded-sm"
          >
            <Phone className="w-5 h-5" />
            {t.about.cta}
          </a>

        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { language, t } = useLanguage();
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [showContent, setShowContent] = useState(false);
  
  // Form state
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    caseType: '',
    message: ''
  });

  // Initialize caseType when translations are available
  useEffect(() => {
    if (t.contact.form.options && formData.caseType === '') {
      setFormData(prev => ({ ...prev, caseType: t.contact.form.options[0] }));
    }
  }, [t, formData.caseType]);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play();
      // Sequence: Video starts, then content fades in after a short delay
      const timer = setTimeout(() => setShowContent(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/xvzwyvjd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          caseType: t.contact.form.options[0],
          message: ''
        });
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-charcoal lg:bg-[#fdfcfb] relative overflow-hidden">
      {/* Video Container: Relative on mobile (top), Absolute on desktop (background) */}
      <div className="relative lg:absolute lg:inset-0 z-0 h-[350px] lg:h-full">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-90"
        >
          <source src="https://res.cloudinary.com/dsprn0ew4/video/upload/f_auto,q_auto/v1773684872/hf_20260316_181202_b4b0a9f5-ec11-4a93-9aaa-fdde00de4eeb_kb252m.mp4" type="video/mp4" />
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
            <h2 className="text-5xl font-serif text-white mb-4">{t.contact.title}</h2>
            <p className="text-white/90 mb-5 text-lg leading-relaxed">
              {t.contact.desc}
            </p>
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 px-4 py-2 rounded-sm mb-8">
              <Clock className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="text-gold text-xs font-bold uppercase tracking-wider">{t.contact.urgency}</span>
            </div>
            
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
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-charcoal mb-4">
                  {t.contact.form.successTitle || (language === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!')}
                </h3>
                <p className="text-charcoal/60 max-w-md">
                  {t.contact.form.successDesc || (language === 'es' ? 'Gracias por contactarnos. El Toro revisará tu caso personalmente y te contactaremos a la brevedad.' : 'Thank you for contacting us. The Bull will review your case personally and we will contact you shortly.')}
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-burgundy font-bold uppercase tracking-widest hover:underline"
                >
                  {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.name}</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" 
                    placeholder={t.contact.form.placeholderName} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.phone}</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" 
                    placeholder={t.contact.form.placeholderPhone} 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.email}</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" 
                    placeholder={t.contact.form.placeholderEmail} 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.caseType}</label>
                  <select 
                    name="caseType"
                    value={formData.caseType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all"
                  >
                    {t.contact.form.options.map((opt: string) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">{t.contact.form.message}</label>
                  <textarea 
                    name="message"
                    required
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" 
                    placeholder={t.contact.form.placeholderMessage}
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full bg-burgundy text-beige py-5 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-lg shadow-burgundy/20 flex items-center justify-center gap-3 text-sm animate-pulse-gold ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-beige/30 border-t-beige rounded-full animate-spin" />
                        {language === 'es' ? 'Enviando...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        {t.contact.form.submit}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  {/* Privacy assurance */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Lock className="w-3 h-3 text-charcoal/40" />
                    <p className="text-charcoal/40 text-xs">{t.contact.form.privacy}</p>
                  </div>
                  {status === 'error' && (
                    <p className="mt-4 text-red-600 text-sm text-center font-medium">
                      {language === 'es' ? 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.' : 'There was an error sending the message. Please try again.'}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#1A1310] text-beige/70 py-12 md:py-16 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dsprn0ew4/image/upload/f_auto,q_auto/v1774036245/TORO_wiossl.png"
                  alt="MY Law Logo"
                  loading="lazy"
                  className="w-10 h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-serif tracking-tighter text-beige">
                MARIO YAGUE <span className="font-light">LAW</span>
              </span>
            </div>
            <p className="text-gold text-xs uppercase tracking-[0.2em] font-bold mb-4">
              {t.footer.tagline}
            </p>
            <p className="text-beige/80 text-sm leading-relaxed mb-5">
              {t.footer.brandDesc}
            </p>
            <a
              href="https://www.instagram.com/yaguelaw/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-beige/70 hover:text-gold transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>@yaguelaw</span>
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold text-xs uppercase tracking-[0.2em] font-bold mb-5">
              {t.footer.contact}
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="https://www.google.com/maps/place/1521+E+Missouri+Ave,+El+Paso,+TX+79902"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-gold transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">
                    1521 E Missouri Ave
                    <br />
                    El Paso, TX 79902
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+19154001099"
                  className="flex items-center gap-3 hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>(915) 400-1099</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:mario@myr-law.com"
                  className="flex items-center gap-3 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>mario@myr-law.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-gold text-xs uppercase tracking-[0.2em] font-bold mb-5">
              {t.footer.hours}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>{t.footer.hoursWeekdays}</li>
              <li>{t.footer.hoursSaturday}</li>
              <li>{t.footer.hoursSunday}</li>
            </ul>
            <p className="text-gold/80 text-xs italic mt-4">{t.footer.hoursNote}</p>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-gold text-xs uppercase tracking-[0.2em] font-bold mb-5">
              {t.footer.practiceAreas}
            </h4>
            <ul className="space-y-2 text-sm">
              {t.footer.practiceAreaList.map((area: string) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gold/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-beige/60">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.barCard}</p>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-[11px] leading-relaxed text-beige/40">
          <span className="font-bold">{t.footer.disclaimerLabel}:</span> {t.footer.disclaimerText}
        </p>
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

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5000); // Fallback
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden"
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/dsprn0ew4/video/upload/f_auto,q_auto/v1773690403/hf_20260316_194140_afd0f8b3-5ff4-4914-a8f1-7287b2d4b396_cpi2lf.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
};

const FloatingCTA = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-charcoal text-beige text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-sm shadow-xl whitespace-nowrap"
              >
                {t.whatsapp}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href="tel:+19154001099"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="w-16 h-16 bg-burgundy rounded-full flex items-center justify-center shadow-2xl shadow-black/30 hover:scale-110 transition-transform duration-300 animate-pulse-gold border-2 border-gold/40"
            aria-label="Call us"
          >
            <Phone className="w-7 h-7 text-beige" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="selection:bg-gold selection:text-charcoal">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero startAnimation={!isLoading} />
        <Marquee />
        <Services />
        <MeetMario />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
