'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const NAV = [
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Skills', href: '#skills' },
];

const projects = [
  {
    id: 1,
    title: 'Sistema de Asistencia Inteligente 24/7',
    description: 'Automatización de atención al cliente con IA, síntesis de voz y gestión de citas',
    tags: ['Python', 'APIs IA', 'Google Cloud', 'Eleven Labs', 'NLP'],
    image: null,
    impact: '70% reducción en tiempo de respuesta manual',
    details:
      'Sistema completo que atiende llamadas automáticamente, gestiona citas y automatiza la atención. Integración con plataformas cloud para automatización de procesos.',
  },
  {
    id: 2,
    title: 'CRM Modular y Escalable',
    description: 'Plataforma de gestión de relaciones empresarial adaptable',
    tags: ['JavaScript', 'React', 'PostgreSQL', 'APIs REST', 'Automatización'],
    image: null,
    impact: 'Arquitectura multi-cliente en producción',
    details:
      'Arquitectura modular que permite personalización según necesidades. Integración de agentes inteligentes para gestión de reservas y automatización de workflows.',
  },
  {
    id: 3,
    title: 'Estrategia Marketing Digital & Presencia Web',
    description: 'Campañas Google Ads, SEO y presencia digital estratégica',
    tags: ['Google Ads', 'Analytics', 'SEO/SEM', 'Email Marketing'],
    image: null,
    impact: 'Captación digital como canal principal de leads',
    details:
      'Campañas data-driven en plataformas de publicidad. Desarrollo web moderno. Automatización de marketing y análisis de conversiones.',
  },
];

const experience = [
  {
    period: '2023 - 2026',
    role: 'Director de Proyectos | Product Developer',
    company: 'Operador de Telecomunicaciones',
    achievements: [
      'Desarrollo integral de sistemas de IA para automatización',
      'Arquitectura de CRM modular multi-cliente',
      'Liderazgo técnico en innovación',
      'Integración de múltiples APIs y plataformas',
    ],
  },
  {
    period: '2009 - 2022',
    role: 'Especialista en Marketing Digital → Codirector',
    company: 'Distribuidor de Telecomunicaciones',
    achievements: [
      'Evolución desde atención al cliente a especialización digital',
      'Gestión de campañas Google Ads',
      'Desarrollo de arquitectura web multi-operador',
      'Gestión de departamento y liderazgo de equipos',
    ],
  },
];

