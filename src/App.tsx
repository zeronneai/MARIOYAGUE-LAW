/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
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
          <a 
            href="#contact" 
            className="bg-burgundy text-beige px-6 py-2.5 text-xs uppercase tracking-widest font-bold hover:bg-burgundy-dark transition-all"
          >
            Free Consultation
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-burgundy" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
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
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dsprn0ew4/image/upload/v1773430271/Genera_esa_imagen_en_4k_pero_quitale_el_texto_2k_delpmaspu_tqrdvd.png" 
          alt="Branding background" 
          className="absolute inset-0 w-full h-full object-cover object-right md:object-right-top"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcfb] via-[#fdfcfb]/50 md:via-[#fdfcfb]/80 to-transparent hidden md:block" />
        {/* Mobile overlay to ensure readability if needed, but keeping it minimal as requested */}
        <div className="absolute inset-0 bg-black/20 md:hidden" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-left"
        >
          <span className="inline-block bg-gold/10 text-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            The People's Bull
          </span>
          <h1 className="text-burgundy mb-8 tracking-tighter uppercase">
            <span className="block text-4xl md:text-6xl italic font-serif font-light text-gold normal-case mb-2">
              Protecting your future,
            </span>
            <span className="block text-8xl md:text-[12rem] font-display leading-none text-white md:text-burgundy">
              Today
            </span>
          </h1>
          <p className="text-lg text-white md:text-charcoal/80 max-w-lg mb-10 leading-relaxed">
            We defend your rights with the tenacity of a bull. Mario Yague Law is the firm that protects your future with legal excellence and unwavering commitment.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="bg-burgundy text-beige px-8 py-4 rounded-sm flex items-center gap-3 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-xl shadow-burgundy/20 group">
              Speak with the Bull
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="border border-burgundy/20 px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-burgundy/5 transition-all">
              Our Services
            </a>
          </div>
          
          <div className="mt-16 flex items-center gap-8">
            <div>
              <p className="text-3xl font-serif text-burgundy font-bold">15+</p>
              <p className="text-xs uppercase tracking-widest text-charcoal/60">Years of Excellence</p>
            </div>
            <div className="w-px h-10 bg-burgundy/10" />
            <div>
              <p className="text-3xl font-serif text-burgundy font-bold">100%</p>
              <p className="text-xs uppercase tracking-widest text-charcoal/60">Commitment</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Personal Injury',
      desc: 'Car accidents, slips, and negligence. We maximize your compensation.',
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: 'Criminal Defense',
      desc: 'Aggressive protection against state and federal charges.',
      icon: <Scale className="w-8 h-8" />,
    },
    {
      title: 'Family Law',
      desc: 'Divorces, custody, and mediation with a human and professional approach.',
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: 'Business Law',
      desc: 'Strategic advice for companies, contracts, and commercial litigation.',
      icon: <Briefcase className="w-8 h-8" />,
    },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-burgundy mb-4 tracking-tight">Practice Areas</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6" />
          <p className="text-charcoal/60 max-w-2xl mx-auto">
            We offer comprehensive legal solutions with a focus on protecting your and your family's interests.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 border border-gray-100 bg-[#fdfcfb] hover:shadow-2xl hover:shadow-burgundy/5 transition-all duration-500 group"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif text-burgundy mb-4">{service.title}</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
                {service.desc}
              </p>
              <a href="#contact" className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more <ChevronRight className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
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
          className="order-2 md:order-1"
        >
          <img 
            src="https://res.cloudinary.com/dsprn0ew4/image/upload/v1773423686/Coloca_a_la_persona_en_un_fondo_solido_blanco__2k_delpmaspu_tju1kj.jpg" 
            alt="Mario Yague - El Toro de la Gente" 
            className="rounded-sm shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block">Our Story</span>
          <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight">
            The People's Bull: <br />
            <span className="text-gold italic font-light">Your Legal Shield</span>
          </h2>
          <p className="text-beige/70 mb-8 leading-relaxed text-lg">
            At Mario Yague Law, we understand that every case is a battle for justice. We are nicknamed "The People's Bull" because we do not back down from challenges. Our firm was born with the mission of providing elite legal representation to our community.
          </p>
          
          <div className="space-y-4 mb-10">
            {[
              'Aggressive and Ethical Representation',
              '24/7 Personalized Attention',
              'Proven Results in Complex Cases',
              'Transparent Communication in Your Language'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium tracking-wide">{item}</span>
              </div>
            ))}
          </div>

          <button className="bg-gold text-charcoal px-10 py-4 font-bold uppercase tracking-widest hover:bg-beige transition-all">
            Meet Mario Yague
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[#fdfcfb]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h2 className="text-4xl font-serif text-burgundy mb-6">Contact Us</h2>
            <p className="text-charcoal/60 mb-10">
              We are ready to hear your case. The first consultation is completely free and confidential.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-beige/30 flex items-center justify-center rounded-full text-burgundy">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/40 font-bold mb-1">Call Us</p>
                  <a 
                    href="https://wa.me/19154001099?text=Hello%20The%20Bull,%20I%20need%20legal%20advice." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-serif text-burgundy hover:text-gold transition-colors"
                  >
                    (915) 400-1099
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-beige/30 flex items-center justify-center rounded-full text-burgundy">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/40 font-bold mb-1">Email</p>
                  <a 
                    href="mailto:mario@myr-law.com" 
                    className="text-lg font-serif text-burgundy hover:text-gold transition-colors"
                  >
                    mario@myr-law.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-beige/30 flex items-center justify-center rounded-full text-burgundy">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/40 font-bold mb-1">Location</p>
                  <p className="text-lg font-serif text-burgundy">
                    1521 E. Missouri Ave.<br />
                    El Paso, Texas 79902
                  </p>
                  <div className="mt-4 rounded-sm overflow-hidden border border-beige/20 shadow-md">
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
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white p-10 shadow-2xl rounded-sm border-t-4 border-burgundy"
          >
            <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Full Name</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Phone</label>
                <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder="(555) 000-0000" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Case Type</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all">
                  <option>Personal Injury</option>
                  <option>Criminal Defense</option>
                  <option>Family Law</option>
                  <option>Business Law</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder="Briefly tell us about your situation..."></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-burgundy text-beige py-4 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-lg shadow-burgundy/20">
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
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
              Law firm dedicated to excellence and the protection of civil rights. The People's Bull is here to serve you.
            </p>
          </div>
          
          <div>
            <h4 className="text-beige text-xs uppercase tracking-widest font-bold mb-6">Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-beige text-xs uppercase tracking-widest font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-beige/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs uppercase tracking-widest">© 2026 Mario Yague Law. All rights reserved.</p>
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
              No Fees Unless We Win!
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
