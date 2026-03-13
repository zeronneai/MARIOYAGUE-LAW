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
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#services' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Contacto', href: '#contact' },
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
            Consulta Gratis
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
          className="absolute inset-0 w-full h-full object-cover object-left md:object-right-top"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcfb] via-[#fdfcfb]/50 md:via-[#fdfcfb]/80 to-transparent" />
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
            El Toro de la Gente
          </span>
          <h1 className="text-7xl md:text-9xl font-display leading-[0.85] text-burgundy mb-8 tracking-tighter uppercase">
            Justicia con <br />
            <span className="italic font-light text-gold font-serif normal-case">Fuerza y Honor</span>
          </h1>
          <p className="text-lg text-charcoal/80 max-w-lg mb-10 leading-relaxed">
            Defendemos sus derechos con la tenacidad de un toro. Mario Yague Law es la firma que protege su futuro con excelencia legal y compromiso inquebrantable.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="bg-burgundy text-beige px-8 py-4 rounded-sm flex items-center gap-3 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-xl shadow-burgundy/20 group">
              Hablar con el Toro
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="border border-burgundy/20 px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-burgundy/5 transition-all">
              Nuestros Servicios
            </a>
          </div>
          
          <div className="mt-16 flex items-center gap-8">
            <div>
              <p className="text-3xl font-serif text-burgundy font-bold">15+</p>
              <p className="text-xs uppercase tracking-widest text-charcoal/60">Años de Excelencia</p>
            </div>
            <div className="w-px h-10 bg-burgundy/10" />
            <div>
              <p className="text-3xl font-serif text-burgundy font-bold">100%</p>
              <p className="text-xs uppercase tracking-widest text-charcoal/60">Compromiso</p>
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
      title: 'Lesiones Personales',
      desc: 'Accidentes de auto, caídas y negligencia. Maximizamos su compensación.',
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: 'Defensa Criminal',
      desc: 'Protección agresiva contra cargos estatales y federales.',
      icon: <Scale className="w-8 h-8" />,
    },
    {
      title: 'Derecho Familiar',
      desc: 'Divorcios, custodia y mediación con un enfoque humano y profesional.',
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: 'Derecho Mercantil',
      desc: 'Asesoría estratégica para empresas, contratos y litigios comerciales.',
      icon: <Briefcase className="w-8 h-8" />,
    },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-burgundy mb-4 tracking-tight">Áreas de Práctica</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6" />
          <p className="text-charcoal/60 max-w-2xl mx-auto">
            Ofrecemos soluciones legales integrales con un enfoque en la protección de sus intereses y los de su familia.
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
                Saber más <ChevronRight className="w-3 h-3" />
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
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block">Nuestra Historia</span>
          <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight">
            El Toro de la Gente: <br />
            <span className="text-gold italic font-light">Su Escudo Legal</span>
          </h2>
          <p className="text-beige/70 mb-8 leading-relaxed text-lg">
            En Mario Yague Law, entendemos que cada caso es una batalla por la justicia. Nos apodan "El Toro de la Gente" porque no retrocedemos ante los desafíos. Nuestra firma nació con la misión de brindar una representación legal de élite a nuestra comunidad.
          </p>
          
          <div className="space-y-4 mb-10">
            {[
              'Representación Agresiva y Ética',
              'Atención Personalizada 24/7',
              'Resultados Comprobados en Casos Complejos',
              'Comunicación Transparente en su Idioma'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium tracking-wide">{item}</span>
              </div>
            ))}
          </div>

          <button className="bg-gold text-charcoal px-10 py-4 font-bold uppercase tracking-widest hover:bg-beige transition-all">
            Conozca a Mario Yague
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
            <h2 className="text-4xl font-serif text-burgundy mb-6">Contáctenos</h2>
            <p className="text-charcoal/60 mb-10">
              Estamos listos para escuchar su caso. La primera consulta es totalmente gratuita y confidencial.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-beige/30 flex items-center justify-center rounded-full text-burgundy">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal/40 font-bold mb-1">Llámenos</p>
                  <a 
                    href="https://wa.me/19154001099?text=Hola%20El%20Toro,%20necesito%20asesoría%20legal." 
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
                  <p className="text-xs uppercase tracking-widest text-charcoal/40 font-bold mb-1">Ubicación</p>
                  <p className="text-lg font-serif text-burgundy">
                    1521 E. Missouri Ave.<br />
                    El Paso, Texas 79902
                  </p>
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
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Nombre Completo</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder="Juan Pérez" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Teléfono</label>
                <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder="(555) 000-0000" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder="juan@ejemplo.com" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Tipo de Caso</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all">
                  <option>Lesiones Personales</option>
                  <option>Defensa Criminal</option>
                  <option>Derecho Familiar</option>
                  <option>Derecho Mercantil</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Mensaje</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all" placeholder="Cuéntenos brevemente su situación..."></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-burgundy text-beige py-4 font-bold uppercase tracking-widest hover:bg-burgundy-dark transition-all shadow-lg shadow-burgundy/20">
                  Enviar Mensaje
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
              Firma legal dedicada a la excelencia y la protección de los derechos civiles. El Toro de la Gente está aquí para servirle.
            </p>
          </div>
          
          <div>
            <h4 className="text-beige text-xs uppercase tracking-widest font-bold mb-6">Enlaces</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#home" className="hover:text-gold transition-colors">Inicio</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Servicios</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">Nosotros</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-beige text-xs uppercase tracking-widest font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Descargo</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-beige/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs uppercase tracking-widest">© 2026 Mario Yague Law. Todos los derechos reservados.</p>
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

export default function App() {
  return (
    <div className="selection:bg-gold selection:text-charcoal">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
