import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Uso · ¿Qué hago hoy?',
  description: 'Términos y condiciones de uso de ¿Qué hago hoy?',
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <Link href="/" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
            ← Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4">
            Términos de Uso
          </h1>
          <p className="text-gray-500 mt-2">Última actualización: junio de 2026</p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">1. Aceptación de los términos</h2>
            <p>
              Al crear una cuenta o usar <strong>¿Qué hago hoy?</strong> («el Servicio»), aceptas
              estos Términos de Uso. Si no estás de acuerdo, no uses el Servicio.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">2. Descripción del servicio</h2>
            <p>
              ¿Qué hago hoy? es una plataforma web que utiliza inteligencia artificial para
              generar planes de actividades de ocio personalizados según los parámetros
              introducidos por el usuario (presupuesto, ubicación, tiempo disponible, etc.).
            </p>
            <p>
              Los planes generados son sugerencias creadas por IA. No garantizamos su exactitud,
              disponibilidad, precios actualizados ni la existencia de los establecimientos
              mencionados. Verifica siempre la información antes de actuar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">3. Cuenta de usuario</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Debes tener al menos 16 años para registrarte.</li>
              <li>
                Eres responsable de mantener la confidencialidad de tus credenciales de acceso.
              </li>
              <li>
                Debes notificarnos inmediatamente si sospechas acceso no autorizado a tu cuenta.
              </li>
              <li>
                Cada usuario puede tener una sola cuenta. Las cuentas múltiples para eludir los
                límites del plan gratuito están prohibidas.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">4. Plan gratuito y plan Pro</h2>
            <p>
              <strong>Plan gratuito:</strong> incluye hasta 3 generaciones de planes por día
              natural (00:00–23:59). El contador se reinicia automáticamente cada día.
            </p>
            <p>
              <strong>Plan Pro (4,99€/mes):</strong> incluye generaciones ilimitadas, historial
              completo y funcionalidades adicionales. La suscripción se factura mensualmente. Puedes
              cancelar en cualquier momento desde tu panel de usuario; tendrás acceso hasta el final
              del período facturado.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">5. Uso aceptable</h2>
            <p>Queda prohibido:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Usar el Servicio para actividades ilegales o contrarias a la moral.</li>
              <li>
                Intentar hacer ingeniería inversa, scraping masivo o automatización no autorizada
                del Servicio.
              </li>
              <li>Reproducir, vender o redistribuir el Servicio sin autorización expresa.</li>
              <li>Introducir contenido ofensivo, falso o malicioso en los formularios.</li>
            </ul>
            <p>
              Nos reservamos el derecho a suspender o cancelar cuentas que incumplan estas normas
              sin previo aviso.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">6. Propiedad intelectual</h2>
            <p>
              El código, diseño, marca y contenido del Servicio son propiedad de ¿Qué hago hoy?
              Los planes generados por IA son de uso personal del usuario y no pueden ser
              comercializados sin autorización.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">7. Limitación de responsabilidad</h2>
            <p>
              El Servicio se proporciona «tal cual». No garantizamos que el Servicio esté
              disponible de forma ininterrumpida ni que los planes generados sean precisos,
              actualizados o adecuados para tus circunstancias específicas.
            </p>
            <p>
              En ningún caso la responsabilidad total de ¿Qué hago hoy? hacia un usuario superará
              el importe pagado por dicho usuario en los últimos 12 meses.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">8. Modificaciones del servicio</h2>
            <p>
              Podemos modificar, suspender o discontinuar cualquier parte del Servicio en cualquier
              momento. Notificaremos los cambios significativos con al menos 15 días de antelación
              por email a los usuarios de pago.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">9. Ley aplicable y jurisdicción</h2>
            <p>
              Estos términos se rigen por la legislación española. Para cualquier controversia,
              ambas partes se someten a los juzgados y tribunales de España, salvo que la
              normativa aplicable establezca otro fuero imperativo.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">10. Contacto</h2>
            <p>
              Para cualquier consulta sobre estos términos: <strong>hola@quehagohoy.es</strong>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
