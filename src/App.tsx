/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Menu, 
  X, 
  Star, 
  Quote, 
  Diamond,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  Users,
  Clock,
  Sparkles
} from 'lucide-react';

// --- Types ---
interface Treatment {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('clickable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <motion.div 
        className="cursor-dot"
        animate={{ 
          x: position.x - 4, 
          y: position.y - 4,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.5 }}
      />
      <motion.div 
        className="cursor-outline"
        animate={{ 
          x: position.x - 20, 
          y: position.y - 20,
          scale: isHovering ? 2 : 1,
          borderColor: isHovering ? 'rgba(0, 102, 204, 0.8)' : 'rgba(0, 51, 102, 0.5)'
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.8 }}
      />
    </>
  );
};

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/5511999999999"
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-8 right-8 z-50 p-4 bg-primary rounded-full shadow-2xl text-white flex items-center justify-center hover:bg-accent transition-colors group"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1 }}
  >
    <Phone size={24} className="group-hover:rotate-12 transition-transform" />
    <span className="absolute right-full mr-4 bg-white px-4 py-2 rounded-lg text-dark text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
      Fale Conosco agora
    </span>
  </motion.a>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Tratamentos', href: '#tratamentos' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-4 border-b border-primary/10 shadow-2xl' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 border-2 border-primary flex items-center justify-center text-primary font-serif text-2xl font-bold group-hover:bg-primary group-hover:text-white transition-all">
            AM
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-serif font-bold tracking-widest transition-colors ${isScrolled ? 'text-text-dark' : 'text-primary'}`}>DRA. ALESSANDRA</span>
            <span className="text-[10px] tracking-[0.3em] text-accent uppercase -mt-1 font-medium">Odontologia Estética</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm tracking-widest transition-colors font-medium uppercase ${isScrolled ? 'text-text-muted hover:text-primary' : 'text-primary/80 hover:text-primary'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contato" 
            className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all text-xs tracking-widest uppercase font-bold rounded-lg"
          >
            Agendar Consulta
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark border-b border-white/10 overflow-hidden"
          >
            <div className="p-10 flex flex-col items-center gap-8 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-white text-xl font-serif tracking-widest"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contato" 
                className="w-full py-4 bg-gold text-dark font-bold tracking-widest uppercase rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Agendar Consulta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Grain and Gradients */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-1/4 -left-1/4 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-accent text-sm tracking-[0.5em] uppercase font-bold mb-6">Excelência Clínica em São Paulo</span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[1.1] mb-8">
            <span className="block text-text-dark">Seu melhor</span>
            <span className="block italic text-blue-gradient">Sorriso.</span>
          </h1>
          <p className="text-text-muted text-lg md:text-xl font-garamond max-w-2xl mx-auto mb-12 tracking-wide">
            Transformando vidas através da odontologia estética de alto padrão e tecnologia europeia. Uma experiência única de cuidado e sofisticação.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="#contato"
              className="px-10 py-5 bg-primary text-white font-bold uppercase tracking-widest text-sm w-full sm:w-auto hover:bg-accent transition-all flex items-center justify-center gap-2 shadow-xl rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar Avaliação <ChevronRight size={18} />
            </motion.a>
            <motion.a
              href="#resultados"
              className="px-10 py-5 border border-primary/20 text-primary font-bold uppercase tracking-widest text-sm w-full sm:w-auto hover:border-primary hover:bg-primary/5 transition-all rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Casos Clínicos
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Hero Decorative Elements */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent"></div>
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Sorrisos Transformados', value: 1200, suffix: '+' },
    { label: 'Anos de Experiência', value: 12, suffix: '' },
    { label: 'Satisfação Garantida', value: 98, suffix: '%' },
    { label: 'Países Atendidos', value: 5, suffix: '+' },
  ];

  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 items-center text-center">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative flex flex-col items-center">
              <div className="flex items-center text-white font-serif text-5xl md:text-6xl font-bold mb-2">
                <Counter target={stat.value} />
                <span>{stat.suffix}</span>
              </div>
              <span className="text-white/70 text-xs tracking-[0.2em] font-bold uppercase">{stat.label}</span>
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2">
                  <Diamond size={12} className="text-white/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Counter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView.current) {
        isInView.current = true;
        let start = 0;
        const duration = 2000;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [target]);

  return <span ref={ref}>{count}</span>;
};

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
        <span className="text-[20vw] font-serif font-bold text-primary select-none">AM</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative order-2 md:order-1"
        >
          <div className="relative z-10 p-4 border border-primary/30">
            <img 
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800" 
              alt="Dra. Alessandra Martini" 
              className="w-full grayscale h-[600px] object-cover hover:grayscale-0 transition-all duration-700" 
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-primary/20 -z-10"></div>
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/10 -z-10 blur-xl"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-primary"></div>
            <span className="text-primary tracking-[0.5em] text-xs uppercase font-bold">A Especialista</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-text-dark leading-tight">
            Ciência, Arte e <br />
            <span className="italic text-accent">Exclusividade.</span>
          </h2>
          <div className="space-y-6 text-text-muted font-garamond text-xl leading-relaxed">
            <p>
              Dra. Alessandra Martini é referência nacional em reabilitação oral e estética dental de alta complexidade. Com especializações nas mais renomadas instituições da Europa e EUA, sua abordagem une precisão técnica e um olhar artístico para criar sorrisos únicos.
            </p>
            <p>
              "Não tratamos apenas dentes; transformamos a confiança. Cada sorriso é uma assinatura personalizada, projetada para harmonizar perfeitamente com a personalidade e anatomia de cada paciente."
            </p>
            <p className="font-serif italic text-text-dark">
              — Formada pela USP | Especialista em Lentes de Contato | Master em Harmonização Orofacial
            </p>
          </div>
          
          <button className="mt-12 group flex items-center gap-4 text-primary tracking-widest uppercase font-bold text-sm">
            Ler currículo completo <div className="w-10 h-[1px] bg-primary group-hover:w-16 transition-all"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Treatments = () => {
  const items: Treatment[] = [
    { 
      id: 1, 
      title: 'Lentes de Contato Dental', 
      description: 'Lâminas ultrafinas de cerâmica que corrigem cor, forma e alinhamento com mínima intervenção.',
      icon: <Sparkles size={32} /> 
    },
    { 
      id: 2, 
      title: ' Harmonização Orofacial', 
      description: 'Equilíbrio estético funcional da face através de procedimentos minimamente invasivos.',
      icon: <Users size={32} /> 
    },
    { 
      id: 3, 
      title: 'Implantes Premium', 
      description: 'Tecnologia suíça para reposição dental com estabilidade superior e estética natural.',
      icon: <ShieldCheck size={32} /> 
    },
    { 
      id: 4, 
      title: 'Clareamento Exclusivo', 
      description: 'Protocolos personalizados para um sorriso radiante sem sensibilidade.',
      icon: <Zap size={32} /> 
    },
    { 
      id: 5, 
      title: 'Invisalign Master', 
      description: 'Alinhamento dental discreto e previsível utilizando a melhor tecnologia do mundo.',
      icon: <ShieldCheck size={32} /> 
    },
    { 
      id: 6, 
      title: 'Cuidado VIP', 
      description: 'Ambiente planejado para máxima discrição e conforto em cada etapa do seu tratamento.',
      icon: <Award size={32} /> 
    },
  ];

  return (
    <section id="tratamentos" className="py-24 bg-bg-soft">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary tracking-[0.5em] text-xs uppercase font-bold mb-4 block">Especialidades</span>
          <h2 className="text-4xl md:text-5xl font-serif text-text-dark">Tratamentos <span className="italic text-accent">Assinados.</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 border border-primary/5 bg-white hover:border-primary/30 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-2xl font-serif text-text-dark mb-4">{item.title}</h3>
              <p className="text-text-muted font-garamond text-lg leading-relaxed mb-6">{item.description}</p>
              <a href="#contato" className="flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-primary/60 group-hover:text-primary transition-colors">
                Saiba Mais <ArrowRight size={14} />
              </a>
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -translate-y-12 translate-x-12 blur-2xl group-hover:bg-primary/10 transition-all"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  return (
    <section id="resultados" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary tracking-[0.5em] text-xs uppercase font-bold mb-4 block">Transformações</span>
            <h2 className="text-4xl md:text-5xl font-serif text-text-dark mb-8">Excelência <br /><span className="italic text-accent">comprobatória.</span></h2>
            <p className="text-text-muted font-garamond text-xl leading-relaxed mb-10 max-w-lg">
              Veja a precisão dos nossos resultados. Utilizamos simulação 3D para que você visualize seu novo sorriso antes mesmo de começar.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary font-bold">1</div>
                <p className="text-text-dark font-medium tracking-wide">Lentes de Contato de Porcelana (8 dentes)</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary font-bold">2</div>
                <p className="text-text-dark font-medium tracking-wide">Harmonização para definição de mandíbula</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary font-bold">3</div>
                <p className="text-text-dark font-medium tracking-wide">Clareamento à Laser (Protocolo Exclusive)</p>
              </div>
            </div>
            <button className="mt-12 px-10 py-5 border border-primary text-primary hover:bg-primary hover:text-white transition-all font-bold uppercase tracking-widest text-sm rounded-xl">
              Ver mais no Instagram
            </button>
          </div>

          <div 
            ref={containerRef}
            className="relative h-[600px] w-full cursor-col-resize select-none overflow-hidden border border-primary/10 shadow-2xl rounded-2xl"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
          >
            {/* After Image */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200" 
                alt="Depois" 
                className="w-full h-full object-cover grayscale-0"
              />
              <div className="absolute bottom-6 right-6 bg-primary text-white px-4 py-1 text-xs font-bold uppercase tracking-widest">Depois</div>
            </div>

            {/* Before Image (Masked) */}
            <div 
              className="absolute inset-0 z-10"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200" 
                alt="Antes" 
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute bottom-6 left-6 bg-dark/40 backdrop-blur-md text-white px-4 py-1 text-xs font-bold uppercase tracking-widest">Antes</div>
            </div>

            {/* Divider Line */}
            <div 
              className="absolute top-0 bottom-0 z-20 w-[2px] bg-primary shadow-[0_0_15px_rgba(0,51,102,0.6)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-xl">
                <ChevronRight size={20} className="rotate-180" />
                <ChevronRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ricardo Mendes",
      role: "Empresário",
      text: "O atendimento da Dra. Alessandra é impecável. Ela entendeu exatamente o que eu buscava: um sorriso natural que passasse confiança sem parecer artificial.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Camila Rocha",
      role: "Influenciadora Digital",
      text: "Minha vida mudou depois das lentes de contato. Agora sorrio para as fotos sem medo. A clínica é linda e me senti em um spa durante todo o processo.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Dr. Marcos Vinícius",
      role: "Médico Cirurgião",
      text: "Como profissional da saúde, sou exigente com técnica e biossegurança. A Dra. Alessandra supera todas as expectativas. Resultados fantásticos.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <section id="depoimentos" className="py-24 bg-bg-soft">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary tracking-[0.5em] text-xs uppercase font-bold mb-4 block">Depoimentos</span>
          <h2 className="text-4xl md:text-5xl font-serif text-text-dark">Reconhecimento <span className="italic text-accent">de valor.</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 relative overflow-hidden border border-primary/5 group shadow-sm hover:shadow-xl transition-all"
            >
              <Quote size={60} className="absolute -top-4 -right-4 text-primary/5 group-hover:text-primary/10 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}
              </div>
              <p className="text-text-muted font-garamond text-xl italic leading-relaxed mb-8">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover grayscale" />
                <div>
                  <h4 className="text-text-dark font-bold tracking-wider">{t.name}</h4>
                  <p className="text-accent text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contato" className="bg-primary py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center text-white">
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-10 leading-tight">
          O sorriso perfeito começa com <br />
          <span className="italic">uma conversa.</span>
        </h2>
        <p className="text-white/80 text-xl font-garamond mb-12 max-w-2xl mx-auto font-medium">
          Agende agora sua avaliação premium e descubra como podemos transformar sua imagem e autoconfiança através da odontologia de luxo.
        </p>
        
        <div className="flex flex-col items-center gap-8 text-white">
          <motion.a 
            href="https://wa.me/5511999999999"
            className="px-16 py-8 bg-white text-primary font-bold text-lg uppercase tracking-[0.3em] hover:bg-accent-light transition-all flex items-center gap-4 shadow-2xl rounded-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Falar com a Dra. Alessandra <ArrowRight size={20} />
          </motion.a>
          
          <div className="flex flex-wrap justify-center gap-10 mt-6 text-white font-bold text-sm tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <Mail size={16} /> alessandra@martini.com
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} /> Jardins, São Paulo - SP
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} /> Atendimento Premium Exclusivo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 border-2 border-primary flex items-center justify-center text-primary font-serif text-xl font-bold">
                AM
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-serif font-bold text-text-dark">MARTINI</span>
                <span className="text-[8px] tracking-[0.3em] text-accent uppercase -mt-1 font-bold">Odontologia Estética</span>
              </div>
            </div>
            <p className="text-text-muted text-sm font-garamond leading-relaxed">
              Referência em odontologia de luxo, entregando resultados extraordinários com discrição e sofisticação no coração de São Paulo.
            </p>
          </div>

          <div>
            <h4 className="text-text-dark text-xs font-bold tracking-widest uppercase mb-8">Navegação</h4>
            <ul className="space-y-4 text-text-muted text-sm tracking-widest uppercase font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-primary transition-colors">Sobre</a></li>
              <li><a href="#tratamentos" className="hover:text-primary transition-colors">Tratamentos</a></li>
              <li><a href="#resultados" className="hover:text-primary transition-colors">Casos Clínicos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-dark text-xs font-bold tracking-widest uppercase mb-8">Contato</h4>
            <ul className="space-y-4 text-text-muted text-sm tracking-widest uppercase font-medium">
              <li className="flex items-center gap-2"><Phone size={14} className="text-primary" /> (11) 99999-9999</li>
              <li className="flex items-center gap-2"><Mail size={14} className="text-primary" /> contato@martiniodontologia.com</li>
              <li className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> Av. Paulista, 2000 - Jardins</li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-dark text-xs font-bold tracking-widest uppercase mb-8">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Mail size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-primary/10">
          <p className="text-text-muted text-[10px] tracking-widest uppercase font-bold">
            © 2025 Dra. Alessandra Martini — Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-[10px] tracking-widest uppercase font-bold text-text-muted">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative">
      <CustomCursor />
      <WhatsAppButton />
      <Header />
      
      <main>
        <Hero />
        <Stats />
        <About />
        <Treatments />
        <BeforeAfterSlider />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
