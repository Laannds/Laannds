import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import PlanForm from '@/components/PlanForm'

export default async function GenerarPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/generar')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, generations_used')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Genera tu plan</h1>
          <p className="text-gray-500 mt-2">Cuéntanos tu situación y la IA hará el resto.</p>
          {profile?.plan === 'free' && (
            <div className="mt-3 inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-sm px-3 py-1.5 rounded-full border border-orange-200">
              <span>⚡</span>
              <span>
                Plan gratuito: {3 - (profile.generations_used || 0)} generaciones restantes hoy
              </span>
            </div>
          )}
        </div>
        <div className="card">
          <PlanForm />
        </div>
      </main>
    </div>
  )
}
