'use client';

import { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  8 sitios ficticios, cada uno con un layout de portada distinto     */
/*  para mostrar rango de estilos. Fotos: Unsplash (uso libre).        */
/* ------------------------------------------------------------------ */

const IMG = (id) => `https://images.unsplash.com/photo-${id}?w=1000&q=70&auto=format&fit=crop`;

const SITES = [
  {
    sector: 'Restaurante',
    layout: 'restaurant',
    brand: 'Sabor & Brasa',
    headline: 'La brasa que reúne a la familia.',
    subheadline: 'Cocina de fuego lento en el centro de Bilbao. Reserva tu mesa en menos de un minuto.',
    cta: 'Reservar mesa',
    nav: ['Carta', 'Reservas', 'Contacto'],
    highlights: ['Menú del día', 'Carta de vinos', 'Eventos privados'],
    footer: 'C/ Ejemplo 12, Bilbao · Abierto de 13:00 a 23:30',
    image: IMG('1517248135467-4c7edcad34c4'),
    bg: 'linear-gradient(160deg, #2b1710, #4a2418)',
    accent: '#e0793c',
    ctaText: '#171208',
    icon: 'fork',
  },
  {
    sector: 'Moda',
    layout: 'fashion',
    brand: 'Atelier Norte',
    headline: 'Prendas con nombre y apellido.',
    subheadline: 'Producción limitada, tejidos naturales y envío en 24h a toda la península.',
    cta: 'Ver colección',
    nav: ['Colección', 'Nosotros', 'Tienda'],
    highlights: ['Nueva colección', 'Edición limitada', 'Envío en 24h'],
    footer: 'C/ Ejemplo 8, Bilbao · Lunes a sábado, 10:00–20:00',
    image: IMG('1445205170230-053b83016050'),
    bg: 'linear-gradient(160deg, #201a1e, #2c2128)',
    accent: '#e8a6c0',
    ctaText: '#2c1520',
    icon: 'hanger',
  },
  {
    sector: 'Peluquería',
    layout: 'salon',
    brand: 'Studio Luz',
    headline: 'Tu mejor versión, en una hora.',
    subheadline: 'Color, corte y tratamiento. Pide cita online sin llamar por teléfono.',
    cta: 'Pedir cita',
    nav: ['Servicios', 'Equipo', 'Cita online'],
    highlights: ['Color y mechas', 'Tratamiento capilar', 'Peinados de novia'],
    footer: 'C/ Ejemplo 21, Bilbao · Cita previa online',
    image: IMG('1521590832167-7bcbfaa6381f'),
    bg: 'linear-gradient(160deg, #241a1e, #33212a)',
    accent: '#f2b6c6',
    ctaText: '#2a1720',
    icon: 'scissors',
  },
  {
    sector: 'Gimnasio',
    layout: 'gym',
    brand: 'Pulso Fit',
    headline: 'Entrena como si te fuera la vida en ello.',
    subheadline: 'Sala de musculación, clases dirigidas y planes personalizados desde el primer día.',
    cta: 'Prueba gratis',
    nav: ['Clases', 'Planes', 'Horarios'],
    highlights: ['Sala de musculación', 'Clases dirigidas', 'Entrenador personal'],
    footer: 'Polígono Ejemplo, Bilbao · Abierto 24 horas',
    image: IMG('1534438327276-14e5300c3a48'),
    bg: 'linear-gradient(160deg, #0c0c0c, #1c1c1c)',
    accent: '#c6ff3d',
    ctaText: '#0c0c0c',
    icon: 'dumbbell',
  },
  {
    sector: 'Clínica dental',
    layout: 'dental',
    brand: 'Sonrisa Bilbao',
    headline: 'Sonríe sin pensarlo dos veces.',
    subheadline: 'Revisión, ortodoncia y estética dental con financiación a medida.',
    cta: 'Pedir cita',
    nav: ['Tratamientos', 'Equipo', 'Financiación'],
    highlights: ['Revisión gratuita', 'Ortodoncia invisible', 'Estética dental'],
    footer: 'C/ Ejemplo 5, Bilbao · Financiación sin intereses',
    image: IMG('1606811841689-23dfddce3e95'),
    bg: 'linear-gradient(160deg, #0e1f1c, #163832)',
    accent: '#3fb99b',
    ctaText: '#ffffff',
    icon: 'tooth',
  },
  {
    sector: 'Inmobiliaria',
    layout: 'realestate',
    brand: 'Casa Norte',
    headline: 'Tu próxima casa está aquí.',
    subheadline: 'Compra, alquiler y tasación en Bizkaia.',
    cta: 'Buscar',
    nav: ['Comprar', 'Alquilar', 'Tasar'],
    highlights: ['Pisos en venta', 'Alquiler garantizado', 'Tasación gratuita'],
    footer: 'C/ Ejemplo 30, Bilbao · Respuesta en menos de 24h',
    image: IMG('1600585154340-be6161a56a0c'),
    bg: 'linear-gradient(160deg, #0f1a2b, #1a2b45)',
    accent: '#d8c08a',
    ctaText: '#0f1a2b',
    icon: 'house',
  },
  {
    sector: 'Arquitectura',
    layout: 'architecture',
    brand: 'Estudio Lira',
    headline: 'Espacios que se piensan antes de construirse.',
    subheadline: 'Proyectos residenciales y reforma integral, de la idea a la llave en mano.',
    cta: 'Ver proyectos',
    nav: ['Proyectos', 'Estudio', 'Contacto'],
    highlights: ['Vivienda unifamiliar', 'Reforma integral', 'Interiorismo'],
    footer: 'C/ Ejemplo 14, Bilbao · Primera consulta sin coste',
    image: IMG('1487958449943-2429e8be8625'),
    bg: 'linear-gradient(160deg, #16161a, #26262c)',
    accent: '#cda86a',
    ctaText: '#16161a',
    icon: 'building',
  },
  {
    sector: 'Cafetería',
    layout: 'cafe',
    brand: 'Molino & Grano',
    headline: 'El café que huele desde la puerta.',
    subheadline: 'Tueste propio, repostería de horno y desayunos hasta las 13:00.',
    cta: 'Ver carta',
    nav: ['Carta', 'Historia', 'Ubicación'],
    highlights: ['Tueste propio', 'Repostería artesana', 'Brunch de fin de semana'],
    footer: 'C/ Ejemplo 3, Bilbao · Todos los días, 8:00–20:00',
    image: IMG('1521017432531-fbd92d768814'),
    bg: 'linear-gradient(160deg, #20140d, #3a2417)',
    accent: '#e3b877',
    ctaText: '#20140d',
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
  dumbbell: <path d="M4 9.5v5M2 10.5v3M7 6.5v11M17 6.5v11M20 10.5v3M22 9.5v5M7 12h10" />,
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
  pin: (
    <>
      <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
};

function SiteIcon({ name, size = 18, className = '' }) {
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
      className={`shrink-0 ${className}`}
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

function CoverPhoto({ src, className = '' }) {
  return <img src={src} alt="" className={`photo-cover ${className}`} />;
}

function MetaStrip({ site, tone = 'dark' }) {
  const dotCls = tone === 'light' ? 'border-slate-200 text-slate-500' : 'border-white/15 text-white/75';
  return (
    <div className="mt-4">
      <div className={`flex flex-wrap gap-x-4 gap-y-1.5 border-t pt-3 text-[11.5px] ${dotCls}`}>
        {site.highlights.map((h) => (
          <span key={h} className="inline-flex items-center gap-1.5">
            <span className="inline-block h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: site.accent }} />
            {h}
          </span>
        ))}
      </div>
      <div
        className={`mt-2.5 flex items-center gap-1.5 font-mono text-[10.5px] ${
          tone === 'light' ? 'text-slate-400' : 'text-white/55'
        }`}
      >
        <SiteIcon name="pin" size={11} />
        {site.footer}
      </div>
    </div>
  );
}

function NavRow({ site, tone = 'dark' }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={`font-display text-[15px] font-semibold sm:text-[16px] ${tone === 'light' ? 'text-slate-900' : ''}`}>
        {site.brand}
      </span>
      <div
        className={`hidden gap-4 font-mono text-[10px] uppercase tracking-wide sm:flex ${
          tone === 'light' ? 'text-slate-400' : 'text-white/70'
        }`}
      >
        {site.nav.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Layouts ---------------------------- */

function RestaurantLayout({ site }) {
  return (
    <div className="layout-shell">
      <CoverPhoto src={site.image} />
      <div className="overlay-bottom" />
      <div className="relative z-[2] flex h-full flex-col justify-between p-6">
        <NavRow site={site} />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: site.accent }}>
            {site.sector}
          </p>
          <h4 className="mt-2 max-w-[18ch] font-display text-[24px] font-semibold italic leading-tight sm:text-[27px]">
            {site.headline}
          </h4>
          <p className="mt-2 max-w-[32ch] text-[13px] leading-relaxed text-white/80">{site.subheadline}</p>
          <span className="mt-4 inline-flex px-4 py-2 text-[12px] font-semibold" style={{ background: site.accent, color: site.ctaText }}>
            {site.cta}
          </span>
          <MetaStrip site={site} />
        </div>
      </div>
    </div>
  );
}

function FashionLayout({ site }) {
  return (
    <div className="layout-shell flex flex-col sm:flex-row">
      <div className="relative order-2 flex flex-1 flex-col justify-between bg-[#161217] p-6 sm:order-1 sm:w-[48%] sm:flex-none">
        <NavRow site={site} />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: site.accent }}>
            {site.sector}
          </p>
          <h4 className="mt-3 max-w-[16ch] font-display text-[21px] font-semibold uppercase leading-[1.2] tracking-wide sm:text-[23px]">
            {site.headline}
          </h4>
          <p className="mt-3 max-w-[28ch] text-[13px] leading-relaxed text-white/70">{site.subheadline}</p>
          <span
            className="mt-4 inline-flex items-center gap-2 border-b pb-1 text-[12px] font-semibold uppercase tracking-wide"
            style={{ borderColor: site.accent, color: site.accent }}
          >
            {site.cta} <span aria-hidden="true">→</span>
          </span>
          <MetaStrip site={site} />
        </div>
      </div>
      <div className="relative order-1 h-[130px] flex-1 sm:order-2 sm:h-auto">
        <CoverPhoto src={site.image} />
      </div>
    </div>
  );
}

function SalonLayout({ site }) {
  return (
    <div className="layout-shell flex flex-col gap-5 bg-[#241a1e] p-6 sm:flex-row sm:items-center">
      <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-auto sm:w-[42%] sm:self-stretch sm:my-6">
        <CoverPhoto src={site.image} />
      </div>
      <div className="min-w-0 flex-1">
        <NavRow site={site} />
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: site.accent }}>
          {site.sector}
        </p>
        <h4 className="mt-2 max-w-[20ch] font-display text-[21px] font-semibold leading-tight sm:text-[23px]">{site.headline}</h4>
        <p className="mt-2 max-w-[30ch] text-[13px] leading-relaxed text-white/75">{site.subheadline}</p>
        <span
          className="mt-4 inline-flex rounded-full px-4 py-2 text-[12px] font-semibold"
          style={{ background: site.accent, color: site.ctaText }}
        >
          {site.cta}
        </span>
        <MetaStrip site={site} />
      </div>
    </div>
  );
}

