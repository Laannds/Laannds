import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generatePlans } from '@/lib/openai'
import type { PlanInput } from '@/types'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  // Get or create profile
  let { data: profile } = await supabase
    .from('profiles')
    .select('plan, generations_used, generations_reset_at')
    .eq('id', user.id)
    .single()

  if (!profile) {
    const { data: newProfile } = await supabase
      .from('profiles')
      .insert({ id: user.id, email: user.email, plan: 'free', generations_used: 0 })
      .select()
      .single()
    profile = newProfile
  }

  // Rate limiting for free plan
  if (profile?.plan === 'free') {
    const resetDate = new Date((profile.generations_reset_at as string | null) || 0)
    const now = new Date()
    const sameDay = resetDate.toDateString() === now.toDateString()

    if (!sameDay) {
      await supabase
        .from('profiles')
        .update({ generations_used: 0, generations_reset_at: now.toISOString() })
        .eq('id', user.id)
      profile.generations_used = 0
    }

    if (sameDay && ((profile.generations_used as number) || 0) >= 3) {
      return NextResponse.json(
        { error: 'Límite diario alcanzado. Actualiza a Pro para planes ilimitados.' },
        { status: 429 }
      )
    }
  }

  let body: PlanInput
  try {
    body = (await request.json()) as PlanInput
  } catch {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const { budget, location, time, companions, mood } = body

  if (!location?.trim() || !time || budget === undefined) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  try {
    const plans = await generatePlans({ budget, location, time, companions, mood })

    // Save generation
    await supabase.from('generations').insert({
      user_id: user.id,
      input: { budget, location, time, companions, mood },
      output: plans,
    })

    // Increment usage counter
    await supabase
      .from('profiles')
      .update({ generations_used: ((profile?.generations_used as number) || 0) + 1 })
      .eq('id', user.id)

    return NextResponse.json({ plans })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: 'Error generando planes. Inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}
