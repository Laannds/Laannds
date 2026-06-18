import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import type { Generation, Profile } from '@/types'

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/dashboard')
  }

  const [{ data: profile }, { data: generations }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase
      .from('generations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  const profileData = profile as Profile | null
  const generationsData = (generations as Generation[]) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Header section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis planes</h1>
            <p className="text-gray-500 mt-1">Historial de tus generaciones</p>
          </div>
          <Link href="/generar" className="btn-primary">
            + Nuevo plan
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-orange-500">{generationsData.length}</div>
            <div className="text-sm text-gray-500 mt-1">Planes generados</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gray-900 capitalize">
              {profileData?.plan || 'free'}
            </div>
            <div className="text-sm text-gray-500 mt-1">Plan actual</div>
          </div>
          <div className="card text-center col-span-2 sm:col-span-1">
            <div className="text-3xl font-bold text-green-500">
              {profileData?.plan === 'free'
                ? `${3 - (profileData?.generations_used || 0)}/3`
                : '∞'}
            </div>
            <div className="text-sm text-gray-500 mt-1">Generaciones hoy</div>
          </div>
        </div>

        {/* Upgrade CTA for free plan */}
        {profileData?.plan === 'free' && (
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold">Actualiza a Pro</h2>
                <p className="text-orange-100 mt-1">
                  Generaciones ilimitadas por solo 4,99€/mes
                </p>
              </div>
              <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors">
                Actualizar ahora
              </button>
            </div>
          </div>
        )}

        {/* Generations list */}
        {generationsData.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-xl font-bold text-gray-900">Aún no has generado planes</h2>
            <p className="text-gray-500 mt-2">¡Empieza ahora y descubre qué hacer hoy!</p>
            <Link href="/generar" className="btn-primary inline-block mt-6">
              Generar mi primer plan
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {generationsData.map((generation) => (
              <div key={generation.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">
                        📍 {generation.input.location}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-sm text-gray-500">⏱ {generation.input.time}h</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-sm text-gray-500">
                        💰 {generation.input.budget}€
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-sm text-gray-500 capitalize">
                        {generation.input.companions}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(generation.created_at)}
                    </p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex-shrink-0">
                    {generation.output.length} planes
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {generation.output.map((plan) => (
                    <div key={plan.id} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{plan.emoji}</span>
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {plan.title}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{plan.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-600">💰 {plan.estimated_cost}€</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-600">⏱ {plan.duration_hours}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
