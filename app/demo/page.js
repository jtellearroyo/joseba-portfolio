'use client';

import { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Aviso: todos los nombres, teléfonos, DNI y cifras de esta demo     */
/*  son inventados. No representan a ningún cliente ni paciente real.  */
/* ------------------------------------------------------------------ */

const NAV = [
  { id: 'fichaje', label: 'Fichaje', icon: 'clock' },
  { id: 'control', label: 'Control diario', icon: 'check' },
  { id: 'kpis', label: 'KPIs', icon: 'chart' },
  { id: 'reservas', label: 'Reservas', icon: 'calendar' },
  { id: 'pacientes', label: 'Pacientes', icon: 'users' },
  { id: 'kiosko', label: 'Kiosko', icon: 'tablet' },
  { id: 'sesiones', label: 'Sesiones', icon: 'clipboard' },
  { id: 'bonos', label: 'Bonos', icon: 'tag' },
  { id: 'caja', label: 'Caja', icon: 'cash' },
  { id: 'proveedores', label: 'Proveedores', icon: 'truck' },
];

const TAB_SUBTITLES = {
  fichaje: 'Registro de entrada y salida del personal.',
  control: 'Revisión automática del recorrido reserva, asistencia, sesión y bono.',
  kpis: 'Indicadores clínicos y financieros del centro.',
  reservas: 'Todas las citas, filtrables por estado y terapeuta.',
  pacientes: 'Ficha completa de cada paciente.',
  kiosko: 'Pantalla de autoservicio para la sala de espera.',
  sesiones: 'Historial de sesiones realizadas por paciente.',
  bonos: 'Bonos vendidos y consumo por paciente.',
  caja: 'Cobros del día y arqueo de caja.',
  proveedores: 'Gestión de proveedores y pedidos.',
};

const FULL_TABS = ['control', 'kpis', 'reservas', 'pacientes'];

/* ------------------------------------------------------------------ */
/*  Iconos                                                             */
/* ------------------------------------------------------------------ */

const NAV_ICON_PATHS = {
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  check: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 12.5l2.5 2.5L16 9" />
    </>
  ),
  chart: <path d="M4 19V10M10 19V5M16 19v-8M4 19h16" />,
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" />
    </>
  ),
  users: (
    <>
      <circle cx="8" cy="9" r="3" />
      <path d="M2.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M15 14.2c2.2.5 3.6 2 4 4.8" />
    </>
  ),
  tablet: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="16" rx="1.5" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 11h6M9 15h6" />
    </>
  ),
  tag: (
    <>
      <path d="M12 3h6a1 1 0 0 1 1 1v6l-9 9-7-7 9-9Z" />
      <circle cx="15" cy="7" r="1.1" />
    </>
  ),
  cash: (
    <>
      <rect x="3" y="7" width="18" height="11" rx="2" />
      <circle cx="12" cy="12.5" r="2.5" />
      <path d="M6 7V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h11v9H3Z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </>
  ),
};

function NavIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {NAV_ICON_PATHS[name]}
    </svg>
  );
}

function DemoLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 30 30" aria-hidden="true">
      <circle cx="15" cy="15" r="12.5" fill="none" stroke="var(--signal)" strokeWidth="2" />
      <circle cx="15" cy="15" r="4.5" fill="var(--signal)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Datos ficticios                                                    */
/* ------------------------------------------------------------------ */

const TASKS = [
  {
    id: 1,
    patient: 'AMAIA ZUBIZARRETA',
    tag: 'Osteopatía · nueva',
    date: '17/09/2026',
    time: '12:00',
    therapist: 'Maite',
    type: 'asistencia',
  },
  {
    id: 2,
    patient: 'IKER LARRAÑAGA',
    tag: 'Tratamiento antiestrés · modificada',
    date: '17/09/2026',
    time: '19:00',
    therapist: 'Aitor',
    type: 'asistencia',
  },
];

const TASK_FILTERS = [
  { id: 'todas', label: 'Todas' },
  { id: 'asistencia', label: 'Asistencia' },
  { id: 'sesiones', label: 'Sesiones' },
  { id: 'bonos', label: 'Bonos' },
  { id: 'pago', label: 'Pago' },
];

