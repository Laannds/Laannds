'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)

    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100/80 shadow-sm'
          : 'bg-white/0 backdrop-blur-none border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-orange transition-shadow duration-200">
            <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="0.75" fill="currentColor" />
            </svg>
          </div>
          <span className="font-bold text-gray-950 text-[15px] tracking-tight">
            ¿Qué hago hoy?
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {mounted && user ? (
            <>
              <Link href="/generar" className="btn-primary text-sm py-2 px-4 rounded-xl">
                Generar plan
              </Link>
              <Link href="/dashboard" className="btn-ghost text-sm">
                Mis planes
              </Link>
              <button onClick={() => void handleSignOut()} className="btn-ghost text-sm">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost text-sm">
                Iniciar sesión
              </Link>
              <Link href="/register" className="btn-primary text-sm py-2 px-4 rounded-xl">
                Empezar gratis
              </Link>
            </>
          )}
        </nav>

        {/* Mobile: primary CTA + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          {mounted && user ? (
            <Link href="/generar" className="btn-primary text-sm py-2 px-3 rounded-xl">
              Generar
            </Link>
          ) : (
            <Link href="/register" className="btn-primary text-sm py-2 px-3 rounded-xl">
              Empezar
            </Link>
          )}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Abrir menú"
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span
              className={`block w-5 h-[1.5px] bg-gray-700 rounded-full transition-all duration-200 origin-center ${
                menuOpen ? 'translate-y-[6.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-gray-700 rounded-full transition-all duration-200 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-gray-700 rounded-full transition-all duration-200 origin-center ${
                menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-b border-gray-100 bg-white/95 backdrop-blur-xl px-4 py-2 flex flex-col">
          {mounted && user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="btn-ghost text-sm justify-start"
              >
                Mis planes
              </Link>
              <button
                onClick={() => { setMenuOpen(false); void handleSignOut() }}
                className="btn-ghost text-sm justify-start text-left"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="btn-ghost text-sm justify-start"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
