import Link from 'next/link'
import Header from '@/components/Header'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="text-8xl mb-6">🎯</div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Página no encontrada</h1>
        <p className="text-lg text-gray-500 mb-2">
          Esta página no existe, pero eso no tiene por qué arruinarte el día.
        </p>
        <p className="text-gray-400 mb-10">Error 404</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/generar" className="btn-primary">
            ✨ Generar un plan para hoy
          </Link>
          <Link href="/" className="btn-secondary">
            Ir al inicio
          </Link>
        </div>
      </main>
    </div>
  )
}