const skills = {
  'IA & APIs': ['APIs de IA', 'Eleven Labs', 'Google Cloud Platform', 'WhatsApp Business API', 'Automatización'],
  Backend: ['PHP', 'JavaScript', 'Node.js', 'PostgreSQL', 'APIs REST'],
  Frontend: ['React', 'HTML / CSS', 'WordPress', 'Diseño responsive'],
  Marketing: ['Google Ads', 'Analytics', 'Email Marketing', 'SEO / SEM'],
};

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      {/* Navegación */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex h-16 items-center justify-between">
            <a
              href="#top"
              className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent"
            >
              J.
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-300 transition-colors hover:text-blue-400"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-700"
              >
                Contacto
              </a>
            </div>

            <button
              type="button"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              className="p-2 md:hidden"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="flex flex-col gap-1 pb-4 md:hidden">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-2 py-3 text-gray-300 transition-colors hover:bg-slate-800 hover:text-blue-400"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="mt-1 w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-700"
              >
                Contacto
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-28 sm:pt-36">
        <div className="animate-fade-in">
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            Construyo
            <span className="mt-1 block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              sistemas con IA
            </span>
          </h1>

          <p className="mb-8 max-w-2xl text-base text-gray-300 sm:text-xl">
            Director de proyectos, programador y especialista en IA aplicada a la automatización de
            procesos. 17 años convirtiendo operativas complejas en sistemas que funcionan solos.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#proyectos"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium transition-colors hover:bg-blue-700 sm:px-8"
            >
              Ver proyectos <ArrowRight size={18} />
            </a>
            <a
              href="#contacto"
              className="rounded-lg border border-blue-400 px-6 py-3 font-medium text-blue-400 transition-colors hover:bg-blue-400/10 sm:px-8"
            >
              Hablar conmigo
            </a>
          </div>
        </div>
      </section>

      {/* Trayectoria */}
      <section id="trayectoria" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:py-20">
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">Mi trayectoria</h2>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="space-y-5">
            <p className="text-base text-gray-300 sm:text-lg">
              He crecido desde la atención al cliente hasta la dirección de proyectos. El camino pasó
              por el marketing digital y el desarrollo web, y ha terminado en la integración de
              sistemas de <strong className="text-white">inteligencia artificial</strong> para
              automatizar y escalar operaciones.
            </p>
            <p className="text-base text-gray-300 sm:text-lg">
              Hoy trabajo en la construcción de asistentes de voz y texto, CRMs a medida y
              automatizaciones que conectan APIs, telefonía y mensajería.
            </p>
          </div>

          <div className="space-y-4">
            {experience.map((exp) => (
              <div
                key={exp.period}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700 sm:p-6"
              >
                <div className="mb-2 text-sm font-medium text-blue-400">{exp.period}</div>
                <h3 className="mb-1 text-lg font-bold sm:text-xl">{exp.role}</h3>
                <p className="mb-4 text-sm text-gray-400">{exp.company}</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  {exp.achievements.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span aria-hidden="true" className="mt-0.5 text-blue-400">
                        →
                      </span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:py-20">
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">Proyectos principales</h2>

        <div className="grid gap-8 sm:gap-12">
          {projects.map((project, idx) => (
            <article
              key={project.id}
              className="grid items-center gap-6 rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-blue-500/40 sm:p-8 md:grid-cols-2 md:gap-8"
            >
              <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="px-4 text-center text-gray-500">
                      <div className="mb-2 text-4xl">📸</div>
                      <p className="text-xs">Imagen pendiente</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                <div className="mb-2 text-sm font-medium text-blue-400">Proyecto {project.id}</div>
                <h3 className="mb-3 text-2xl font-bold leading-tight sm:text-3xl">{project.title}</h3>
                <p className="mb-5 text-gray-300">{project.description}</p>

                <div className="mb-5 rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                  <div className="mb-1 text-xs font-medium uppercase tracking-wide text-amber-400">
                    Impacto
                  </div>
                  <p className="font-semibold text-white">{project.impact}</p>
                </div>

                <p className="mb-5 text-sm text-gray-400">{project.details}</p>

                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:py-20">
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">Especialidades</h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 transition-colors hover:border-blue-400/40 sm:p-6"
            >
              <h3 className="mb-4 text-base font-bold text-blue-400 sm:text-lg">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="mb-5 text-3xl font-bold sm:text-4xl">Vamos a trabajar juntos</h2>
          <p className="mb-8 text-base text-gray-300 sm:text-xl">
            Si buscas a alguien que entienda tanto la parte técnica como el impacto en negocio,
            hablemos. Estoy disponible para nuevos proyectos y para incorporarme a un equipo.
          </p>

          <a
            href="mailto:TU-EMAIL@AQUI.COM"
            className="mb-6 flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-6 py-4 text-base font-medium transition-colors hover:bg-blue-700 sm:px-8 sm:text-lg"
          >
            <Mail size={20} /> Enviar email
          </a>

          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/TU-USUARIO"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg bg-slate-800 p-3 transition-colors hover:bg-slate-700"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/jtellearroyo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-lg bg-slate-800 p-3 transition-colors hover:bg-slate-700"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 px-5 py-10">
        <div className="mx-auto max-w-6xl text-center text-sm text-gray-500">
          <p>© 2026 Joseba · Programador · IA · Dirección de proyectos</p>
          <p className="mt-1">Bilbao, Bizkaia</p>
        </div>
      </footer>
    </div>
  );
}
