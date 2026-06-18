'use client'

import { useState } from 'react'
import type { Plan } from '@/types'
import { formatCurrency, formatDuration } from '@/lib/utils'

interface PlanCardProps {
  plan: Plan
  index: number
}

const TAG_COLORS = [
  'bg-blue-50 text-blue-600 border-blue-100',
  'bg-green-50 text-green-600 border-green-100',
  'bg-purple-50 text-purple-600 border-purple-100',
  'bg-amber-50 text-amber-600 border-amber-100',
  'bg-pink-50 text-pink-600 border-pink-100',
]

const STAGGER = [
  'animation-delay-100',
  'animation-delay-200',
  'animation-delay-300',
]

function buildClipboardText(plan: Plan, index: number): string {
  const lines = [
    `Plan ${index + 1}: ${plan.emoji} ${plan.title}`,
    '',
    plan.description,
    '',
    ...plan.activities.map((a) => `  → ${a}`),
    '',
    `Coste estimado: ${plan.estimated_cost}€`,
    `Duración: ${formatDuration(plan.duration_hours)}`,
  ]
  if (plan.tip) lines.push('', `Tip: ${plan.tip}`)
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
      // Clipboard API not available
    }
  }

  return (
    <div
      className={`
        group relative bg-white rounded-2xl border border-gray-100
        flex flex-col overflow-hidden
        opacity-0 animate-fade-in-up animation-fill-both
        card-lift
        ${STAGGER[index] ?? ''}
      `}
      style={{ boxShadow: 'theme(boxShadow.card)' }}
    >
      {/* Top accent stripe */}
      <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-500 flex-shrink-0" />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-2xl">
            {plan.emoji}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-orange text-[10px]">Plan {index + 1}</span>
            </div>
            <h3 className="font-bold text-gray-950 text-base leading-tight tracking-tight">
              {plan.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed -mt-1">
          {plan.description}
        </p>

        {/* Activities */}
        <ul className="space-y-2.5 flex-1">
          {plan.activities.map((activity, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <span className="mt-[3px] w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <span className="block w-1.5 h-1.5 rounded-full bg-orange-500" />
              </span>
              <span className="text-gray-700 leading-relaxed">{activity}</span>
            </li>
          ))}
        </ul>

        {/* Tip */}
        {plan.tip && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm text-amber-800 leading-relaxed">
            <span className="font-semibold">Tip — </span>
            {plan.tip}
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between gap-3 mt-auto">
          {/* Meta */}
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Coste</p>
              <p className="text-sm font-bold text-gray-950 mt-0.5">{formatCurrency(plan.estimated_cost)}</p>
            </div>
            <div className="w-px h-7 bg-gray-100" />
            <div>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Duración</p>
              <p className="text-sm font-bold text-gray-950 mt-0.5">{formatDuration(plan.duration_hours)}</p>
            </div>
          </div>

          {/* Tags + copy */}
          <div className="flex items-center gap-1.5">
            {plan.tags.slice(0, 1).map((tag, i) => (
              <span
                key={tag}
                className={`hidden sm:inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border ${TAG_COLORS[i % TAG_COLORS.length]}`}
              >
                {tag}
              </span>
            ))}

            <button
              onClick={() => void handleCopy()}
              title="Copiar plan"
              className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-200 ${
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}
            >
              <span>{copied ? '✓' : '⎘'}</span>
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