const KPI_RANGES = ['Hoy', '7 días', '30 días', 'Este mes', 'Mes pasado', '90 días', 'Año'];

const KPI_SUMMARY = [
  'Las sesiones realizadas subieron un 42% respecto al periodo anterior (156 vs. 110).',
  'Tasa de cancelación del 7%.',
  'Ingresos cobrados: 5.240,00 € (+68%) · 180,00 € pendientes de cobro.',
  'Quién más sesiones ha hecho: Aitor (89).',
  'Paciente con más gasto: XABIER MENDIZABAL (268,00 €).',
];

const KPI_CLINICAL = [
  { label: 'Sesiones realizadas', value: '156', delta: '▲ 42%', sub: 'vs. 110' },
  { label: 'Citas', value: '189', delta: '▲ 30%', sub: 'vs. 145' },
  { label: 'Cancelaciones', value: '14', delta: '▼ 22%', sub: '' },
  { label: 'Pacientes atendidos', value: '98', delta: '▲ 35%', sub: 'vs. 73' },
  { label: 'Sesiones de bono', value: '61', delta: '▲ 28%', sub: 'vs. 48' },
];

const KPI_FINANCE = [
  { label: 'Cobrado', value: '5.240,00 €', delta: '▲ 68%', sub: 'vs. 3.120,00 €' },
  { label: 'Pendiente de cobro', value: '180,00 €', sub: 'saldo a día de hoy', tone: 'bad' },
  { label: 'No pagó', value: '240,00 €', sub: 'se fueron sin pagar', tone: 'bad' },
  { label: 'Bonos vendidos', value: '15', delta: '▲ 50%', sub: 'vs. 10' },
  { label: 'Pacientes nuevos', value: '12', delta: '▲ 20%', sub: 'vs. 10' },
];

const BOOKINGS = [
  { date: '17/09/2026', time: '09:00', patient: 'Xabier Mendizabal', phone: '611 222 333', treatment: 'Fisioterapia', therapist: 'Aitor', status: 'Atendido' },
  { date: '17/09/2026', time: '09:30', patient: 'Amaia Zubizarreta', phone: '622 333 444', treatment: 'Osteopatía', therapist: 'Maite', status: 'Cancelada' },
  { date: '17/09/2026', time: '10:00', patient: 'Iker Larrañaga', phone: '633 444 555', treatment: 'Tratamiento antiestrés', therapist: 'Aitor', status: 'Nueva' },
  { date: '17/09/2026', time: '10:30', patient: 'Naiara Goikoetxea', phone: '644 555 666', treatment: 'Fisioterapia deportiva', therapist: 'Maite', status: 'Atendido' },
  { date: '17/09/2026', time: '11:00', patient: 'Jon Agirre', phone: '655 666 777', treatment: 'Osteopatía', therapist: 'Aitor', status: 'Nueva' },
  { date: '17/09/2026', time: '11:30', patient: 'Leire Etxarri', phone: '666 777 888', treatment: 'Fisioterapia', therapist: 'Maite', status: 'Confirmada' },
];

const STATUS_STYLE = {
  Atendido: 'bg-emerald-50 text-emerald-700',
  Cancelada: 'bg-red-50 text-red-600',
  Nueva: 'bg-sky-50 text-sky-700',
  Confirmada: 'bg-amber-50 text-amber-700',
};

