export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return

  const { createServiceClient } = await import('./lib/supabase/service')
  const supabase = createServiceClient()

  const { error } = await supabase.storage.createBucket('quinelas', {
    public: false,
    fileSizeLimit: 1024 * 100,
  })

  if (error && !error.message.includes('already exists')) {
    console.error('[quinelas] bucket setup failed:', error.message)
  }
}
