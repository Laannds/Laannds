'use client'

import { useState } from 'react'
import type { Plan } from '@/types'
import { formatCurrency, formatDuration } from '@/lib/utils'

interface PlanCardProps {
  plan: Plan
  index: number
}

const TAG_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-yellow-100 text-yellow-700',
  'bg-pink-100 text-pink-700',
]

const DELAY_CLASSES = ['animation-delay-100', 'animation-delay-200', 'animation-delay-300']

function buildClipboardText(plan: Plan, index: number): string {
  const lines = [
    `Plan ${index + 1}: ${plan.emoji} ${plan.title}`,
    plan.description,
    '',
    ...plan.activities.map((a) => `→ ${a}`),
    '',
    `💰 Coste estimado: ${plan.estimated_cost}€`,
    `⏱ Duración: ${formatDuration(plan.duration_hours)}`,
  ]
  if (plan.tip) lines.push(`💡 Tip: ${plan.tip}`)
  lines.push('', '— Generado con ¿Qué hago hoy? (quehagohoy.es)')
  return lines.join('\n')
}

export default function PlanCard({ plan, index }: PlanCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildClipboardText(plan, index))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers without clipboard API
    }
  }

  return (
    <div
      className={`card hover:shadow-md transition-all duration-200 flex flex-col gap-4 opacity-0 animate-fade-in-up animation-fill-both ${DELAY_CLASSES[index] ?? ''}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-4xl leading-none mt-0.5">{plan.emoji}</span>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
            Plan {index + 1}
          </span>
          <h3 className="font-bold text-gray-900 text-lg leading-tight mt-0.5">{plan.title}</h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{plan.description}</p>
        </div>
      </div>

      {/* Activities */}
      <ul className="space-y-2 flex-1">
        {plan.activities.map((activity, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-orange-400 mt-0.5 flex-shrink-0 font-bold">→</span>
            <span>{activity}</span>
          </li>
        ))}
      </ul>

      {/* Tip */}
      {plan.tip && (
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-sm text-orange-800">
          <span className="font-semibold">💡 Tip: </span>
          {plan.tip}
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
            <span className="text-base">💰</span>
            <span>{formatCurrency(plan.estimated_cost)}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>⏱</span>
            <span>{formatDuration(plan.duration_hours)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-wrap gap-1">
            {plan.tags.slice(0, 2).map((tag, i) => (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[i % TAG_COLORS.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => void handleCopy()}
            title="Copiar plan"
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all duration-200 flex-shrink-0 ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {copied ? (
              <>
                <span>✓</span>
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <span>📋</span>
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
