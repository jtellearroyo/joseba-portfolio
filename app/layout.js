import './globals.css'

export const metadata = {
  title: 'Joseba - Programador & Experto en IA',
  description: 'Director de Proyectos | Experto en Inteligencia Artificial y Automatización',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