function GymLayout({ site }) {
  return (
    <div className="layout-shell bg-black">
      <CoverPhoto src={site.image} className="gym-photo" />
      <div className="gym-diagonal" style={{ background: site.accent }} />
      <div className="relative z-[2] flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <span className="font-display text-[16px] font-black uppercase tracking-wide">{site.brand}</span>
          <div className="hidden gap-4 font-mono text-[10px] uppercase tracking-wide text-white/80 sm:flex">
            {site.nav.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="max-w-[13ch] font-display text-[28px] font-black italic uppercase leading-[0.95] sm:text-[33px]">
            {site.headline}
          </h4>
          <p className="mt-3 max-w-[28ch] text-[13px] leading-relaxed text-white/85">{site.subheadline}</p>
          <span className="mt-4 inline-flex px-4 py-2 text-[12px] font-black uppercase" style={{ background: site.accent, color: site.ctaText }}>
            {site.cta}
          </span>
          <MetaStrip site={site} />
        </div>
      </div>
    </div>
  );
}

function DentalLayout({ site }) {
  return (
    <div className="layout-shell flex flex-col gap-5 bg-[#f4f1ec] p-6 text-slate-900 sm:flex-row sm:items-center">
      <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl shadow-lg sm:h-auto sm:w-[42%] sm:self-stretch sm:my-6">
        <CoverPhoto src={site.image} />
        <div className="absolute bottom-3 left-3 rounded-xl bg-white px-3 py-1.5 text-[11px] font-semibold shadow-md">
          ★ 4.9 <span className="font-normal text-slate-500">· +500 pacientes</span>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <NavRow site={site} tone="light" />
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: site.accent }}>
          {site.sector}
        </p>
        <h4 className="mt-2 max-w-[20ch] font-display text-[21px] font-semibold leading-tight text-slate-900 sm:text-[23px]">
          {site.headline}
        </h4>
        <p className="mt-2 max-w-[30ch] text-[13px] leading-relaxed text-slate-500">{site.subheadline}</p>
        <span
          className="mt-4 inline-flex rounded-full px-4 py-2 text-[12px] font-semibold"
          style={{ background: site.accent, color: site.ctaText }}
        >
          {site.cta}
        </span>
        <MetaStrip site={site} tone="light" />
      </div>
    </div>
  );
}

