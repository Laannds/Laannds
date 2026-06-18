import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad · ¿Qué hago hoy?',
  description: 'Política de privacidad y protección de datos de ¿Qué hago hoy?',
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <Link href="/" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
            ← Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4">
            Política de Privacidad
          </h1>
          <p className="text-gray-500 mt-2">Última actualización: junio de 2026</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">1. Responsable del tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos personales recogidos a través de{' '}
              <strong>¿Qué hago hoy?</strong> es el titular del servicio, con dirección de
              contacto: <strong>hola@quehagohoy.es</strong>.
            </p>
            <p>
              Nos comprometemos a proteger tu privacidad y a tratar tus datos conforme al
              Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de
              Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">2. Datos que recopilamos</h2>
            <p>Recopilamos los siguientes datos cuando utilizas nuestro servicio:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Datos de cuenta:</strong> dirección de correo electrónico y contraseña
                (almacenada de forma cifrada).
              </li>
              <li>
                <strong>Datos de uso:</strong> información que introduces en el formulario
                (presupuesto, ciudad, tiempo, compañía, preferencias) para generar tus planes.
              </li>
              <li>
                <strong>Historial de generaciones:</strong> los planes que has generado y sus
                parámetros de entrada, para ofrecerte el historial en tu panel de usuario.
              </li>
              <li>
                <strong>Datos técnicos:</strong> dirección IP, tipo de navegador y datos de
                sesión, gestionados automáticamente por Supabase para la autenticación.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">3. Finalidad y base legal</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Finalidad</th>
                    <th className="text-left p-3 font-semibold">Base legal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3">Prestación del servicio (generación de planes)</td>
                    <td className="p-3">Ejecución de contrato (Art. 6.1.b RGPD)</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="p-3">Gestión de tu cuenta de usuario</td>
                    <td className="p-3">Ejecución de contrato (Art. 6.1.b RGPD)</td>
                  </tr>
                  <tr>
                    <td className="p-3">Mejora del servicio y análisis de uso</td>
                    <td className="p-3">Interés legítimo (Art. 6.1.f RGPD)</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="p-3">Comunicaciones sobre el servicio</td>
                    <td className="p-3">Interés legítimo (Art. 6.1.f RGPD)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">4. Terceros que acceden a tus datos</h2>
            <p>
              Para ofrecerte el servicio, compartimos datos con los siguientes proveedores
              tecnológicos, todos ellos con garantías adecuadas conforme al RGPD:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Supabase Inc.</strong> (autenticación y base de datos) — servidores en la
                UE disponibles.
              </li>
              <li>
                <strong>OpenAI, LLC</strong> (generación de planes mediante IA) — los textos que
                introduces en el formulario se envían a la API de OpenAI para generar los planes.
                OpenAI no utiliza estos datos para entrenar sus modelos a través de la API.
              </li>
              <li>
                <strong>Vercel Inc.</strong> (infraestructura de hosting) — procesa las peticiones
                del servidor.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">5. Conservación de datos</h2>
            <p>
              Conservamos tus datos mientras tu cuenta esté activa. El historial de generaciones
              del plan gratuito se mantiene durante <strong>7 días</strong>; el plan Pro conserva
              el historial completo.
            </p>
            <p>
              Si eliminas tu cuenta, borramos todos tus datos en un plazo máximo de 30 días, salvo
              obligación legal de conservación.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">6. Tus derechos</h2>
            <p>
              En cualquier momento puedes ejercer los siguientes derechos enviando un email a{' '}
              <strong>hola@quehagohoy.es</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Acceso:</strong> obtener confirmación de qué datos tuyos tratamos.
              </li>
              <li>
                <strong>Rectificación:</strong> corregir datos inexactos o incompletos.
              </li>
              <li>
                <strong>Supresión:</strong> solicitar la eliminación de tus datos («derecho al
                olvido»).
              </li>
              <li>
                <strong>Portabilidad:</strong> recibir tus datos en formato estructurado y legible
                por máquina.
              </li>
              <li>
                <strong>Limitación y oposición:</strong> restringir o impedir determinados
                tratamientos.
              </li>
            </ul>
            <p>
              También tienes derecho a presentar una reclamación ante la{' '}
              <strong>Agencia Española de Protección de Datos (AEPD)</strong> en{' '}
              <span className="text-orange-600">www.aepd.es</span>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">7. Cookies</h2>
            <p>
              Utilizamos únicamente cookies técnicas y de sesión, necesarias para el
              funcionamiento del servicio (autenticación). No utilizamos cookies de publicidad ni
              de seguimiento de terceros.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">8. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política para reflejar cambios en el servicio o en la
              normativa. Te notificaremos por email si los cambios son significativos. La fecha de
              la última actualización siempre aparece al inicio de esta página.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">9. Contacto</h2>
            <p>
              Para cualquier consulta sobre privacidad:{' '}
              <strong>hola@quehagohoy.es</strong>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
