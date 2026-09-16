'use client';

import CrmDemo from '../components/CrmDemo';

export default function DemoPage() {
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

      <CrmDemo variant="full" />
    </div>
  );
}
