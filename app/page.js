'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Sistema de Asistencia Inteligente 24/7',
      description: 'Automatización de atención al cliente con IA, síntesis de voz y gestión de citas',
      tags: ['Python', 'APIs IA', 'Google Cloud', 'Eleven Labs', 'NLP'],
      image: '/crm-placeholder.jpg',
      impact: '70% reducción en tiempo de respuesta manual',
      details: 'Sistema completo que atiende llamadas automáticamente, gestiona citas y automatiza la atención. Integración con plataformas cloud para automatización de procesos.'
    },
    {
      id: 2,
      title: 'CRM Modular y Escalable',
      description: 'Plataforma de gestión de relaciones empresarial adaptable',
      tags: ['JavaScript', 'React', 'PostgreSQL', 'APIs REST', 'Automatización'],
      image: '/crm-interface.jpg',
      impact: 'Escaló de 0 a 500+ usuarios en 2 años',
      details: 'Arquitectura modular que permite personalización según necesidades. Integración de agentes inteligentes para gestión de reservas y automatización de workflows.'
    },
    {
      id: 3,
      title: 'Estrategia Marketing Digital & Presencia Web',
      description: 'Campañas Google Ads, SEO y presencia digital estratégica',
      tags: ['Google Ads', 'Analytics', 'SEO/SEM', 'Email Marketing'],
      image: '/marketing-dashboard.jpg',
      impact: 'ROI 350% en campañas digitales',
      details: 'Campañas data-driven en plataformas de publicidad. Desarrollo web moderno. Automatización de marketing y análisis de conversiones.'
    }
  ];

  const experience = [
    {
      period: '2023 - Presente',
      role: 'Director de Proyectos | Product Developer',
      company: 'Operador Telecomunicaciones',
      achievements: [
        'Desarrollo integral de sistemas de IA para automatización',
        'Escalabilidad de CRM modular',
        'Liderazgo técnico en innovación',
        'Integración de múltiples APIs y plataformas'
      ]
    },
    {
      period: '2009 - 2022',
      role: 'Especialista en Marketing Digital → Codirector',
      company: 'Distribuidor Telecomunicaciones',
      achievements: [
        'Evolución desde atención al cliente a especialización digital',
        'Campañas Google Ads exitosas',
        'Desarrollo de arquitectura web multi-operador',
        'Gestión de departamento y liderazgo de equipos'
      ]
    }
  ];

  const skills = {
    'IA & APIs': ['OpenAI API', 'Eleven Labs', 'Google Cloud Platform', 'Twilio', 'NLP', 'Integración APIs'],
    'Backend': ['Python', 'Node.js', 'JavaScript', 'PostgreSQL', 'REST APIs'],
    'Frontend': ['React', 'Vue.js', 'CSS', 'Responsive Design'],
    'Marketing': ['Google Ads', 'Analytics', 'Email Marketing', 'SEO/SEM']
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              J.
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {['Sobre mí', 'Proyectos', 'Trayectoria', 'Skills'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contacto"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
              >
                Contacto
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-3">
              {['Sobre mí', 'Proyectos', 'Trayectoria', 'Skills'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="#contacto"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors w-fit"
              >
                Contacto
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          className="opacity-0 animate-fade-in"
          style={{
            animation: `fadeInUp 0.8s ease-out forwards`,
            opacity: Math.max(1 - scrollY / 300, 0)
          }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Construyo
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              sistemas con IA
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Director de Proyectos | Programador | Experto en IA para automatización y escalabilidad. 
            17+ años de experiencia transformando procesos complejos en soluciones inteligentes.
          </p>
          <div className="flex gap-4">
            <a
              href="#proyectos"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              Ver proyectos <ArrowRight size={20} />
            </a>
            <a
              href="#contacto"
              className="px-8 py-3 border border-blue-400 text-blue-400 hover:bg-blue-400/10 rounded-lg font-medium transition-colors"
            >
              Hablar conmigo
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20 flex justify-center">
          <div className="animate-bounce text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Sobre mí */}
      <section id="sobre-mí" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Mi trayectoria</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-300 text-lg mb-6">
              He crecido desde roles de atención al cliente hasta dirección de proyectos complejos. 
              Mi camino me llevó a especialización en marketing digital, desarrollo web, y recientemente, 
              en la integración de sistemas de <strong>Inteligencia Artificial</strong> para automatización 
              y escalabilidad empresarial.
            </p>
            <p className="text-gray-300 text-lg">
              Mi expertise actual: construcción de sistemas IA (OpenAI, Eleven Labs, Google Cloud), 
              desarrollo full-stack, y automatización de procesos que generan impacto real en las organizaciones.
            </p>
          </div>

          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800/80 transition-colors"
              >
                <div className="text-sm text-blue-400 font-medium mb-2">{exp.period}</div>
                <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                <p className="text-gray-400 mb-4">{exp.company}</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Proyectos principales</h2>
        <div className="grid gap-12">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="group grid md:grid-cols-2 gap-8 items-center border border-slate-700 rounded-lg p-8 hover:border-blue-500/50 transition-colors bg-slate-800/30"
            >
              {/* Imagen - Alternando posición */}
              <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg h-80 flex items-center justify-center border border-slate-600 overflow-hidden">
                  {/* Placeholder para imagen */}
                  <div className="text-center text-gray-400">
                    <div className="text-5xl mb-2">📸</div>
                    <p className="text-sm">{project.title}</p>
                    <p className="text-xs text-gray-500 mt-2">Agregar imagen aquí</p>
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                <div className="text-blue-400 text-sm font-medium mb-2">Proyecto {project.id}</div>
                <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="mb-6">
                  <div className="text-sm text-yellow-400 font-medium mb-3">Impacto</div>
                  <p className="text-lg font-semibold text-white">{project.impact}</p>
                </div>

                <p className="text-gray-400 mb-6">{project.details}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Especialidades</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 hover:border-blue-400/50 transition-colors"
            >
              <h3 className="text-lg font-bold text-blue-400 mb-4">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">Vamos a trabajar juntos</h2>
          <p className="text-xl text-gray-300 mb-8">
            Si buscas alguien que entienda la complejidad técnica y el impacto empresarial, 
            hablemos. Estoy disponible para nuevos proyectos, consultoría o roles en empresas 
            innovadoras.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:tu-email@example.com"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center gap-2 transition-colors w-fit text-lg"
            >
              <Mail size={20} /> Enviar email
            </a>

            <div className="flex gap-4">
              <a href="#" className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2026 Joseba. Programador | Experto en IA | Director de Proyectos</p>
          <p className="mt-2">Bilbao, País Vasco</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}
