'use client';

import { useState } from 'react';

const SITES = [
  {
    sector: 'Restaurante',
    brand: 'Sabor & Brasa',
    headline: 'La brasa que reúne a la familia.',
    subheadline: 'Cocina de fuego lento en el centro de Bilbao. Reserva tu mesa en menos de un minuto.',
    cta: 'Reservar mesa',
    nav: ['Carta', 'Reservas', 'Contacto'],
    bg: 'linear-gradient(160deg, #2b1710, #4a2418)',
    accent: '#e0793c',
    icon: 'fork',
  },
  {
    sector: 'Moda',
    brand: 'Atelier Norte',
    headline: 'Prendas con nombre y apellido.',
    subheadline: 'Producción limitada, tejidos naturales y envío en 24h a toda la península.',
    cta: 'Ver colección',
    nav: ['Colección', 'Nosotros', 'Tienda'],
    bg: 'linear-gradient(160deg, #241c22, #3a2530)',
    accent: '#e8a6c0',
    icon: 'hanger',
  },
  {
    sector: 'Peluquería',
    brand: 'Studio Luz',
    headline: 'Tu mejor versión, en una hora.',
    subheadline: 'Color, corte y tratamiento. Pide cita online sin llamar por teléfono.',
    cta: 'Pedir cita',
    nav: ['Servicios', 'Equipo', 'Cita online'],
    bg: 'linear-gradient(160deg, #1c1417, #33191f)',
    accent: '#f2b6c6',
    icon: 'scissors',
  },
  {
    sector: 'Gimnasio',
    brand: 'Pulso Fit',
    headline: 'Entrena como si te fuera la vida en ello.',
    subheadline: 'Sala de musculación, clases dirigidas y planes personalizados desde el primer día.',
    cta: 'Prueba gratis',
    nav: ['Clases', 'Planes', 'Horarios'],
    bg: 'linear-gradient(160deg, #0c0c0c, #1c1c1c)',
    accent: '#c6ff3d',
    icon: 'dumbbell',
  },
  {
    sector: 'Clínica dental',
    brand: 'Sonrisa Bilbao',
    headline: 'Sonríe sin pensarlo dos veces.',
    subheadline: 'Revisión, ortodoncia y estética dental con financiación a medida.',
    cta: 'Pedir cita',
    nav: ['Tratamientos', 'Equipo', 'Financiación'],
    bg: 'linear-gradient(160deg, #0e1f1c, #163832)',
    accent: '#5fe3c0',
    icon: 'tooth',
  },
  {
    sector: 'Inmobiliaria',
    brand: 'Casa Norte',
    headline: 'Tu próxima casa está aquí.',
    subheadline: 'Compra, alquiler y tasación en Bizkaia. Filtra por barrio, precio y metros.',
    cta: 'Ver propiedades',
    nav: ['Comprar', 'Alquilar', 'Tasar'],
    bg: 'linear-gradient(160deg, #0f1a2b, #1a2b45)',
    accent: '#d8c08a',
    icon: 'house',
  },
  {
    sector: 'Arquitectura',
    brand: 'Estudio Lira',
    headline: 'Espacios que se piensan antes de construirse.',
    subheadline: 'Proyectos residenciales y reforma integral, de la idea a la llave en mano.',
    cta: 'Ver proyectos',
    nav: ['Proyectos', 'Estudio', 'Contacto'],
    bg: 'linear-gradient(160deg, #16161a, #26262c)',
    accent: '#cda86a',
    icon: 'building',
  },
  {
    sector: 'Cafetería',
    brand: 'Molino & Grano',
    headline: 'El café que huele desde la puerta.',
    subheadline: 'Tueste propio, repostería de horno y desayunos hasta las 13:00.',
    cta: 'Ver carta',
    nav: ['Carta', 'Historia', 'Ubicación'],
    bg: 'linear-gradient(160deg, #20140d, #3a2417)',
    accent: '#e3b877',
    icon: 'coffee',
  },
];

const ICON_PATHS = {
  fork: (
    <>
      <path d="M6 2v8a2 2 0 0 0 4 0V2" />
      <path d="M8 10v12" />
      <path d="M15 2c-1.2 2-1.2 4.5 0 7s1.2 5-.3 6.4M15 2v14M15 16v6" />
    </>
  ),
  hanger: (
    <>
      <path d="M12 3.5a2 2 0 1 1 2.2 2c-.7.6-.7 1.6 0 2.2l7.3 5.3a1 1 0 0 1-.6 1.8H3.1a1 1 0 0 1-.6-1.8l7.3-5.3" />
      <path d="M4 21h16" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <path d="M20.5 4 7.8 12 20.5 20" />
      <path d="M7.8 12 4 9.5" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M4 9.5v5M2 10.5v3M7 6.5v11M17 6.5v11M20 10.5v3M22 9.5v5M7 12h10" />
    </>
  ),
  tooth: (
    <path d="M12 3c-2.6 0-4.7 1.6-5.2 3.7-.6 2.4.2 4.2.6 6.4.3 1.8.5 4.2 2 4.5 1.4.3 1.2-2.1 2.6-2.1s1.1 2.4 2.6 2.1c1.5-.3 1.7-2.7 2-4.5.4-2.2 1.2-4 .6-6.4C16.7 4.6 14.6 3 12 3Z" />
  ),
  house: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  building: (
    <>
      <path d="M6 21V6l6-3 6 3v15" />
      <path d="M6 21h12" />
      <path d="M9.5 10h1M13.5 10h1M9.5 14h1M13.5 14h1" />
      <path d="M10 21v-4h4v4" />
    </>
  ),
  coffee: (
    <>
      <path d="M5 9h11a3 3 0 0 1 0 6h-1" />
      <path d="M5 9v7a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4V9" />
      <path d="M5 9V6h9v3" />
    </>
  ),
};

function SiteIcon({ name, size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

function SitePanel({ site, active, onToggle }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={active}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      className={`hover-lift site-panel ${active ? 'site-panel-active' : ''}`}
      style={{ background: site.bg, color: '#fff' }}
    >
      <div className="site-panel-icon-deco" aria-hidden="true">
        <SiteIcon name={site.icon} size={110} />
      </div>

      <div className="site-panel-header">
        <SiteIcon name={site.icon} size={16} />
        <span className="site-panel-label">{site.sector}</span>
      </div>

      <div className="site-panel-body">
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-[15px] font-semibold sm:text-[16px]">{site.brand}</span>
          <div className="hidden gap-4 font-mono text-[10px] uppercase tracking-wide opacity-70 sm:flex">
            {site.nav.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: site.accent }}>
            {site.sector}
          </p>
          <h4 className="mt-2 max-w-[22ch] font-display text-[21px] font-semibold leading-tight sm:text-[25px]">
            {site.headline}
          </h4>
          <p className="mt-2 max-w-[34ch] text-[13px] leading-relaxed opacity-75">{site.subheadline}</p>
          <span
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold"
            style={{ background: site.accent, color: '#171208' }}
          >
            {site.cta}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MiniSites() {
  const [active, setActive] = useState(0);

  return (
    <div className="sites-accordion">
      {SITES.map((site, i) => (
        <SitePanel key={site.sector} site={site} active={active === i} onToggle={() => setActive(active === i ? null : i)} />
      ))}
    </div>
  );
}
