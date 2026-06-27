import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

type Params = { code: string }

export async function GET(_req: NextRequest, { params }: { params: Promise<Params> }) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 503 })
  }

  const { code } = await params
  const supabase = createServiceClient()

  const { data, error } = await supabase.storage
    .from('quinelas')
    .download(`${code.toUpperCase()}.json`)

  if (error) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }

  const text = await data.text()
  const quiniela = JSON.parse(text)

  return NextResponse.json(quiniela)
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<Params> }) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 503 })
  }

  const { code } = await params
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const supabase = createServiceClient()
  const data = { ...(body as object), code: code.toUpperCase(), updated_at: new Date().toISOString() }
  const buffer = Buffer.from(JSON.stringify(data))

  const { error } = await supabase.storage
    .from('quinelas')
    .upload(`${code.toUpperCase()}.json`, buffer, {
      contentType: 'application/json',
      upsert: true,
    })

  if (error) {
    console.error('[quinelas] update error:', error.message)
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
