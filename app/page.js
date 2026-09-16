'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import CrmDemo from './components/CrmDemo';
import MiniSites from './components/MiniSites';

/* ------------------------------------------------------------------ */
/*  CONTENIDO                                                          */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sistemas', label: 'Sistemas' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'capacidades', label: 'Capacidades' },
  { id: 'contacto', label: 'Contacto' },
];

// Pon tu foto en public/foto.jpg (cuadrada, mínimo 400x400) y cambia esto:
const PROFILE = {
  photo: null, // '/foto.jpg'
};

// Guion de la llamada que se reproduce en la portada.
const CALL = [
  { who: 'ia', text: 'Buenos días, Clínica Ondarreta. ¿En qué puedo ayudarle?', ms: 2200 },
  { who: 'persona', text: 'Hola, quería pedir cita con el fisio.', ms: 1800 },
  { who: 'ia', text: 'Claro. Tengo hueco el jueves a las 17:30 o el viernes a las 10:00.', ms: 2600 },
  { who: 'persona', text: 'El jueves me viene bien.', ms: 1500 },
  { who: 'ia', text: 'Hecho. Le mando la confirmación por WhatsApp ahora mismo.', ms: 2400 },
];

const SYSTEMS = [
  {
    ref: 'A',
    name: 'Asistente de voz 24/7',
    role: 'Diseño, desarrollo e integración',
    years: '2023 — 2026',
    summary:
      'Diseñé y desarrollé un asistente de voz basado en IA capaz de atender llamadas de forma autónoma, interpretar la solicitud del cliente, consultar la agenda en tiempo real y completar la reserva de citas sin intervención del personal.',
    build: [
      'Síntesis de voz con Eleven Labs para que la conversación no suene a robot',
      'Orquestación en Google Cloud: intención, agenda, confirmación',
      'Salida a WhatsApp Business API para el recordatorio',
      'Escalado a persona cuando la conversación se sale del guion',
    ],
    stack: ['Google Cloud', 'Eleven Labs', 'WhatsApp Business API', 'Telefonía IP'],
    image: null,
  },
  {
    ref: 'B',
    name: 'CRM modular multicliente',
    role: 'Arquitectura y producto',
    years: '2023 — 2026',
    summary:
      'Diseñé la arquitectura y construí un CRM modular donde cada cliente activa solo los módulos que necesita, y donde los agentes de voz escriben directamente: la llamada entra por un lado y sale convertida en ficha, cita y aviso.',
    build: [
      'Núcleo común con módulos activables por cliente',
      'Los agentes de voz y WhatsApp escriben en el CRM en tiempo real',
      'Gestión de reservas, fichas y seguimiento en un único sitio',
      'APIs REST para conectar con lo que ya tiene el cliente',
    ],
    stack: ['JavaScript', 'PHP', 'PostgreSQL', 'APIs REST'],
    embed: 'crm',
  },
  {
    ref: 'C',
    name: 'Captación digital y web corporativa',
    role: 'Dirección y ejecución',
    years: '2009 — 2026',
    summary:
      'Llevé de principio a fin la web corporativa, las campañas de pago, el SEO técnico y la medición: la parte menos vistosa, pero la que hace que el teléfono suene por algo más que el boca a boca.',
    build: [
      'Web corporativa completa: estructura, contenido, SEO técnico y medición',
      'Campañas de Google Ads gestionadas y optimizadas de forma continua',
      'Email marketing y comunicación masiva a base instalada',
      'Analítica y Tag Manager para saber qué canal trae clientes',
    ],
    stack: ['Google Ads', 'Analytics', 'Tag Manager', 'WordPress', 'SEO'],
    embed: 'sites',
  },
];

const TIMELINE = [
  {
    years: '2023 — 2026',
    role: 'Dirección de proyectos y desarrollo de producto',
    place: 'Operador de telecomunicaciones',
    note: 'Construcción de los agentes de voz con IA y del CRM modular. Además, toda la capa de marketing: web, campañas, SEO y diseño.',
  },
  {
    years: '2009 — 2022',
    role: 'De atención al cliente a codirección de departamento',
    place: 'Distribuidor oficial de telecomunicaciones',
    note: 'Trece años. Empecé en punto de venta y acabé dirigiendo proyectos y el área digital: desarrollo web para clientes, campañas y comunicación.',
  },
  {
    years: '2008 — 2009',
    role: 'Venta y contratación en punto de venta',
    place: 'Operador móvil en gran superficie',
    note: 'Donde aprendí a explicar cosas técnicas a gente que no quiere oír nada técnico.',
  },
];