const PATIENTS = [
  {
    id: 1,
    name: 'Xabier Mendizabal',
    phone: '611 222 333',
    lastVisit: '12/09/2026',
    status: 'Activo',
    dni: '00000000T',
    sex: '— Sin especificar —',
    profession: 'Comercial',
    origin: 'Recomendación',
    notes: 'Prefiere sesiones por la mañana.',
  },
  {
    id: 2,
    name: 'Amaia Zubizarreta',
    phone: '622 333 444',
    lastVisit: '10/09/2026',
    status: 'Nuevo',
    dni: '00000001R',
    sex: '— Sin especificar —',
    profession: '',
    origin: 'Google',
    notes: '',
  },
  {
    id: 3,
    name: 'Iker Larrañaga',
    phone: '633 444 555',
    lastVisit: '08/09/2026',
    status: 'Activo',
    dni: '00000002W',
    sex: '— Sin especificar —',
    profession: 'Profesor',
    origin: 'Mutua',
    notes: 'Alergia al aceite de almendras.',
  },
  {
    id: 4,
    name: 'Naiara Goikoetxea',
    phone: '644 555 666',
    lastVisit: '05/09/2026',
    status: 'Modificado',
    dni: '00000003A',
    sex: '— Sin especificar —',
    profession: '',
    origin: 'Instagram',
    notes: '',
  },
];

/* ------------------------------------------------------------------ */
/*  Piezas reutilizables                                               */
/* ------------------------------------------------------------------ */

