import './globals.css';

export const metadata = {
  title: 'Joseba Telletxea — Currículum | Sistemas de IA y automatización',
  description:
    'Currículum de Joseba Telletxea. Diseño y construyo agentes de voz con IA y CRMs a medida que atienden llamadas, gestionan citas y automatizan procesos. Diecisiete años en telecomunicaciones.',
  openGraph: {
    title: 'Joseba Telletxea — Currículum',
    description:
      'Agentes de voz con IA, CRM modular y automatización de procesos. Bilbao, Bizkaia.',
    locale: 'es_ES',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d1014',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