const MARQUEE = [
  'Agentes de voz con IA',
  'CRM a medida',
  'Google Cloud',
  'Automatización de procesos',
  'WhatsApp Business API',
  'Google Ads',
];

const CAPABILITIES = [
  {
    group: 'Sistemas con IA',
    items: ['Agentes de voz', 'Síntesis de voz', 'Automatización de procesos', 'Integración de APIs', 'Google Cloud'],
  },
  {
    group: 'Desarrollo',
    items: ['JavaScript', 'PHP', 'Node.js', 'PostgreSQL', 'APIs REST', 'HTML y CSS', 'WordPress'],
  },
  {
    group: 'Crecimiento',
    items: ['Google Ads', 'Analytics', 'Tag Manager', 'SEO técnico', 'Email marketing'],
  },
  {
    group: 'Dirección',
    items: ['Gestión de proyectos', 'Relación con cliente', 'Equipos', 'Producto'],
  },
];

/* ------------------------------------------------------------------ */
/*  ICONOS DE STACK                                                    */
/* ------------------------------------------------------------------ */

const ICON_PATHS = {
  'Google Cloud': 'M6.5 16.5a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.6-1.98A4.5 4.5 0 0 1 17 16.5H6.5Z',
  'Eleven Labs': 'M5 15V9M9 17V7M13 15V9M17 12.5V11.5',
  'WhatsApp Business API':
    'M7.5 16.5 5 19l.6-3.2A7 7 0 1 1 8.4 17l-.9-.5ZM9.5 9c0 1.5 2 4.5 3.5 4.5.6 0 1.3-.9 1.6-1.4',
  'Telefonía IP': 'M6 4h3l1.5 4-2 1.2a9 9 0 0 0 4.3 4.3L14 11.5l4 1.5v3a2 2 0 0 1-2.2 2A15 15 0 0 1 4 6.2 2 2 0 0 1 6 4Z',
  JavaScript: 'M5 5h14v14H5zM9 15.5c.3.7.9 1.2 1.7 1.2 1 0 1.5-.5 1.5-1.4V10M14 12.3c.4-.5 1-.8 1.7-.8 1.1 0 1.8.6 1.8 1.5s-.7 1.2-1.6 1.5c-1 .3-1.9.6-1.9 1.7 0 .9.8 1.5 1.8 1.5.8 0 1.4-.3 1.8-.8',
  PHP: 'M4 12c0-1.7 1.8-3 4-3s4 1.3 4 3-1.8 3-4 3-4-1.3-4-3ZM7 9v6M13 9.3h2.3c1.2 0 2.2.8 2.2 2s-1 2-2.2 2H13M15 13.3v2M9 13.3v2',
  PostgreSQL: 'M12 4c-4 0-6.5 2.5-6.5 6.5S8 18 11 19c.3-1 .2-1.8-.2-2.6M12 4c4 0 6.5 2.5 6.5 6.5 0 2-1 4.3-2.5 5.5M14 10.2c.3-.4.9-.4 1.2 0M9 10.2c.3-.4.9-.4 1.2 0M10 13.5c.6.4 1.4.4 2 0',
  'APIs REST': 'M8 9 4 12l4 3M16 9l4 3-4 3M13.5 6.5l-3 11',
  'Google Ads': 'M8.5 5 4 18h4l1.3-4M15.5 5 20 18h-4l-1.3-4M9.3 14h5.4',
  Analytics: 'M5 19V10M11 19V5M17 19v-7',
  'Tag Manager': 'M12 5h5.5L20 7.5V13L12 21l-7.5-7.5L12 5Z M15.2 9.2h.01',
  WordPress: 'M12 19a7 7 0 1 1 0-14 7 7 0 0 1 0 14ZM6.3 9l2.9 8M9.8 8l3 8.5 1.6-4.7-1-3M14.2 8l2.4 6.8c.7-1 1.1-2.3 1.1-3.6a7 7 0 0 0-.5-2.6',
  SEO: 'M11 5a6 6 0 1 1 0 12 6 6 0 0 1 0-12ZM15.5 15.5 20 20',
  'Email marketing': 'M4 7h16v10H4Zm0 0 8 6 8-6',
};

