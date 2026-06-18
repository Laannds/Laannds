'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { PlanInput, Plan } from '@/types'
import PlanCard from './PlanCard'

const ExportPDFButton = dynamic(() => import('./ExportPDFButton'), {
  ssr: false,
  loading: () => (
    <button disabled className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 bg-gray-50 text-gray-400 cursor-wait">
      <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin flex-shrink-0" />
      <span>Cargando...</span>
    </button>
  ),
})

const TIME_OPTIONS = [
  { value: 1, label: '1 hora' },
  { value: 2, label: '2 horas' },
  { value: 3, label: '3 horas' },
  { value: 4, label: '4 horas' },
  { value: 6, label: 'Medio día' },
  { value: 8, label: 'Día completo' },
]

const COMPANION_OPTIONS = [
  { value: 'solo', label: 'Solo/a', emoji: '🧍' },
  { value: 'pareja', label: 'En pareja', emoji: '👫' },
  { value: 'amigos', label: 'Con amigos', emoji: '👥' },
  { value: 'familia', label: 'Con familia', emoji: '👨‍👩‍👧' },
]

const MOOD_OPTIONS = [
  { value: 'activo', label: 'Activo', emoji: '⚡' },
  { value: 'tranquilo', label: 'Tranquilo', emoji: '😌' },
  { value: 'cultural', label: 'Cultural', emoji: '🎨' },
  { value: 'gastronómico', label: 'Gastronómico', emoji: '🍽️' },
  { value: 'naturaleza', label: 'Naturaleza', emoji: '🌿' },
  { value: 'social', label: 'Social', emoji: '🎉' },
]

const BUDGET_PRESETS = [10, 20, 50, 100]

const LOADING_MESSAGES = [
  'Analizando tu ciudad...',
  'Buscando las mejores actividades...',
  'Calculando costes y tiempos...',
  'Añadiendo los mejores consejos locales...',
  'Preparando tus planes personalizados...',
]

function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length)
    }, 1800)

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 88) return p
        const increment = p < 40 ? 8 : p < 70 ? 5 : 2
        return Math.min(p + increment, 88)
      })
    }, 400)

    return () => {
      clearInterval(msgInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="relative">
        <div className="text-5xl animate-pulse-slow">🎯</div>
        <div className="absolute -bottom-2 -right-2 w-5 h-5 border-3 border-orange-100 border-t-orange-500 rounded-full animate-spin border-[3px]" />
      </div>

      <div className="text-center space-y-2">
        <p className="font-semibold text-gray-900 text-lg">Generando tus planes...</p>
        <p className="text-gray-500 text-sm min-h-[20px] transition-all duration-300">
          {LOADING_MESSAGES[msgIndex]}
        </p>
      </div>

      <div className="w-64">
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 text-center mt-1.5">Puede tardar hasta 10 segundos</p>
      </div>
    </div>
  )
}

export default function PlanForm() {
  const router = useRouter()
  const [step, setStep] = useState<'form' | 'loading' | 'results'>('form')
  const [plans, setPlans] = useState<Plan[]>([])
  const [error, setError] = useState<string>('')

  const [input, setInput] = useState<PlanInput>({
    budget: 20,
    location: '',
    time: 2,
    companions: 'solo',
    mood: [],
  })

  const toggleMood = (mood: string) => {
    setInput((prev) => ({
      ...prev,
      mood: prev.mood?.includes(mood)
        ? prev.mood.filter((m) => m !== mood)
        : [...(prev.mood ?? []), mood],
    }))
  }

  const doGenerate = async () => {
    setError('')
    setStep('loading')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })

      if (res.status === 401) {
        router.push('/login?redirect=/generar')
        return
      }

      if (res.status === 429) {
        setError(
          'Has alcanzado el límite diario de 3 generaciones. Actualiza a Pro para planes ilimitados.'
        )
        setStep('form')
        return
      }

      if (!res.ok) {
        throw new Error('Error generando planes')
      }

      const data = (await res.json()) as { plans: Plan[] }
      setPlans(data.plans)
      setStep('results')
    } catch {
      setError('Algo salió mal. Por favor, inténtalo de nuevo.')
      setStep('form')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.location.trim()) {
      setError('Por favor, indica tu ciudad o ubicación')
      return
    }
    await doGenerate()
  }

  if (step === 'loading') return <LoadingState />

  if (step === 'results') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tus planes para hoy ✨</h2>
            <p className="text-gray-500 text-sm mt-1">
              📍 {input.location} &nbsp;·&nbsp; ⏱ {input.time}h &nbsp;·&nbsp; 💰 {input.budget}€
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <ExportPDFButton plans={plans} input={input} />
            <button onClick={() => setStep('form')} className="btn-secondary text-sm py-2 px-4">
              ← Nueva búsqueda
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            ¿No te convence ninguno?{' '}
            <button
              onClick={() => void doGenerate()}
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              Regenerar planes →
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-start gap-2">
          <span className="flex-shrink-0 mt-0.5">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Budget + Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            💰 Presupuesto máximo
          </label>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={500}
              value={input.budget}
              onChange={(e) => setInput((p) => ({ ...p, budget: Number(e.target.value) }))}
              className="input-field pr-8"
              placeholder="20"
            />
            <span className="absolute right-3 top-3 text-gray-400 font-medium">€</span>
          </div>
          <div className="flex gap-1.5">
            {BUDGET_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setInput((p) => ({ ...p, budget: preset }))}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium border transition-all ${
                  input.budget === preset
                    ? 'bg-orange-100 text-orange-700 border-orange-300'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-orange-200'
                }`}
              >
                {preset}€
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">📍 Ciudad o lugar</label>
          <input
            type="text"
            value={input.location}
            onChange={(e) => setInput((p) => ({ ...p, location: e.target.value }))}
            className="input-field"
            placeholder="Madrid, Barcelona, Sevilla..."
            required
          />
          <p className="text-xs text-gray-400">Cuanto más específico, mejores planes</p>
        </div>
      </div>

      {/* Time */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">⏱ Tiempo disponible</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {TIME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setInput((p) => ({ ...p, time: opt.value }))}
              className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all ${
                input.time === opt.value
                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Companions */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">👥 ¿Con quién vas?</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COMPANION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                setInput((p) => ({ ...p, companions: opt.value as PlanInput['companions'] }))
              }
              className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all flex items-center gap-2 justify-center ${
                input.companions === opt.value
                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
              }`}
            >
              <span>{opt.emoji}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mood */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          ✨ ¿Qué te apetece?{' '}
          <span className="text-gray-400 font-normal">(opcional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleMood(opt.value)}
              className={`py-2 px-4 rounded-full text-sm font-medium border transition-all ${
                input.mood?.includes(opt.value)
                  ? 'bg-orange-100 text-orange-700 border-orange-300'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-200'
              }`}
            >
              {opt.emoji} {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="w-full btn-primary py-4 text-base">
        ✨ Generar mis 3 planes →
      </button>

      <p className="text-center text-xs text-gray-400">
        Cada generación usa inteligencia artificial · Resultados en ~5-10 segundos
      </p>
    </form>
  )
}
