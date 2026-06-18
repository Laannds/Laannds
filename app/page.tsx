import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// ─── Static data ──────────────────────────────────────────────────────────────

const PREVIEW_PLANS = [
  {
    emoji: '🎨',
    title: 'Tarde en el Prado',
    activity: 'Entrada gratis · Retiro al atardecer · Cañas',
    cost: '8€',
    duration: '3h',
    tag: 'cultural',
    tagColor: 'bg-blue-50 text-blue-600',
  },
  {
    emoji: '🍽️',
    title: 'Ruta por La Latina',
    activity: 'Vermut · Tapas Cava Baja · Horchatería',
    cost: '22€',
    duration: '2.5h',
    tag: 'gastronómico',
    tagColor: 'bg-amber-50 text-amber-600',
  },
  {
    emoji: '🌿',
    title: 'Parque y Mercado',
    activity: 'Casa de Campo · Mercado de Maravillas',
    cost: '12€',
    duration: '2h',
    tag: 'activo',
    tagColor: 'bg-green-50 text-green-600',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Cuéntanos tu situación',
    body: 'Ciudad, cuánto tiempo tienes, presupuesto y con quién vas. 4 preguntas, 20 segundos.',
  },
  {
    n: '02',
    title: 'La IA genera 3 planes',
    body: 'GPT‑4o analiza miles de opciones y te devuelve 3 planes concretos, variados y realizables.',
  },
  {
    n: '03',
    title: 'Elige y disfruta',
    body: 'Compara, elige el que más te guste y exporta tu plan al día en PDF.',
  },
]

