'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function RegisterForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.session) {
      // Logged in directly (email confirmation disabled in Supabase)
      router.push('/generar')
      router.refresh()
    } else {
      // Email confirmation required
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="card py-12">
            <div className="text-6xl mb-4">📧</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Revisa tu email!</h2>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Te hemos enviado un enlace de confirmación a{' '}
              <strong className="text-gray-700">{email}</strong>. Haz clic en el enlace para
              activar tu cuenta.
            </p>
            <Link href="/login" className="btn-primary inline-block">
              Ir al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900">
            <span>🎯</span> ¿Qué hago hoy?
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6">Crea tu cuenta gratis</h1>
          <p className="text-gray-500 mt-2">3 planes gratis al día, sin tarjeta de crédito</p>
        </div>

        <div className="card">
          <form onSubmit={(e) => void handleRegister(e)} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Mínimo 8 caracteres"
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta gratis'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-orange-500 font-semibold hover:text-orange-600">
              Iniciar sesión
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-3">
            Al registrarte aceptas nuestros términos de uso y política de privacidad.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  )
}
