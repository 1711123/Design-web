/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ArrowUpRight, 
  Instagram, 
  Twitter, 
  Github, 
  Mail, 
  Layers, 
  PenTool, 
  Smartphone, 
  Layout, 
  Menu, 
  X 
} from 'lucide-react';

// --- Types ---
type Language = 'en' | 'cn';

interface Project {
  id: number;
  title: Record<Language, string>;
  category: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  tags: string[];
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'cn', label: '中文' },
];

const CONTENT = {
  en: {
    name: 'Aura Design',
    role: 'Product Designer & Visual Artist',
    heroTitle: 'Crafting digital experiences with precision and soul.',
    heroSub: '熠哥工作室，邮箱：3698120470@qq.com',
    nav: {
      work: 'Work',
      about: 'About',
      contact: 'Contact',
    },
    projectsTitle: 'Selected Works',
    footerText: 'Let\'s create something extraordinary together.',
    copy: '© 2026 Aura Design Atelier. All rights reserved.',
  },
  cn: {
    name: '灵动设计',
    role: '产品设计师 & 视觉艺术家',
    heroTitle: '用精准与灵魂打造数字体验。',
    heroSub: '熠哥工作室，邮箱：3698120470@qq.com',
    nav: {
      work: '作品',
      about: '关于',
      contact: '联系',
    },
    projectsTitle: '精选作品',
    footerText: '让我们共同创造非凡。',
    copy: '© 2026 灵动设计工作室。版权所有。',
  },
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: { en: 'Aura Watch Concept', cn: 'Aura 手表概念设计' },
    category: { en: 'Product Design', cn: '产品设计' },
    description: { 
      en: 'A minimalist exploration of timekeeping in the digital age.',
      cn: '数字时代计时工具的极简探索。'
    },
    image: 'https://picsum.photos/seed/watch/1200/800?grayscale',
    tags: ['Industrial', 'Minimalism', 'C4D'],
  },
  {
    id: 2,
    title: { en: 'Sphere Finance App', cn: 'Sphere 金融应用' },
    category: { en: 'UX/UI Design', cn: '交互/界面设计' },
    description: { 
      en: 'Redefining personal banking with a calm, focused interface.',
      cn: '以沉静、专注的界面重新定义个人银行业务。'
    },
    image: 'https://picsum.photos/seed/finance/1200/800?grayscale',
    tags: ['Fintech', 'Mobile', 'iOS'],
  },
  {
    id: 3,
    title: { en: 'Lumina Architecture', cn: 'Lumina 建筑事务所' },
    category: { en: 'Branding', cn: '品牌设计' },
    description: { 
      en: 'A visual identity that echoes the purity of light and space.',
      cn: '呼应光影与空间纯粹性的视觉身份。'
    },
    image: 'https://picsum.photos/seed/arch/1200/800?grayscale',
    tags: ['Identity', 'Logo', 'Print'],
  },
];

// --- Components ---

const Navbar = ({ lang, setLang }: { lang: Language; setLang: (l: Language) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = CONTENT[lang];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter"
        >
          {content.name}
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {Object.entries(content.nav).map(([key, label], index) => (
            <motion.a
              key={key}
              href={`#${key}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-sm font-medium hover:text-white transition-colors text-gray-400"
            >
              {label}
            </motion.a>
          ))}
          
          <div className="h-4 w-px bg-white/20 mx-2" />

          <div className="flex gap-4">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`text-xs font-bold transition-all ${lang === l.code ? 'text-white underline underline-offset-4' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {Object.entries(content.nav).map(([key, label]) => (
                <a 
                  key={key} 
                  href={`#${key}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-display"
                >
                  {label}
                </a>
              ))}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setMobileMenuOpen(false); }}
                    className={`text-sm font-bold ${lang === l.code ? 'text-white' : 'text-gray-500'}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProjectCard = ({ project, lang }: { project: Project; lang: Language; key?: React.Key }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
    >
      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-gray-900 border border-white/5">
        <motion.img 
          src={project.image}
          alt={project.title[lang]}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center"
          >
            <ArrowUpRight size={24} />
          </motion.div>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{project.category[lang]}</p>
          <h3 className="text-2xl font-display font-medium group-hover:text-white transition-colors">{project.title[lang]}</h3>
          <p className="mt-2 text-gray-400 text-sm max-w-md">{project.description[lang]}</p>
        </div>
        <div className="flex gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-1 border border-white/10 rounded-full text-gray-500 font-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const content = CONTENT[lang];

  if (!isLoaded) return <div className="h-screen w-screen bg-black flex items-center justify-center">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="text-white font-display text-4xl"
    >
      AURA
    </motion.div>
  </div>;

  return (
    <div className="font-sans selection:bg-white selection:text-black">
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-2">
              <span className="w-12 h-px bg-gray-800" />
              {content.role}
            </p>
            <h1 className="text-5xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-10 text-gradient max-w-4xl">
              {content.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed mb-12">
              {content.heroSub}
            </p>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a href="#work" className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 text-sm hover:bg-gray-200 transition-colors">
                {content.nav.work} <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">{content.projectsTitle}</h2>
            <div className="hidden md:flex gap-4">
              <PenTool className="text-gray-600" />
              <Layers className="text-gray-600" />
              <Smartphone className="text-gray-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
            
            {/* View All CTA */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center justify-center aspect-[16/10] rounded-2xl border border-dashed border-white/20 group cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="text-center">
                <Layout className="mx-auto mb-4 text-gray-500 group-hover:text-white transition-colors" size={32} />
                <p className="text-lg font-display">View Process Archive</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
             <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl overflow-hidden glass p-4"
             >
                <img 
                  src="https://picsum.photos/seed/portrait/800/800?grayscale" 
                  alt="Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl"
                />
             </motion.div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Design is how it works.</h2>
            <div className="space-y-6 text-xl text-gray-400 font-light leading-relaxed">
              <p>
                Hello, I'm Aura. A multidisciplinary designer obsessed with the intersection of human psychology and digital interfaces.
              </p>
              <p>
                My philosophy is rooted in radical simplicity. I believe that every pixel should serve a purpose, and every interaction should feel natural, like an extension of the human hand.
              </p>
              <p>
                Over the last 8 years, I've partnered with startups and Fortune 500 companies to ship products that matter.
              </p>
            </div>
            
            <div className="mt-12 flex gap-6">
              {[Github, Twitter, Instagram].map((Icon, idx) => (
                <motion.a 
                  key={idx} 
                  href="#" 
                  whileHover={{ y: -5, color: '#fff' }}
                  className="text-gray-500 transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-none">
                {content.footerText}
              </h2>
              <a 
                href="mailto:studio@aura.design" 
                className="text-2xl md:text-4xl font-display underline underline-offset-8 decoration-1 decoration-white/20 hover:decoration-white transition-all flex items-center gap-4 group"
              >
                studio@aura.design
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Explore</p>
                <div className="flex flex-col gap-4 text-sm">
                  <a href="#" className="hover:text-white transition-colors">Archive</a>
                  <a href="#" className="hover:text-white transition-colors">Lab</a>
                  <a href="#" className="hover:text-white transition-colors">Store</a>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Connect</p>
                <div className="flex flex-col gap-4 text-sm">
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-white transition-colors">Dribbble</a>
                  <a href="#" className="hover:text-white transition-colors">Read.cv</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 items-center text-xs text-gray-500 font-bold uppercase tracking-widest">
            <p>{content.copy}</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Imprint</a>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