const FAQS = [
  {
    q: '¿Es realmente gratis?',
    a: '3 generaciones diarias, sin tarjeta de crédito. El plan Pro (4,99€/mes) añade generaciones ilimitadas e historial completo.',
  },
  {
    q: '¿Los planes son personalizados de verdad?',
    a: 'Cada plan se genera en tiempo real con IA usando tu ciudad, presupuesto, tiempo y preferencias. No son plantillas.',
  },
  {
    q: '¿Funciona para cualquier ciudad?',
    a: 'Cualquier ciudad del mundo. Cuanto más específico seas (barrio, zona), mejor será el resultado.',
  },
  {
    q: '¿Puedo cancelar el Pro cuando quiera?',
    a: 'Sin permanencia. Cancela desde tu panel en cualquier momento y tendrás acceso hasta el final del período.',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroBrowserMockup() {
  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-orange-100 to-amber-50 rounded-[32px] blur-3xl opacity-70" />

      {/* Browser window */}
      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-card-elevated overflow-hidden">
        {/* Chrome bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-xs text-gray-400 border border-gray-200 text-center font-medium">
            quehagohoy.es/generar
          </div>
          <div className="w-16" />
        </div>

        {/* App preview */}
        <div className="p-5 space-y-3 bg-gray-50/40">
          <div className="flex items-center gap-2 pb-1">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Madrid · 3h · 25€ · En pareja
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {PREVIEW_PLANS.map((plan, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-lg">
                {plan.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-gray-950 truncate">{plan.title}</span>
                  <span className="text-xs font-black text-orange-500 flex-shrink-0">{plan.cost}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5 truncate">{plan.activity}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${plan.tagColor}`}>
                    {plan.tag}
                  </span>
                  <span className="text-[10px] text-gray-400">{plan.duration}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Export row */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-gray-400">Generado en 6.8s ✓</span>
            <span className="text-[11px] bg-orange-500 text-white font-semibold px-3 py-1.5 rounded-lg cursor-default">
              Exportar PDF
            </span>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 bg-white border border-gray-100 shadow-card rounded-full px-3 py-1.5 flex items-center gap-1.5 animate-float">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-semibold text-gray-900">3 planes listos</span>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" className="fill-orange-100" />
      <path d="M4.5 8l2.5 2.5 4-5" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Subtle radial gradient top */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(249,115,22,0.07),transparent)] pointer-events-none" />
        {/* Dot grid (very subtle) */}
        <div className="absolute inset-0 bg-dot-grid opacity-[0.4] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">

            {/* Left: Copy */}
            <div className="max-w-lg">
              {/* Badge */}
              <div className="badge badge-orange mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                Gratis para empezar · Sin tarjeta de crédito
              </div>

              {/* Headline */}
              <h1 className="text-display text-gray-950 mb-6">
                El plan perfecto,{' '}
                <span className="text-gradient">en segundos.</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-sm">
                Dinos tu ciudad, tiempo libre y presupuesto. La IA genera{' '}
                <strong className="text-gray-700 font-semibold">3 planes concretos para hoy</strong>{' '}
                — sin perder el tiempo buscando.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/register" className="btn-primary text-base px-8 py-3.5">
                  Empezar gratis
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a href="#como-funciona" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors flex items-center gap-1">
                  Cómo funciona
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['bg-orange-400', 'bg-amber-400', 'bg-green-400', 'bg-blue-400'].map((c, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-xs text-white font-bold`}>
                      {['M', 'L', 'A', 'C'][i]}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-gray-950">+2.000</span>{' '}
                  <span className="text-gray-500">planes generados</span>
                </div>
                <div className="flex items-center gap-0.5 ml-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-3.5 h-3.5 text-orange-400" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7L8 1z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs text-gray-500 font-medium">4.9</span>
                </div>
              </div>
            </div>

            {/* Right: Product preview */}
            <div className="hidden lg:block">
              <HeroBrowserMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-gray-50/60 py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x divide-gray-200">
            {[
              { icon: '📍', label: 'Cualquier ciudad del mundo' },
              { icon: '⚡', label: 'Resultado en menos de 10 segundos' },
              { icon: '💰', label: 'Siempre dentro de tu presupuesto' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-3 justify-center sm:px-10">
                <span className="text-xl">{icon}</span>
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ─────────────────────────────────────────────────── */}
      <section id="como-funciona" className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <p className="section-label mb-3">Proceso</p>
            <h2 className="section-title mb-4">Simple. Rápido. Útil.</h2>
            <p className="section-subtitle max-w-md mx-auto">
              En menos de 30 segundos tendrás 3 planes perfectos para tu día.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200" />

            {STEPS.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 bg-white rounded-2xl border-2 border-orange-200 flex items-center justify-center shadow-card">
                  <span className="text-xl font-black text-orange-500 tracking-tighter">{step.n}</span>
                </div>
                <h3 className="font-bold text-gray-950 text-lg mb-3 tracking-tight">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAMPLE OUTPUT ────────────────────────────────────────────────── */}
      <section className="py-28 bg-gray-950 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="section-label text-orange-400 mb-3">Ejemplo real</p>
            <h2 className="section-title text-white mb-4">
              Esto es lo que obtienes
            </h2>
            <p className="text-gray-400 text-lg max-w-lg mx-auto">
              Para Madrid · 3 horas · 25€ · En pareja.
              Generado por la IA en 7 segundos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                emoji: '🎨',
                title: 'Tarde Cultural en el Prado',
                desc: 'Arte, parque y vermut. La tarde perfecta sin gastar casi nada.',
                activities: ['Prado gratis últimas 2h (18:00–20:00)', 'Paseo por el Retiro al atardecer', 'Cañas en La Latina'],
                cost: '8€', hours: '3h', tag: 'cultural',
              },
              {
                emoji: '🍽️',
                title: 'Ruta Gastronómica La Latina',
                desc: 'Los mejores bares de tapas del Madrid más auténtico.',
                activities: ['Aperitivo de vermut en El Tempranillo', 'Tapas en la Cava Baja', 'Postre en Horchatería centenaria'],
                cost: '22€', hours: '2.5h', tag: 'gastronómico',
              },
              {
                emoji: '🌿',
                title: 'Parque y Mercado Urbano',
                desc: 'Naturaleza, productores locales y el mejor desayuno tardío.',
                activities: ['Carrera suave por Casa de Campo', 'Mercado de Maravillas (sábados)', 'Café de especialidad'],
                cost: '12€', hours: '2h', tag: 'activo',
              },
            ].map((plan, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 hover:bg-white/8 transition-colors duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                    {plan.emoji}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-orange-400 uppercase tracking-wider mb-1">Plan {i + 1}</p>
                    <h3 className="font-bold text-white text-sm leading-tight">{plan.title}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{plan.desc}</p>
                  </div>
                </div>

                <ul className="space-y-1.5">
                  {plan.activities.map((a, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="text-orange-500 mt-0.5 flex-shrink-0 font-bold">→</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white">{plan.cost}</span>
                    <span className="text-xs text-gray-500">{plan.hours}</span>
                  </div>
                  <span className="text-[10px] font-semibold bg-white/10 text-gray-300 px-2.5 py-1 rounded-full">
                    {plan.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/register" className="btn-primary text-base px-8 py-3.5">
              Generar mis planes gratis
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section id="precios" className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Precios</p>
            <h2 className="section-title mb-4">Simple. Sin sorpresas.</h2>
            <p className="section-subtitle max-w-md mx-auto">
              Empieza gratis. Actualiza solo si lo necesitas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl border border-gray-200 p-8 flex flex-col bg-white shadow-card">
              <div className="mb-8">
                <h3 className="text-base font-bold text-gray-950 mb-4">Gratis</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-gray-950 tracking-tighter">0€</span>
                  <span className="text-gray-400 text-sm">/mes</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">Para descubrir si funciona para ti.</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {['3 generaciones al día', '3 planes completos por búsqueda', 'Exportar a PDF', 'Sin tarjeta de crédito'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/register" className="btn-secondary w-full py-3 text-sm">
                Empezar gratis
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-orange-500 p-8 flex flex-col relative bg-white shadow-orange overflow-hidden">
              {/* Top fill */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600" />

              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full">
                  Más popular
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-base font-bold text-gray-950 mb-4">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-gray-950 tracking-tighter">4,99€</span>
                  <span className="text-gray-400 text-sm">/mes</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">Para quien tiene muchos planes.</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {[
                  'Generaciones ilimitadas',
                  '3 planes completos por búsqueda',
                  'Historial completo',
                  'Exportar a PDF',
                  'Cancela cuando quieras',
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/register" className="btn-primary w-full py-3 text-sm">
                Empezar con Pro →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="section-label mb-3">FAQ</p>
            <h2 className="section-title">Preguntas frecuentes</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
                <h3 className="font-bold text-gray-950 mb-2 tracking-tight">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label mb-6">Empieza hoy</p>
          <h2 className="text-display text-gray-950 mb-6">
            Deja de decidir.
            <br />
            <span className="text-gradient">Empieza a disfrutar.</span>
          </h2>
          <p className="section-subtitle mb-10 max-w-md mx-auto">
            En 30 segundos tienes 3 planes para hoy.
            Completamente gratis.
          </p>
          <Link href="/register" className="btn-primary text-base px-10 py-4">
            Crear cuenta gratis
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p className="mt-5 text-sm text-gray-400">Sin tarjeta · 3 planes gratis al día · Cancela cuando quieras</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