function Stat({ label, value, sub, delta, tone }) {
  return (
    <div className={`rounded-lg border p-4 ${tone === 'bad' ? 'border-red-100 bg-red-50' : 'border-slate-200 bg-white'}`}>
      <p className="font-mono text-[10.5px] uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`mt-2 text-[26px] font-semibold ${tone === 'bad' ? 'text-red-600' : 'text-slate-900'}`}>{value}</p>
      {(delta || sub) && (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11.5px]">
          {delta && (
            <span
              className={`rounded px-1.5 py-0.5 font-medium ${
                delta.startsWith('▼') ? 'bg-red-100 text-red-600' : 'bg-emerald-50 text-emerald-600'
              }`}
            >
              {delta}
            </span>
          )}
          {sub && <span className="text-slate-400">{sub}</span>}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Vistas                                                             */
/* ------------------------------------------------------------------ */

function ControlDiarioView() {
  const [filter, setFilter] = useState('todas');
  const rows = filter === 'todas' ? TASKS : TASKS.filter((t) => t.type === filter);

  return (
    <div>
      <div className="rounded-lg border border-sky-100 bg-sky-50 px-4 py-3 text-[13px] text-sky-800">
        Revisión automática y siempre actualizada. Comprueba las reservas desde el 03/09/2026 hasta el
        17/09/2026. Al corregir el dato de origen, la tarea desaparece.
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Stat label="Tareas pendientes" value={TASKS.length} sub="Últimos 30 días cerrados" />
        <Stat label="Asistencia" value="2" sub="Estado por resolver" />
        <Stat label="Sesiones" value="0" sub="Parte no anotado" />
        <Stat label="Bonos" value="0" sub="Consumo por revisar" />
        <Stat label="Pago" value="0" sub="Método sin cualificar" />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {TASK_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`filter-pill ${filter === f.id ? 'filter-pill-active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-medium">Paciente</th>
              <th className="px-4 py-3 font-medium">Fecha y hora</th>
              <th className="px-4 py-3 font-medium">Terapeuta</th>
              <th className="px-4 py-3 font-medium">Tarea</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-400">
                  No hay tareas en este filtro.
                </td>
              </tr>
            )}
            {rows.map((t) => (
              <tr key={t.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{t.patient}</p>
                  <p className="text-[12px] text-slate-400">{t.tag}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {t.date}
                  <br />
                  {t.time}
                </td>
                <td className="px-4 py-3 text-slate-600">{t.therapist}</td>
                <td className="px-4 py-3">
                  <span className="task-badge">Revisar asistencia</span>
                  <p className="mt-1 max-w-[32ch] text-[12.5px] text-slate-500">
                    Si estuvo, cambia el estado a Atendido. Si no vino, márcalo como No vino.
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KpisView() {
  const [range, setRange] = useState('Este mes');

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {KPI_RANGES.map((r) => (
          <button key={r} onClick={() => setRange(r)} className={`filter-pill ${range === r ? 'filter-pill-active' : ''}`}>
            {r}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="demo-field">
          <span>Desde</span>
          <input type="date" defaultValue="2026-09-01" />
        </label>
        <label className="demo-field">
          <span>Hasta</span>
          <input type="date" defaultValue="2026-09-17" />
        </label>
        <label className="demo-field">
          <span>Terapeuta</span>
          <select defaultValue="">
            <option value="">Todos los terapeutas</option>
            <option>Aitor</option>
            <option>Maite</option>
          </select>
        </label>
        <label className="demo-field">
          <span>Servicio</span>
          <select defaultValue="">
            <option value="">Todos los servicios</option>
            <option>Fisioterapia</option>
            <option>Osteopatía</option>
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
        <p className="text-[12.5px] font-semibold uppercase tracking-wide text-indigo-600">Resumen del periodo</p>
        <ul className="mt-2 space-y-1.5 text-[13.5px] text-indigo-900">
          {KPI_SUMMARY.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="text-indigo-400">•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-7 font-mono text-[11px] uppercase tracking-wide text-slate-400">Actividad clínica</p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {KPI_CLINICAL.map((k) => (
          <Stat key={k.label} {...k} />
        ))}
      </div>

      <p className="mt-7 font-mono text-[11px] uppercase tracking-wide text-slate-400">Centro y finanzas</p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {KPI_FINANCE.map((k) => (
          <Stat key={k.label} {...k} />
        ))}
      </div>
    </div>
  );
}

function ReservasView() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Hoy" value="22" />
        <Stat label="Próximos 7 días" value="83" />
        <Stat label="Pendientes" value="0" />
        <Stat label="Este mes" value="336" />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <input type="text" placeholder="Buscar por paciente, teléfono, tratamiento..." className="demo-input min-w-[220px] flex-1" />
        <span className="filter-pill filter-pill-active">Hoy</span>
        <span className="filter-pill">Todos los estados</span>
        <span className="filter-pill">Todos los terapeutas</span>
      </div>

      <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Hora</th>
              <th className="px-4 py-3 font-medium">Paciente</th>
              <th className="px-4 py-3 font-medium">Teléfono</th>
              <th className="px-4 py-3 font-medium">Tratamiento</th>
              <th className="px-4 py-3 font-medium">Terapeuta</th>
              <th className="px-4 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((b, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 text-slate-600">{b.date}</td>
                <td className="px-4 py-3 text-slate-600">{b.time}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{b.patient}</td>
                <td className="px-4 py-3 text-slate-500">{b.phone}</td>
                <td className="px-4 py-3 text-slate-600">{b.treatment}</td>
                <td className="px-4 py-3 text-slate-600">{b.therapist}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${STATUS_STYLE[b.status]}`}>{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PacientesView({ onSelect }) {
  return (
    <div>
      <input type="text" placeholder="Buscar paciente..." className="demo-input w-full max-w-sm" />
      <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[560px] text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-medium">Paciente</th>
              <th className="px-4 py-3 font-medium">Teléfono</th>
              <th className="px-4 py-3 font-medium">Última visita</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {PATIENTS.map((p) => (
              <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                <td className="px-4 py-3 text-slate-500">{p.phone}</td>
                <td className="px-4 py-3 text-slate-600">{p.lastVisit}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-medium text-slate-600">{p.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onSelect(p)} className="text-[12.5px] font-medium text-[var(--signal)] hover:underline">
                    Ver ficha →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PatientDetail({ patient, onBack }) {
  const [firstName, ...rest] = patient.name.split(' ');
  const lastName = rest.join(' ');
  const initials = patient.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <div>
      <button onClick={onBack} className="text-[13px] font-medium text-slate-500 hover:text-slate-900">
        ← Volver al listado
      </button>

      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-[15px] font-semibold text-amber-700">
            {initials}
          </span>
          <div>
            <p className="text-[17px] font-semibold text-slate-900">{patient.name}</p>
            <p className="text-[12.5px] text-slate-400">
              DNI {patient.dni} · Tel. {patient.phone}
            </p>
          </div>
        </div>

        <p className="mt-6 text-[12px] font-semibold uppercase tracking-wide text-slate-400">Datos personales</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <label className="demo-field">
            <span>Nombre</span>
            <input defaultValue={firstName} />
          </label>
          <label className="demo-field">
            <span>Apellidos</span>
            <input defaultValue={lastName} />
          </label>
          <label className="demo-field">
            <span>DNI / NIE</span>
            <input defaultValue={patient.dni} />
          </label>
          <label className="demo-field">
            <span>Teléfono</span>
            <input defaultValue={patient.phone} />
          </label>
          <label className="demo-field">
            <span>Sexo</span>
            <select defaultValue={patient.sex}>
              <option>— Sin especificar —</option>
              <option>Mujer</option>
              <option>Hombre</option>
            </select>
          </label>
          <label className="demo-field">
            <span>Profesión</span>
            <input defaultValue={patient.profession} placeholder="—" />
          </label>
          <label className="demo-field">
            <span>Origen del paciente</span>
            <input defaultValue={patient.origin} />
          </label>
          <label className="demo-field">
            <span>Estado</span>
            <select defaultValue={patient.status}>
              <option>Nuevo</option>
              <option>Activo</option>
              <option>Modificado</option>
            </select>
          </label>
        </div>

        <label className="demo-field mt-4">
          <span>Observaciones</span>
          <textarea rows={3} defaultValue={patient.notes} />
        </label>
      </div>
    </div>
  );
}

function PlaceholderView({ label }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white py-20 text-center">
      <p className="text-[15px] font-medium text-slate-500">{label} no está incluido en esta demo</p>
      <p className="mt-2 max-w-sm text-[13px] text-slate-400">
        En la versión real funciona con el mismo patrón que las demás pestañas: datos en vivo, edición al vuelo y
        todo conectado al mismo CRM.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Página                                                             */
/* ------------------------------------------------------------------ */

export default function DemoPage() {
  const [active, setActive] = useState('control');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const activeNav = NAV.find((n) => n.id === active);

  function selectTab(id) {
    setActive(id);
    setSelectedPatient(null);
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3 text-[13px]">
        <a href="/" className="flex items-center gap-1.5 font-medium text-slate-600 hover:text-[var(--signal)]">
          <span aria-hidden="true">←</span> Volver al portfolio
        </a>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 font-mono text-[10.5px] text-amber-700">
          Demo interactiva · datos ficticios
        </span>
      </div>

      <div className="flex flex-col lg:flex-row">
        <aside className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3 lg:w-[240px] lg:shrink-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
          <div className="mb-6 hidden items-center gap-2.5 lg:flex">
            <DemoLogo />
            <div>
              <p className="text-[13px] font-semibold leading-tight text-slate-900">CRM DEMO</p>
              <p className="text-[11px] leading-tight text-slate-400">Clínica Ejemplo</p>
            </div>
          </div>

          {NAV.map((n) => (
            <button key={n.id} onClick={() => selectTab(n.id)} className={`nav-btn ${active === n.id ? 'nav-btn-active' : ''}`}>
              <NavIcon name={n.icon} />
              {n.label}
            </button>
          ))}

          <div className="mt-6 hidden items-center gap-2.5 border-t border-slate-100 pt-4 lg:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-[12px] font-semibold text-amber-700">
              AE
            </span>
            <div>
              <p className="text-[12.5px] font-medium text-slate-900">Ane Etxeberria</p>
              <p className="text-[11px] text-slate-400">Administradora · cuenta de ejemplo</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-5 sm:p-8">
          <h1 className="text-[24px] font-semibold tracking-tight text-slate-900 sm:text-[26px]">{activeNav.label}</h1>
          <p className="mt-1 text-[14px] text-slate-500">{TAB_SUBTITLES[active]}</p>

          <div className="mt-6">
            {active === 'control' && <ControlDiarioView />}
            {active === 'kpis' && <KpisView />}
            {active === 'reservas' && <ReservasView />}
            {active === 'pacientes' &&
              (selectedPatient ? (
                <PatientDetail patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
              ) : (
                <PacientesView onSelect={setSelectedPatient} />
              ))}
            {!FULL_TABS.includes(active) && <PlaceholderView label={activeNav.label} />}
          </div>
        </main>
      </div>
    </div>
  );
}