function RealEstateLayout({ site }) {
  return (
    <div className="layout-shell">
      <CoverPhoto src={site.image} />
      <div className="overlay-top" />
      <div className="relative z-[2] flex h-full flex-col justify-between p-6">
        <NavRow site={site} />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: site.accent }}>
            {site.sector}
          </p>
          <h4 className="mt-2 max-w-[16ch] font-display text-[23px] font-semibold leading-tight sm:text-[25px]">{site.headline}</h4>
          <p className="mt-2 max-w-[30ch] text-[13px] leading-relaxed text-white/80">{site.subheadline}</p>

          <div className="realestate-search">
            <span className="realestate-field">Bilbao, Bizkaia</span>
            <span className="realestate-field">Comprar</span>
            <span className="realestate-field-btn" style={{ background: site.accent, color: site.ctaText }}>
              {site.cta}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-1.5 font-mono text-[10.5px] text-white/60">
            <SiteIcon name="pin" size={11} />
            {site.footer}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureLayout({ site }) {
  return (
    <div className="layout-shell">
      <CoverPhoto src={site.image} className="architecture-photo" />
      <div className="pointer-events-none absolute inset-4 border border-white/25 sm:inset-6" />
      <div className="relative z-[2] flex h-full flex-col justify-between p-7 sm:p-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">{site.brand}</span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: site.accent }}>
            {site.sector}
          </p>
          <h4 className="mt-2 max-w-[15ch] font-display text-[19px] font-light leading-snug text-white sm:text-[21px]">
            {site.headline}
          </h4>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-white/90">
            {site.cta} <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function CafeLayout({ site }) {
  return (
    <div className="layout-shell">
      <CoverPhoto src={site.image} />
      <div className="overlay-warm" />
      <div className="cafe-stamp" style={{ borderColor: site.accent, color: site.accent }}>
        <span>{site.brand}</span>
      </div>
      <div className="relative z-[2] flex h-full flex-col justify-between p-6">
        <NavRow site={site} />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: site.accent }}>
            {site.sector}
          </p>
          <h4 className="mt-2 max-w-[18ch] font-display text-[23px] font-semibold italic leading-tight sm:text-[26px]">
            {site.headline}
          </h4>
          <p className="mt-2 max-w-[30ch] text-[13px] leading-relaxed text-white/80">{site.subheadline}</p>
          <span className="mt-4 inline-flex px-4 py-2 text-[12px] font-semibold" style={{ background: site.accent, color: site.ctaText }}>
            {site.cta}
          </span>
          <MetaStrip site={site} />
        </div>
      </div>
    </div>
  );
}

const LAYOUTS = {
  restaurant: RestaurantLayout,
  fashion: FashionLayout,
  salon: SalonLayout,
  gym: GymLayout,
  dental: DentalLayout,
  realestate: RealEstateLayout,
  architecture: ArchitectureLayout,
  cafe: CafeLayout,
};

/* ---------------------------- Acordeón ---------------------------- */

function SitePanel({ site, active, onToggle }) {
  const Layout = LAYOUTS[site.layout];
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
      <div className="site-panel-header">
        <SiteIcon name={site.icon} size={16} />
        <span className="site-panel-label">{site.sector}</span>
      </div>

      <div className="site-panel-body">
        <Layout site={site} />
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
