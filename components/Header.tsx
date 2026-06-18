'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  // During SSR/prerender, show unauthenticated nav
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span className="font-bold text-gray-900 text-lg">¿Qué hago hoy?</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Iniciar sesión
            </Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">
              Empezar gratis
            </Link>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <span className="font-bold text-gray-900 text-lg">¿Qué hago hoy?</span>
        </Link>

        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/generar" className="btn-primary text-sm py-2 px-4">
                Generar plan
              </Link>
              <Link href="/dashboard" className="btn-secondary text-sm py-2 px-4">
                Mis planes
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link href="/register" className="btn-primary text-sm py-2 px-4">
                Empezar gratis
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