function TechIcon({ name }) {
  const d = ICON_PATHS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {d ? <path d={d} /> : <circle cx="12" cy="12" r="3" />}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  REVELADO AL HACER SCROLL                                          */
/* ------------------------------------------------------------------ */

function Reveal({ children, className = '', as: Tag = 'div', delay = 0, ...rest }) {
  const ref = useRef(null);
  const [in_, setIn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setIn(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${in_ ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: in_ ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  INTERACCIÓN: SPOTLIGHT + INCLINACIÓN 3D                            */
/* ------------------------------------------------------------------ */

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function handleSpotlight(e) {
  if (reducedMotion()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
  el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
}

function handleTilt(e) {
  if (reducedMotion()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(800px) rotateX(${py * -7}deg) rotateY(${px * 7}deg) scale3d(1.015,1.015,1.015)`;
}

function resetTilt(e) {
  e.currentTarget.style.transform = '';
}

/* ------------------------------------------------------------------ */
/*  BARRA DE PROGRESO DE SCROLL                                       */
/* ------------------------------------------------------------------ */

function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    function update() {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const pct = max > 0 ? (root.scrollTop / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GLOW AMBIENTAL QUE SIGUE AL CURSOR                                 */
/* ------------------------------------------------------------------ */

function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reducedMotion()) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf;

    function onMove(e) {
      target.x = e.clientX;
      target.y = e.clientY;
    }

    function loop() {
      pos.x += (target.x - pos.x) * 0.1;
      pos.y += (target.y - pos.y) * 0.1;
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  BANDA DE TEXTO EN MOVIMIENTO                                       */
/* ------------------------------------------------------------------ */

function MarqueeBand() {
  const row = (key) => (
    <div className="marquee-row" key={key} aria-hidden={key === 'b'}>
      {MARQUEE.map((m, i) => (
        <span key={i} className="marquee-item">
          {m}
          <span className="marquee-dot">/</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div className="marquee-track">
        {row('a')}
        {row('b')}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ONDA DE VOZ                                                        */
/* ------------------------------------------------------------------ */

function Waveform({ active, speaker }) {
  const bars = useMemo(
    () => Array.from({ length: 44 }, (_, i) => ({ i, delay: (i % 11) * 0.07, base: 6 + ((i * 37) % 22) })),
    []
  );

  return (
    <div className="flex h-14 items-center gap-[3px]" aria-hidden="true">
      {bars.map((b) => (
        <span
          key={b.i}
          className={active ? 'wave-bar' : ''}
          style={{
            display: 'block',
            width: 3,
            borderRadius: 2,
            height: active ? undefined : 3,
            '--h': `${b.base}px`,
            animationDelay: `${b.delay}s`,
            background: speaker === 'ia' ? 'var(--signal)' : 'var(--muted)',
            opacity: active ? 1 : 0.32,
            transition: 'opacity .3s ease, background .3s ease',
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PANEL DE LLAMADA                                                   */
/* ------------------------------------------------------------------ */

function CallPanel() {
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timers = useRef([]);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function play() {
    clearTimers();
    setDone(false);
    setSeconds(0);
    setStep(-1);

    if (reduced) {
      setStep(CALL.length - 1);
      setDone(true);
      setSeconds(11);
      return;
    }

    let acc = 600;
    CALL.forEach((line, i) => {
      timers.current.push(setTimeout(() => setStep(i), acc));
      acc += line.ms;
    });
    timers.current.push(
      setTimeout(() => {
        setDone(true);
        setStep(CALL.length);
      }, acc + 400)
    );
  }

  useEffect(() => {
    play();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (done || step < 0) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [done, step]);

  const talking = step >= 0 && step < CALL.length ? CALL[step].who : null;
  const visible = CALL.slice(0, Math.max(step + 1, 0));

  return (
    <div className="panel overflow-hidden">
      {/* Cabecera */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className={`dot ${done ? 'dot-done' : 'dot-live'}`} />
          <span className="font-mono text-[11px] tracking-wide text-[var(--muted)]">
            {done ? 'Llamada finalizada' : 'Llamada en curso'}
          </span>
        </div>
        <span className="font-mono text-[11px] text-[var(--muted)]">
          {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
        </span>
      </div>

      {/* Onda */}
      <div className="px-4 pt-5 sm:px-5">
        <Waveform active={!!talking} speaker={talking} />
      </div>

      {/* Transcripción */}
      <div className="min-h-[212px] px-4 pb-4 pt-4 sm:min-h-[200px] sm:px-5">
        <ul className="space-y-3">
          {visible.map((line, i) => (
            <li key={i} className="line-in flex gap-3">
              <span
                className="mt-[3px] shrink-0 font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ color: line.who === 'ia' ? 'var(--signal)' : 'var(--muted)' }}
              >
                {line.who === 'ia' ? 'IA' : 'Cliente'}
              </span>
              <span className={`text-[13.5px] leading-relaxed sm:text-sm ${line.who === 'ia' ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}>
                {line.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Resultado */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] bg-[var(--panel-2)] px-4 py-3 sm:px-5">
        <span
          className={`font-mono text-[11px] transition-opacity duration-500 ${done ? 'opacity-100' : 'opacity-0'}`}
          style={{ color: 'var(--ok)' }}
        >
          Cita creada en el CRM · WhatsApp enviado
        </span>
        <button
          type="button"
          onClick={play}
          className="replay font-mono text-[11px] text-[var(--muted)]"
        >
          Repetir llamada
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PÁGINA                                                             */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [current, setCurrent] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative z-[1] mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
      {/* Barra móvil */}
      <header className="sticky top-0 z-40 -mx-5 flex items-center justify-between border-b border-[var(--line)] bg-[var(--bg)]/95 px-5 py-3.5 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden">
        <a href="#inicio" className="flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-tight">
          <span className="avatar-frame avatar-frame-sm">
            {PROFILE.photo ? (
              <img src={PROFILE.photo} alt="Joseba Telletxea" className="h-full w-full object-cover" />
            ) : (
              <span className="avatar-fallback">J</span>
            )}
          </span>
          Joseba Telletxea
        </a>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((v) => !v)}
          className="font-mono text-[11px] text-[var(--muted)]"
        >
          {menuOpen ? 'Cerrar' : 'Menú'}
        </button>
      </header>

      {menuOpen && (
        <nav className="-mx-5 border-b border-[var(--line)] bg-[var(--panel)] px-5 py-2 sm:-mx-8 sm:px-8 lg:hidden">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-[var(--line)] py-3 text-[15px] text-[var(--muted)] last:border-0"
            >
              {s.label}
            </a>
          ))}
        </nav>
      )}

      <div className="lg:flex lg:gap-16">
        {/* ---------------- RAIL ---------------- */}
        <aside className="hidden lg:flex lg:h-screen lg:w-[300px] lg:shrink-0 lg:flex-col lg:justify-between lg:py-16 lg:sticky lg:top-0">
          <div>
            <span className="avatar-frame avatar-frame-lg">
              {PROFILE.photo ? (
                <img src={PROFILE.photo} alt="Joseba Telletxea" className="h-full w-full object-cover" />
              ) : (
                <span className="avatar-fallback avatar-fallback-lg">J</span>
              )}
            </span>

            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--signal)]">
              Currículum · Portfolio
            </p>
            <h1 className="mt-3 font-display text-[32px] font-semibold leading-[1.1] tracking-tight">
              Joseba Telletxea
            </h1>
            <p className="mt-3 max-w-[240px] text-[15px] leading-relaxed text-[var(--muted)]">
              Construyo sistemas de IA que atienden, entienden y resuelven sin que nadie descuelgue.
            </p>

            <nav className="mt-12 space-y-1">
              {SECTIONS.map((s) => {
                const on = current === s.id;
                return (
                  <a key={s.id} href={`#${s.id}`} className="group flex items-center gap-3 py-1.5">
                    <span
                      className="block h-px transition-all duration-300"
                      style={{
                        width: on ? 40 : 18,
                        background: on ? 'var(--signal)' : 'var(--line-strong)',
                      }}
                    />
                    <span
                      className="text-[14px] transition-colors duration-300"
                      style={{ color: on ? 'var(--ink)' : 'var(--muted)' }}
                    >
                      {s.label}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="space-y-2 font-mono text-[11px] text-[var(--muted)]">
            <p className="flex items-center gap-2">
              <span className="dot dot-done" />
              Disponible para incorporación
            </p>
            <p>Bilbao, Bizkaia</p>
          </div>
        </aside>

        {/* ---------------- CONTENIDO ---------------- */}
        <main className="min-w-0 flex-1 pb-24 lg:py-16">
          {/* INICIO */}
          <section id="inicio" className="relative scroll-mt-24 pt-10 lg:pt-0">
            <div className="hero-glow" aria-hidden="true" />
            <span className="hero-ghost hidden lg:block" aria-hidden="true">
              IA
            </span>

            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--signal)] lg:hidden">
              Currículum · Bilbao, Bizkaia
            </p>

            <h2 className="mt-4 max-w-[17ch] font-display text-[34px] font-semibold leading-[1.05] tracking-tight sm:text-[48px] lg:mt-0 lg:max-w-[18ch] lg:text-[56px]">
              {'Construyo sistemas de IA que atienden, entienden y resuelven llamadas.'.split(' ').flatMap((w, i) => [
                <span key={i} className="word-in" style={{ animationDelay: `${i * 55}ms` }}>
                  {w}
                </span>,
                ' ',
              ])}
            </h2>

            <p className="mt-4 font-display text-[17px] italic text-[var(--signal)] sm:text-[19px]">
              Que el teléfono lo coja el software.
            </p>

            <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.7] text-[var(--muted)] sm:text-[17px]">
              Soy Joseba Telletxea. Cuento con diecisiete años de experiencia en telecomunicaciones y,
              durante los últimos tres, me he especializado en el diseño, desarrollo e implementación de
              agentes de voz con inteligencia artificial y sistemas CRM integrados. He desarrollado
              soluciones completas capaces de atender llamadas, interpretar las necesidades del cliente,
              consultar disponibilidad en tiempo real, gestionar citas y automatizar su seguimiento.
              Debajo hay una llamada real de las que gestionan los sistemas que hice.
            </p>

            <div className="mt-9">
              <CallPanel />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#sistemas" className="btn-solid">
                Ver los sistemas
              </a>
              <a href="#contacto" className="btn-ghost">
                Hablamos
              </a>
            </div>
          </section>

          <div className="mt-16 sm:mt-20">
            <MarqueeBand />
          </div>

          {/* SISTEMAS */}
          <section id="sistemas" className="scroll-mt-24 pt-24 sm:pt-32">
            <SectionHead
              eyebrow="01 — Lo que he hecho"
              question="¿Qué he construido estos últimos años?"
              note="Estos son algunos de los sistemas que he diseñado, desarrollado e implementado de principio a fin en mi puesto actual."
            />

            <div className="mt-12 space-y-16 sm:space-y-20">
              {SYSTEMS.map((s, i) => (
                <Reveal
                  as="article"
                  key={s.ref}
                  delay={i * 80}
                  className="hover-lift spotlight border-l border-[var(--line-strong)] pl-5 sm:pl-8"
                  onMouseMove={handleSpotlight}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-[var(--signal)]">{s.ref}</span>
                    <span className="font-mono text-[11px] text-[var(--muted)]">{s.years}</span>
                  </div>

                  <h4 className="mt-3 font-display text-[26px] font-semibold leading-tight tracking-tight sm:text-[32px]">
                    {s.name}
                  </h4>
                  <p className="mt-1.5 text-[13px] text-[var(--muted)]">{s.role}</p>

                  <p className="mt-5 max-w-[64ch] text-[15.5px] leading-[1.7] text-[var(--ink-soft)]">
                    {s.summary}
                  </p>

                  {s.embed === 'crm' ? (
                    <div className="mt-7 w-full">
                      <CrmDemo />
                    </div>
                  ) : s.embed === 'sites' ? (
                    <div className="mt-7 w-full">
                      <MiniSites />
                    </div>
                  ) : (
                    <div
                      className="tilt-card mt-7 aspect-[16/10] w-full overflow-hidden border border-[var(--line)] bg-[var(--panel)] sm:aspect-[16/9]"
                      onMouseMove={handleTilt}
                      onMouseLeave={resetTilt}
                    >
                      {s.image ? (
                        <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        <div className="img-placeholder flex h-full w-full items-center justify-center">
                          <span className="font-mono text-[11px] text-[var(--muted)]">
                            {/* Sustituye por /captura-x.jpg en la carpeta public */}
                            captura pendiente
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <ul className="mt-7 space-y-2.5">
                    {s.build.map((b) => (
                      <li key={b} className="flex gap-3 text-[14.5px] leading-relaxed text-[var(--muted)]">
                        <span className="mt-[9px] h-px w-3 shrink-0 bg-[var(--line-strong)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.stack.map((t) => (
                      <span key={t} className="stack-chip">
                        <TechIcon name={t} />
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* TRAYECTORIA */}
          <section id="trayectoria" className="scroll-mt-24 pt-24 sm:pt-32">
            <SectionHead
              eyebrow="02 — Trayectoria"
              question="¿Cómo he llegado hasta aquí?"
              note="De punto de venta a dirección de producto, sin salir del sector."
            />

            <ol className="mt-12">
              {TIMELINE.map((t, i) => (
                <Reveal
                  as="li"
                  key={t.years}
                  delay={i * 80}
                  className={`grid gap-2 border-t border-[var(--line)] py-7 sm:grid-cols-[140px_1fr] sm:gap-8 ${
                    i === TIMELINE.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <span className="font-mono text-[11px] text-[var(--muted)] sm:pt-1">{t.years}</span>
                  <div>
                    <h4 className="font-display text-[19px] font-semibold leading-snug tracking-tight sm:text-[21px]">
                      {t.role}
                    </h4>
                    <p className="mt-1 text-[13px] text-[var(--muted)]">{t.place}</p>
                    <p className="mt-3 max-w-[62ch] text-[14.5px] leading-[1.7] text-[var(--ink-soft)]">
                      {t.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* CAPACIDADES */}
          <section id="capacidades" className="scroll-mt-24 pt-24 sm:pt-32">
            <SectionHead
              eyebrow="03 — Capacidades"
              question="¿Qué sé hacer, en concreto?"
              note="Lo que uso a diario, no una lista de todo lo que he tocado."
            />

            <div className="mt-12 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
              {CAPABILITIES.map((c, i) => (
                <Reveal
                  as="div"
                  key={c.group}
                  delay={i * 70}
                  className="hover-lift spotlight bg-[var(--bg)] p-6"
                  onMouseMove={handleSpotlight}
                >
                  <h4 className="font-display text-[16px] font-semibold tracking-tight text-[var(--signal)]">
                    {c.group}
                  </h4>
                  <p className="mt-3 text-[14.5px] leading-[1.85] text-[var(--muted)]">
                    {c.items.join(', ')}
                  </p>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 font-mono text-[11px] leading-relaxed text-[var(--muted)]">
              Español nativo   /   Euskera básico   /   Inglés medio hablado, alto escrito
            </p>
          </section>

          {/* CONTACTO */}
          <section id="contacto" className="scroll-mt-24 pt-24 sm:pt-32">
            <h3 className="max-w-[18ch] font-display text-[34px] font-semibold leading-[1.05] tracking-tight sm:text-[46px]">
              Si tienes un proceso que se come el día de alguien, cuéntamelo.
            </h3>

            <p className="mt-6 max-w-[60ch] text-[16px] leading-[1.7] text-[var(--muted)]">
              Trabajo mejor donde hay una operativa real que arreglar: llamadas que nadie coge,
              datos en tres sitios distintos, tareas que se repiten cada mañana.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="mailto:j.telle@hotmail.com" className="btn-solid">
                Escríbeme
              </a>
              <a
                href="https://www.linkedin.com/in/joseba-telletxea-arroyo-65ba43250/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/jtellearroyo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                GitHub
              </a>
            </div>

            <footer className="mt-20 border-t border-[var(--line)] pt-6 font-mono text-[11px] text-[var(--muted)]">
              <p>Joseba Telletxea — Bilbao, Bizkaia</p>
              <p className="mt-1">Diseñado y programado por mí. 2026.</p>
            </footer>
          </section>
        </main>
      </div>
      </div>
    </>
  );
}

function SectionHead({ eyebrow, question, note }) {
  const ref = useRef(null);
  const [in_, setIn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      setIn(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -15% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`big-question ${in_ ? 'big-question-in' : ''} border-b border-[var(--line-strong)] pb-6`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--signal)]">{eyebrow}</span>
      <p className="mt-4 max-w-[18ch] font-display text-[32px] font-semibold leading-[1.1] tracking-tight sm:text-[44px] lg:text-[52px]">
        {question}
      </p>
      <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">{note}</p>
    </div>
  );
}
