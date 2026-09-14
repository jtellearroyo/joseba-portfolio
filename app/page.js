'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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
      'Un número de teléfono que atiende solo. Entiende lo que pide quien llama, consulta la agenda, propone huecos reales y cierra la cita sin que nadie descuelgue.',
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
      'Un CRM que se monta por piezas. Cada cliente activa solo los módulos que usa, y los agentes de voz escriben directamente en él: la llamada entra por un lado y sale convertida en ficha, cita y aviso.',
    build: [
      'Núcleo común con módulos activables por cliente',
      'Los agentes de voz y WhatsApp escriben en el CRM en tiempo real',
      'Gestión de reservas, fichas y seguimiento en un único sitio',
      'APIs REST para conectar con lo que ya tiene el cliente',
    ],
    stack: ['JavaScript', 'PHP', 'PostgreSQL', 'APIs REST'],
    image: null,
  },
  {
    ref: 'C',
    name: 'Captación digital y web corporativa',
    role: 'Dirección y ejecución',
    years: '2009 — 2026',
    summary:
      'La parte menos vistosa y la que paga las facturas. Web propia de principio a fin, campañas de pago, SEO técnico y medición, con el objetivo de que el teléfono suene por algo más que el boca a boca.',
    build: [
      'Web corporativa completa: estructura, contenido, SEO técnico y medición',
      'Campañas de Google Ads gestionadas y optimizadas de forma continua',
      'Email marketing y comunicación masiva a base instalada',
      'Analítica y Tag Manager para saber qué canal trae clientes',
    ],
    stack: ['Google Ads', 'Analytics', 'Tag Manager', 'WordPress', 'SEO'],
    image: null,
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
    <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
      {/* Barra móvil */}
      <header className="sticky top-0 z-40 -mx-5 flex items-center justify-between border-b border-[var(--line)] bg-[var(--bg)]/95 px-5 py-3.5 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden">
        <a href="#inicio" className="font-display text-[17px] font-semibold tracking-tight">
          Joseba
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
            <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-tight">
              Joseba
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
          <section id="inicio" className="scroll-mt-24 pt-10 lg:pt-0">
            <p className="font-mono text-[11px] leading-relaxed text-[var(--muted)] lg:hidden">
              Bilbao, Bizkaia
            </p>

            <h2 className="mt-4 max-w-[15ch] font-display text-[38px] font-semibold leading-[1.02] tracking-tight sm:text-[54px] lg:mt-0 lg:max-w-[16ch] lg:text-[64px]">
              Que el teléfono lo coja el software.
            </h2>

            <p className="mt-6 max-w-[62ch] text-[16px] leading-[1.7] text-[var(--muted)] sm:text-[17px]">
              Llevo diecisiete años en telecomunicaciones, los tres últimos construyendo agentes de
              voz con IA y el CRM donde aterriza todo lo que atienden. Debajo hay una llamada real de
              las que gestionan estos sistemas.
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

          {/* SISTEMAS */}
          <section id="sistemas" className="scroll-mt-24 pt-24 sm:pt-32">
            <SectionHead title="Sistemas" note="Tres piezas de trabajo, con lo que hay debajo de cada una." />

            <div className="mt-12 space-y-16 sm:space-y-20">
              {SYSTEMS.map((s) => (
                <article key={s.ref} className="border-l border-[var(--line-strong)] pl-5 sm:pl-8">
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

                  <div className="mt-7 aspect-[16/10] w-full overflow-hidden border border-[var(--line)] bg-[var(--panel)] sm:aspect-[16/9]">
                    {s.image ? (
                      <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-mono text-[11px] text-[var(--muted)]">
                          {/* Sustituye por /captura-x.jpg en la carpeta public */}
                          captura pendiente
                        </span>
                      </div>
                    )}
                  </div>

                  <ul className="mt-7 space-y-2.5">
                    {s.build.map((b) => (
                      <li key={b} className="flex gap-3 text-[14.5px] leading-relaxed text-[var(--muted)]">
                        <span className="mt-[9px] h-px w-3 shrink-0 bg-[var(--line-strong)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 font-mono text-[11px] leading-relaxed text-[var(--muted)]">
                    {s.stack.join('   /   ')}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* TRAYECTORIA */}
          <section id="trayectoria" className="scroll-mt-24 pt-24 sm:pt-32">
            <SectionHead title="Trayectoria" note="De punto de venta a dirección de producto, sin salir del sector." />

            <ol className="mt-12">
              {TIMELINE.map((t, i) => (
                <li
                  key={t.years}
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
                </li>
              ))}
            </ol>
          </section>

          {/* CAPACIDADES */}
          <section id="capacidades" className="scroll-mt-24 pt-24 sm:pt-32">
            <SectionHead title="Capacidades" note="Lo que uso a diario, no una lista de todo lo que he tocado." />

            <div className="mt-12 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
              {CAPABILITIES.map((c) => (
                <div key={c.group} className="bg-[var(--bg)] p-6">
                  <h4 className="font-display text-[16px] font-semibold tracking-tight text-[var(--signal)]">
                    {c.group}
                  </h4>
                  <p className="mt-3 text-[14.5px] leading-[1.85] text-[var(--muted)]">
                    {c.items.join(', ')}
                  </p>
                </div>
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
              {/* ← cambia por tu correo */}
              <a href="mailto:TU-EMAIL@AQUI.COM" className="btn-solid">
                Escríbeme
              </a>
              {/* ← cambia por tu perfil */}
              <a
                href="https://www.linkedin.com/in/TU-USUARIO"
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
              <p>Joseba — Bilbao, Bizkaia</p>
              <p className="mt-1">Diseñado y programado por mí. 2026.</p>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}

function SectionHead({ title, note }) {
  return (
    <div className="border-b border-[var(--line-strong)] pb-5">
      <h3 className="font-display text-[13px] font-semibold tracking-tight text-[var(--muted)]">
        {title}
      </h3>
      <p className="mt-2 max-w-[52ch] font-display text-[22px] font-semibold leading-snug tracking-tight sm:text-[26px]">
        {note}
      </p>
    </div>
  );
}
