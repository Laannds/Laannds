'use client'
import { useState } from 'react'
import { GROUPS, TEAMS, MATCHES, computeStandings } from '@/lib/mundial-data'

export default function GruposPage() {
  const [expanded, setExpanded] = useState<string | null>('A')
  const groupIds = Object.keys(GROUPS)

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-4">
      <h1 className="text-xl font-black text-white mb-1">Grupos</h1>
      <p className="text-xs text-gray-500 mb-5">Fase de grupos completa · 48 selecciones</p>
      <div className="space-y-3">
        {groupIds.map(g => {
          const standings = computeStandings(g)
          const isOpen = expanded === g
          return (
            <div key={g} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : g)}
                className="w-full flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-[#E8192C] bg-[#E8192C]/15 rounded-lg px-2 py-1 min-w-[2rem] text-center">
                    {g}
                  </span>
                  <div className="flex gap-1.5">
                    {GROUPS[g].map(code => (
                      <span key={code} className="text-lg">{TEAMS[code]?.flag}</span>
                    ))}
                  </div>
                </div>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {isOpen && (
                <div className="border-t border-white/10">
                  {/* Standings table */}
                  <div className="px-4 py-3 overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-gray-500 uppercase text-[10px] tracking-wider">
                          <th className="text-left pb-2 font-semibold w-4">#</th>
                          <th className="text-left pb-2 font-semibold">Selección</th>
                          <th className="text-center pb-2 font-semibold w-7">PJ</th>
                          <th className="text-center pb-2 font-semibold w-7">G</th>
                          <th className="text-center pb-2 font-semibold w-7">E</th>
                          <th className="text-center pb-2 font-semibold w-7">P</th>
                          <th className="text-center pb-2 font-semibold w-7">DG</th>
                          <th className="text-center pb-2 font-bold text-[#F59E0B] w-7">Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {standings.map((s, i) => {
                          const t = TEAMS[s.code]
                          const qualified = i < 2
                          return (
                            <tr key={s.code} className={`${qualified ? 'opacity-100' : 'opacity-50'}`}>
                              <td className="py-1.5 pr-2">
                                <span className={`text-[10px] font-bold ${i === 0 ? 'text-[#F59E0B]' : i === 1 ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {i + 1}
                                </span>
                              </td>
                              <td className="py-1.5">
                                <div className="flex items-center gap-2">
                                  {qualified && (
                                    <span className="w-1 h-1 rounded-full bg-[#22C55E] inline-block"/>
                                  )}
                                  <span className="text-base">{t?.flag}</span>
                                  <span className={`font-semibold ${qualified ? 'text-white' : 'text-gray-500'}`}>
                                    {t?.name}
                                  </span>
                                </div>
                              </td>
                              <td className="text-center py-1.5 text-gray-400">{s.played}</td>
                              <td className="text-center py-1.5 text-gray-400">{s.won}</td>
                              <td className="text-center py-1.5 text-gray-400">{s.drawn}</td>
                              <td className="text-center py-1.5 text-gray-400">{s.lost}</td>
                              <td className="text-center py-1.5 text-gray-400">
                                {s.gd > 0 ? `+${s.gd}` : s.gd}
                              </td>
                              <td className="text-center py-1.5 font-black text-white">{s.points}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <p className="text-[9px] text-gray-600 mt-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block"/>
                      Clasificados a Octavos de Final
                    </p>
                  </div>
                  {/* Group matches */}
                  <div className="px-4 pb-3 space-y-2">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Partidos</p>
                    {MATCHES.filter(m => m.group === g).map(m => {
                      const ht = TEAMS[m.homeTeam]
                      const at = TEAMS[m.awayTeam]
                      return (
                        <div key={m.id} className="flex items-center gap-2 text-xs bg-white/5 rounded-xl px-3 py-2">
                          <span className="text-gray-500 w-4 text-center">{m.matchday}</span>
                          <span className="text-base">{ht?.flag}</span>
                          <span className="text-gray-300 flex-1 truncate">{ht?.code}</span>
                          {m.result
                            ? <span className="font-black text-white tabular-nums">{m.result.home}–{m.result.away}</span>
                            : <span className="text-gray-600">–</span>
                          }
                          <span className="text-gray-300 flex-1 text-right truncate">{at?.code}</span>
                          <span className="text-base">{at?.flag}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
