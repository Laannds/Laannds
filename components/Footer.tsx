import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎯</span>
              <span className="font-bold text-gray-900 text-lg">¿Qué hago hoy?</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Tu concierge de ocio con IA. Planes personalizados en segundos para que
              aproveches al máximo tu tiempo libre.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
              Producto
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/generar"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Generar plan
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Mis planes
                </Link>
              </li>
              <li>
                <Link
                  href="/#precios"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Precios
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacidad"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400">
            © {currentYear} ¿Qué hago hoy? Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-400">
            Hecho con ❤️ y mucho ☕ en España
          </p>
        </div>
      </div>
    </footer>
  )
}
