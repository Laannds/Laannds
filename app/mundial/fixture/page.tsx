'use client'
import { useState } from 'react'
import { MATCHES, TEAMS, type Match } from '@/lib/mundial-data'

const TABS = [
  { id: 'r32',   label: 'Octavos' },
  { id: 'today', label: 'Hoy' },
  { id: 'group', label: 'Grupos' },
] as const

type TabId = typeof TABS[number]['id']

export default function FixturePage() {
  const [tab, setTab] = useState<TabId>('r32')

  const today = '2026-06-27'

  const visibleMatches: Match[] = (() => {
    if (tab === 'today') return MATCHES.filter(m => m.date === today)
    if (tab === 'r32')   return MATCHES.filter(m => m.round === 'r32')
    return MATCHES.filter(m => m.round === 'group')
  })()

  const byDate = groupByDate(visibleMatches)

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-4">
      <h1 className="text-xl font-black text-white mb-1">Fixture</h1>
      <p className="text-xs text-gray-500 mb-4">Mundial 2026 · Todos los partidos</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 bg-white/5 rounded-2xl p-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${
              tab === t.id
                ? 'bg-[#E8192C] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Matches */}
      <div className="space-y-6">
        {byDate.length === 0 && (
          <p className="text-center text-gray-500 py-12 text-sm">Sin partidos para mostrar</p>
        )}
        {byDate.map(({ date, matches }) => (
          <div key={date}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 sticky top-0 bg-[#060B14] py-1">
              {formatDate(date)}
            </p>
            <div className="space-y-2">
              {matches.map(m => <MatchRow key={m.id} match={m} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MatchRow({ match: m }: { match: Match }) {
  const ht = TEAMS[m.homeTeam]
  const at = TEAMS[m.awayTeam]
  const roundLabel = m.round === 'r32' ? 'Octavos' : m.round === 'group' ? `Grupo ${m.group} · J${m.matchday}` : m.round.toUpperCase()

  return (
    <div className={`rounded-2xl border overflow-hidden ${
      m.status === 'live' ? 'border-[#E8192C]/50 bg-[#E8192C]/10'
      : m.status === 'played' ? 'border-white/8 bg-white/5'
      : 'border-white/10 bg-white/5'
    }`}>
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{roundLabel}</span>
        <div className="flex items-center gap-2">
          {m.status === 'live' && (
            <span className="flex items-center gap-1 text-[10px] text-[#E8192C] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse"/>EN VIVO
            </span>
          )}
          {m.status === 'played' && <span className="text-[10px] text-green-400 font-bold">FIN</span>}
          {m.status === 'upcoming' && <span className="text-[10px] text-[#F59E0B] font-semibold">{m.time}</span>}
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 pb-3">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-2xl">{ht?.flag}</span>
          <span className="text-sm font-semibold text-white truncate">{ht?.name}</span>
        </div>
        <div className="text-center min-w-[52px]">
          {m.result
            ? <span className="font-black text-xl text-white tabular-nums">{m.result.home}–{m.result.away}</span>
            : <span className="text-gray-500 font-bold text-sm">VS</span>
          }
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <span className="text-sm font-semibold text-white truncate text-right">{at?.name}</span>
          <span className="text-2xl">{at?.flag}</span>
        </div>
      </div>
      <div className="px-4 pb-2">
        <p className="text-[10px] text-gray-600 text-center">{m.venue} · {m.city}</p>
      </div>
    </div>
  )
}

function groupByDate(matches: Match[]) {
  const map = new Map<string, Match[]>()
  for (const m of matches) {
    if (!map.has(m.date)) map.set(m.date, [])
    map.get(m.date)!.push(m)
  }
  return Array.from(map.entries())
    .sort(([a],[b]) => a.localeCompare(b))
    .map(([date, matches]) => ({ date, matches }))
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
}
