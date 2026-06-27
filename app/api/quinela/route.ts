import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

function randomCode(): string {
  return Math.random().toString(36).toUpperCase().slice(2, 8).padEnd(6, '0')
}

export async function POST(request: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY not configured' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const supabase = createServiceClient()
  const code = randomCode()
  const data = { ...(body as object), code, updated_at: new Date().toISOString() }
  const buffer = Buffer.from(JSON.stringify(data))

  const { error } = await supabase.storage
    .from('quinelas')
    .upload(`${code}.json`, buffer, {
      contentType: 'application/json',
      upsert: false,
    })

  if (error) {
    console.error('[quinelas] upload error:', error.message)
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 })
  }

  return NextResponse.json({ code })
}
