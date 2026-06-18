import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const EXAMPLE_PLANS = [
  {
    emoji: '🎨',
    title: 'Tarde cultural en el Prado',
    description:
      'Sumérgete en el arte con una visita guiada al Museo del Prado y termina con un café en el barrio de las Letras.',
    activities: [
      'Visita las salas de Velázquez y Goya (entrada gratuita últimas 2h)',
      'Paseo por el Parque del Retiro al atardecer',
      'Cañas en una terraza del barrio de las Letras',
    ],
    cost: 8,
    hours: 3,
    tags: ['cultural', 'tranquilo'],
    tip: 'El Prado es gratuito de lunes a sábado de 18:00 a 20:00 y domingos de 17:00 a 19:00.',
  },
  {
    emoji: '🍽️',
    title: 'Ruta gastronómica por La Latina',
    description:
      'Descubre los sabores más auténticos de Madrid en el barrio con más historia y los mejores bares de tapas.',
    activities: [
      'Aperitivo de vermut en El Tempranillo',
      'Tapas en la Cava Baja: tortilla, patatas bravas, jamón',
      'Postre en una horchatería centenaria',
    ],
    cost: 22,
    hours: 2.5,
    tags: ['gastronómico', 'social'],
    tip: 'Ve antes de las 14:00 los fines de semana para evitar las colas.',
  },
  {
    emoji: '🌿',
    title: 'Parque y mercado urbano',
    description:
      'Una mañana activa entre naturaleza, mercado de productores locales y una cafetería con encanto.',
    activities: [
      'Carrera suave por la Casa de Campo (7 km)',
      'Mercado de Maravillas: frutas, quesos y pan artesano',
      'Desayuno tardío en cafetería de especialidad',
    ],
    cost: 15,
    hours: 2,
    tags: ['naturaleza', 'activo'],
    tip: 'El mercado de Maravillas tiene los mejores precios de toda la ciudad los sábados.',
  },
]

const STEPS = [
  {
    number: '1',
    icon: '📝',
    title: 'Cuéntanos tu situación',
    description:
      'Indica tu ciudad, cuánto tiempo tienes, tu presupuesto y con quién vas a salir.',
  },
  {
    number: '2',
    icon: '🤖',
    title: 'La IA genera 3 planes',
    description:
      'En segundos, GPT-4o crea 3 planes concretos y variados adaptados exactamente a ti.',
  },
  {
    number: '3',
    icon: '🎉',
    title: 'Elige y disfruta',
    description:
      'Compara los planes, elige el que más te guste y ¡listo! Ya sabes qué hacer hoy.',
  },
]

const FAQS = [
  {
    q: '¿Es realmente gratis?',
    a: 'Sí, el plan gratuito incluye 3 generaciones diarias sin necesidad de tarjeta de crédito. Más que suficiente para la mayoría de usuarios.',
  },
  {
    q: '¿Los planes son personalizados de verdad?',
    a: 'Totalmente. Cada plan se genera en tiempo real con GPT-4o-mini usando tu ciudad, presupuesto, tiempo disponible y preferencias. No son plantillas genéricas.',
  },
  {
    q: '¿Funciona para cualquier ciudad?',
    a: 'Sí, funciona para cualquier ciudad del mundo. Cuanto más específico seas (barrio, zona) mejor será el resultado.',
  },
  {
    q: '¿Puedo cancelar el plan Pro en cualquier momento?',
    a: 'Por supuesto. Sin permanencia, sin compromisos. Cancela cuando quieras desde tu panel de usuario.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 pt-20 pb-24">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-orange-200">
            <span>🤖</span>
            <span>Powered by GPT-4o · Gratis para empezar</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            ¿Tienes tiempo libre y{' '}
            <span className="text-orange-500 relative">
              no sabes qué hacer?
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Dinos tu ciudad, cuánto tiempo tienes y tu presupuesto. La IA genera{' '}
            <strong>3 planes concretos y personalizados</strong> en segundos. Deja de perder
            tiempo decidiendo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              ✨ Generar mi plan gratis →
            </Link>
            <a
              href="#como-funciona"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Cómo funciona ↓
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-400">Sin tarjeta de crédito · 3 planes gratis al día</p>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['🧑', '👩', '👨', '🧑‍🦱'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-sm border-2 border-white"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">+2.000 planes generados</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-orange-400 text-lg">★</span>
              ))}
              <span className="text-sm text-gray-600 ml-1 font-medium">4.9/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              En menos de 30 segundos tendrás 3 planes perfectos para tu día.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative text-center group">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-200 to-orange-100" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-orange-50 border-2 border-orange-200 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:border-orange-400 transition-colors">
                    {step.icon}
                  </div>
                  <div className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full mb-3">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE PLANS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Ejemplo real
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Esto es lo que genera la IA
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Para Madrid, tarde libre (3h), 25€ de presupuesto, en pareja.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {EXAMPLE_PLANS.map((plan, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <span className="text-4xl">{plan.emoji}</span>
                  <div>
                    <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                      Plan {i + 1}
                    </span>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{plan.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {plan.activities.map((activity, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-orange-400 mt-0.5 flex-shrink-0">→</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>

                {plan.tip && (
                  <div className="bg-orange-50 rounded-xl p-3 text-sm text-orange-800">
                    <span className="font-semibold">💡 Tip: </span>
                    {plan.tip}
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                      <span>💰</span>
                      <span>{plan.cost}€</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>⏱</span>
                      <span>{plan.hours}h</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {plan.tags.map((tag, j) => {
                      const colors = [
                        'bg-blue-100 text-blue-700',
                        'bg-green-100 text-green-700',
                      ]
                      return (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-1 rounded-full font-medium ${colors[j % colors.length]}`}
                        >
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/register" className="btn-primary text-lg px-8 py-4">
              Pruébalo gratis →
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="precios" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Precios simples y transparentes
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Empieza gratis. Actualiza cuando lo necesites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl border-2 border-gray-100 p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Gratis</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">0€</span>
                  <span className="text-gray-400 mb-1">/mes</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">Para quien quiere probar la app</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {[
                  '3 generaciones por día',
                  'Los 3 planes completos',
                  'Historial de 7 días',
                  'Sin tarjeta de crédito',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="w-full text-center btn-secondary py-3 block"
              >
                Empezar gratis
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-orange-500 p-8 flex flex-col relative bg-gradient-to-br from-orange-50 to-white">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MÁS POPULAR
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Pro</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">4,99€</span>
                  <span className="text-gray-400 mb-1">/mes</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">Para los que salen mucho</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {[
                  'Generaciones ilimitadas',
                  'Los 3 planes completos',
                  'Historial completo',
                  'Planes más detallados',
                  'Soporte prioritario',
                  'Cancela cuando quieras',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/register" className="w-full text-center btn-primary py-3 block">
                Empezar con Pro →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            ¿Listo para dejar de aburrirte?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Únete a miles de personas que ya usan ¿Qué hago hoy? para aprovechar al máximo su
            tiempo libre.
          </p>
          <Link
            href="/register"
            className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl text-lg hover:bg-orange-50 transition-colors shadow-md inline-block"
          >
            Crear mi cuenta gratis →
          </Link>
          <p className="mt-4 text-orange-200 text-sm">Sin tarjeta de crédito · 3 planes gratis al día</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
