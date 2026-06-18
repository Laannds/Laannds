import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '¿Qué hago hoy? - Tu plan perfecto en segundos',
  description:
    'La IA genera 3 planes personalizados según tu presupuesto, ubicación y tiempo libre. Deja de perder el tiempo decidiendo qué hacer.',
  keywords: ['planes', 'actividades', 'qué hacer', 'ocio', 'IA', 'planes personalizados'],
  openGraph: {
    title: '¿Qué hago hoy?',
    description: 'Tu plan perfecto en segundos gracias a la IA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
