import type { Plan } from '@/types'
import { formatCurrency, formatDuration } from '@/lib/utils'

interface PlanCardProps {
  plan: Plan
  index: number
}

export default function PlanCard({ plan, index }: PlanCardProps) {
  const tagColors = [
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-purple-100 text-purple-700',
    'bg-yellow-100 text-yellow-700',
    'bg-pink-100 text-pink-700',
  ]

  return (
    <div className="card hover:shadow-md transition-shadow duration-200 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-4xl">{plan.emoji}</span>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
              Plan {index + 1}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{plan.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
        </div>
      </div>

      {/* Activities */}
      <ul className="space-y-2">
        {plan.activities.map((activity, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-orange-400 mt-0.5 flex-shrink-0">→</span>
            <span>{activity}</span>
          </li>
        ))}
      </ul>

      {/* Tip */}
      {plan.tip && (
        <div className="bg-orange-50 rounded-xl p-3 text-sm text-orange-800">
          <span className="font-semibold">💡 Tip: </span>
          {plan.tip}
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
            <span className="text-lg">💰</span>
            <span>{formatCurrency(plan.estimated_cost)}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>⏱</span>
            <span>{formatDuration(plan.duration_hours)}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {plan.tags.slice(0, 2).map((tag, i) => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded-full font-medium ${tagColors[i % tagColors.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
