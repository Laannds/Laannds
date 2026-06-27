'use client'
import { useState, useEffect } from 'react'
import { MATCHES, TEAMS, ROUND_POINTS, type Match } from '@/lib/mundial-data'

type Prediction = {
  matchId: string
  pick: 'home' | 'draw' | 'away'
}

type Friend = {
  id: string
  name: string
  champion: string
  topScorer: string
  predictions: Prediction[]
}

type SavedData = {
  friends: Friend[]
  createdAt: string
}

const KNOCKOUT_ROUNDS: Match['round'][] = ['r32', 'r16', 'qf', 'sf', 'final']
const knockoutMatches = MATCHES.filter(m => KNOCKOUT_ROUNDS.includes(m.round))

function calcPoints(friend: Friend): number {
  let pts = 0
  for (const pred of friend.predictions) {
    const m = MATCHES.find(x => x.id === pred.matchId)
    if (!m || m.status !== 'played' || !m.result) continue
    const actualPick = m.result.home > m.result.away ? 'home' : m.result.home < m.result.away ? 'away' : 'draw'
    if (pred.pick === actualPick) {
      pts += ROUND_POINTS[m.round] ?? 2
    }
  }
  return pts
}

const TOP_SCORERS = ['K. Mbappé', 'E. Haaland', 'V. Osimhen', 'L. Messi', 'V. Junior', 'R. Lewandowski', 'C. Pulisic', 'R. Yamal', 'B. Saka', 'M. Rashford']

export default function QuinielaPage() {
  const [data, setData] = useState<SavedData | null>(null)
  const [view, setView] = useState<'menu' | 'setup' | 'predict' | 'leaderboard'>('menu')
  const [activeFriend, setActiveFriend] = useState<string | null>(null)
  const [setupNames, setSetupNames] = useState<string[]>(Array(8).fill(''))

  useEffect(() => {
    const saved = localStorage.getItem('mundial-quiniela-2026')
    if (saved) {
      try { setData(JSON.parse(saved)) } catch {}
    }
  }, [])

  function save(d: SavedData) {
    setData(d)
    localStorage.setItem('mundial-quiniela-2026', JSON.stringify(d))
  }

  function createQuiniela() {
    const names = setupNames.map(n => n.trim()).filter(Boolean)
    if (names.length < 2) return alert('Añade al menos 2 nombres')
    const friends: Friend[] = names.map((name, i) => ({
      id: `f${i}`,
      name,
      champion: '',
      topScorer: '',
      predictions: [],
    }))
    save({ friends, createdAt: new Date().toISOString() })
    setView('leaderboard')
  }

  function openPredict(friendId: string) {
    setActiveFriend(friendId)
    setView('predict')
  }

  function updatePrediction(friendId: string, matchId: string, pick: 'home' | 'draw' | 'away') {
    if (!data) return
    const friends = data.friends.map(f => {
      if (f.id !== friendId) return f
      const existing = f.predictions.filter(p => p.matchId !== matchId)
      return { ...f, predictions: [...existing, { matchId, pick }] }
    })
    save({ ...data, friends })
  }

  function updateChampion(friendId: string, champion: string) {
    if (!data) return
    save({ ...data, friends: data.friends.map(f => f.id === friendId ? { ...f, champion } : f) })
  }

  function updateTopScorer(friendId: string, name: string) {
    if (!data) return
    save({ ...data, friends: data.friends.map(f => f.id === friendId ? { ...f, topScorer: name } : f) })
  }

  function resetAll() {
    if (!confirm('¿Seguro que quieres borrar toda la quiniela?')) return
    localStorage.removeItem('mundial-quiniela-2026')
    setData(null)
    setSetupNames(Array(8).fill(''))
    setView('menu')
  }

  // ── MENU ──────────────────────────────────────────────────────────────────
  if (view === 'menu' && !data) {
    return (
      <div className="max-w-lg mx-auto px-4 pt-10 pb-4 flex flex-col items-center gap-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-2xl font-black text-white">Quiniela</h1>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">
            Predice los resultados del Mundial 2026<br/>con tus amigos y gana puntos
          </p>
        </div>
        <div className="w-full space-y-3">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 text-sm">
            <ScoreRow round="Octavos de Final" pts={2} />
            <ScoreRow round="Cuartos de Final" pts={4} />
            <ScoreRow round="Semifinal" pts={6} />
            <ScoreRow round="Gran Final" pts={10} />
          </div>
          <button
            onClick={() => setView('setup')}
            className="w-full bg-[#E8192C] hover:bg-[#c9141f] text-white font-bold py-4 rounded-2xl text-base transition-colors"
          >
            Crear Quiniela
          </button>
        </div>
      </div>
    )
  }

  // ── SETUP ─────────────────────────────────────────────────────────────────
  if (view === 'setup') {
    return (
      <div className="max-w-lg mx-auto px-4 pt-6 pb-4">
        <button onClick={() => setView('menu')} className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          Atrás
        </button>
        <h1 className="text-xl font-black text-white mb-1">Añade a tus amigos</h1>
        <p className="text-xs text-gray-500 mb-5">Mínimo 2, máximo 8 jugadores</p>
        <div className="space-y-2 mb-6">
          {setupNames.map((name, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <span className="text-[#E8192C] font-black text-sm w-6 text-center">{i + 1}</span>
              <input
                type="text"
                placeholder={`Jugador ${i + 1}`}
                value={name}
                onChange={e => {
                  const next = [...setupNames]
                  next[i] = e.target.value
                  setSetupNames(next)
                }}
                className="flex-1 bg-transparent text-white placeholder-gray-600 text-sm font-semibold outline-none"
              />
            </div>
          ))}
        </div>
        <button
          onClick={createQuiniela}
          className="w-full bg-[#E8192C] hover:bg-[#c9141f] text-white font-bold py-4 rounded-2xl text-base transition-colors"
        >
          Empezar Quiniela
        </button>
      </div>
    )
  }

  // ── LEADERBOARD ───────────────────────────────────────────────────────────
  if (view === 'leaderboard' && data) {
    const ranked = [...data.friends]
      .map(f => ({ ...f, pts: calcPoints(f) }))
      .sort((a, b) => b.pts - a.pts)

    return (
      <div className="max-w-lg mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-black text-white">Quiniela</h1>
          <button onClick={resetAll} className="text-[10px] text-gray-600 hover:text-red-400 transition-colors font-semibold">Reiniciar</button>
        </div>
        <p className="text-xs text-gray-500 mb-5">Toca tu nombre para añadir predicciones</p>

        {/* Podium */}
        {ranked.length >= 3 && (
          <div className="flex items-end justify-center gap-3 mb-6 h-28">
            {[ranked[1], ranked[0], ranked[2]].map((f, i) => {
              const pos = i === 1 ? 1 : i === 0 ? 2 : 3
              const heights = ['h-20', 'h-28', 'h-16']
              const colors = ['bg-gray-400', 'bg-[#F59E0B]', 'bg-orange-600']
              return (
                <div key={f.id} className={`flex-1 flex flex-col items-center ${heights[i]}`}>
                  <span className="text-2xl mb-1">{pos === 1 ? '🥇' : pos === 2 ? '🥈' : '🥉'}</span>
                  <span className="text-[10px] text-white font-bold text-center truncate w-full px-1">{f.name.split(' ')[0]}</span>
                  <div className={`w-full ${colors[i]} rounded-t-xl flex items-center justify-center flex-1 mt-1`}>
                    <span className="text-white font-black text-lg">{f.pts}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="space-y-2 mb-5">
          {ranked.map((f, i) => (
            <button
              key={f.id}
              onClick={() => openPredict(f.id)}
              className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-4 py-3 transition-colors"
            >
              <span className={`font-black text-lg w-7 text-center ${i === 0 ? 'text-[#F59E0B]' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-orange-500' : 'text-gray-600'}`}>
                {i + 1}
              </span>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-white">{f.name}</p>
                <p className="text-[10px] text-gray-500">
                  {f.champion ? `Campeón: ${TEAMS[f.champion]?.flag} ${TEAMS[f.champion]?.name}` : 'Sin predicciones aún'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-[#F59E0B]">{f.pts}</p>
                <p className="text-[10px] text-gray-500">pts</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Puntos disponibles</p>
          <div className="space-y-1.5">
            <ScoreRow round="Octavos (16 partidos)" pts={2} />
            <ScoreRow round="Cuartos (8 partidos)" pts={4} />
            <ScoreRow round="Semifinal (4 partidos)" pts={6} />
            <ScoreRow round="Final (1 partido)" pts={10} />
          </div>
        </div>
      </div>
    )
  }

  // ── PREDICT ───────────────────────────────────────────────────────────────
  if (view === 'predict' && data && activeFriend) {
    const friend = data.friends.find(f => f.id === activeFriend)!
    const pts = calcPoints(friend)

    const matchesByRound = knockoutMatches.reduce<Record<string, Match[]>>((acc, m) => {
      if (!acc[m.round]) acc[m.round] = []
      acc[m.round].push(m)
      return acc
    }, {})

    const ROUND_NAMES: Record<string, string> = {
      r32: 'Octavos de Final',
      r16: 'Cuartos de Final',
      qf: 'Semifinal',
      sf: 'Gran Final',
      final: 'Final',
    }

    const allTeamCodes = Object.keys(TEAMS)

    return (
      <div className="max-w-lg mx-auto px-4 pt-6 pb-4">
        <button onClick={() => setView('leaderboard')} className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          Atrás
        </button>

        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-black text-white">{friend.name}</h1>
            <p className="text-xs text-gray-500">Toca para elegir el ganador</p>
          </div>
          <div className="bg-[#F59E0B]/15 border border-[#F59E0B]/30 rounded-xl px-3 py-2 text-center">
            <p className="text-[10px] text-[#F59E0B] font-bold">PTS</p>
            <p className="text-xl font-black text-[#F59E0B]">{pts}</p>
          </div>
        </div>

        {/* Champion pick */}
        <div className="bg-gradient-to-br from-[#F59E0B]/20 to-[#D97706]/10 border border-[#F59E0B]/30 rounded-2xl p-4 mb-4">
          <p className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-3">Campeón del Mundo</p>
          <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
            {allTeamCodes.map(code => {
              const t = TEAMS[code]
              const selected = friend.champion === code
              return (
                <button
                  key={code}
                  onClick={() => updateChampion(friend.id, selected ? '' : code)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl text-center transition-all ${
                    selected ? 'bg-[#F59E0B] shadow-lg scale-105' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl">{t.flag}</span>
                  <span className={`text-[9px] font-bold leading-tight ${selected ? 'text-black' : 'text-gray-400'}`}>{t.code}</span>
                </button>
              )
            })}
          </div>
          {friend.champion && (
            <div className="mt-3 flex items-center gap-2 bg-black/20 rounded-xl px-3 py-2">
              <span className="text-xl">{TEAMS[friend.champion]?.flag}</span>
              <span className="text-sm font-bold text-white">{TEAMS[friend.champion]?.name} es tu campeón</span>
            </div>
          )}
        </div>

        {/* Top scorer pick */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pichichi (Goleador)</p>
          <div className="grid grid-cols-2 gap-2">
            {TOP_SCORERS.map(name => (
              <button
                key={name}
                onClick={() => updateTopScorer(friend.id, friend.topScorer === name ? '' : name)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  friend.topScorer === name ? 'bg-[#E8192C] text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Match predictions by round */}
        {(['r32', 'r16', 'qf', 'sf'] as const).filter(r => matchesByRound[r]).map(round => (
          <div key={round} className="mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{ROUND_NAMES[round]}</p>
            <div className="space-y-2">
              {matchesByRound[round]?.map(m => {
                const ht = TEAMS[m.homeTeam]
                const at = TEAMS[m.awayTeam]
                const pred = friend.predictions.find(p => p.matchId === m.id)
                const actualPick = m.result
                  ? m.result.home > m.result.away ? 'home'
                  : m.result.home < m.result.away ? 'away' : 'draw'
                  : null
                const correct = pred && actualPick && pred.pick === actualPick
                const wrong = pred && actualPick && pred.pick !== actualPick
                const roundPts = ROUND_POINTS[m.round] ?? 2

                return (
                  <div key={m.id} className={`rounded-2xl border p-3 ${
                    correct ? 'border-green-500/40 bg-green-500/10'
                    : wrong ? 'border-red-500/30 bg-red-500/5'
                    : m.status === 'played' ? 'border-white/8 bg-white/5'
                    : 'border-white/10 bg-white/5'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-gray-500 font-semibold">
                        {m.date.slice(5).replace('-', '/')} · {m.time}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {m.result && <span className="text-xs font-black text-white">{m.result.home}–{m.result.away}</span>}
                        {correct && <span className="text-[10px] text-green-400 font-bold">+{roundPts}pts</span>}
                        {wrong && <span className="text-[10px] text-red-400 font-bold">-</span>}
                        {!m.result && <span className="text-[10px] text-[#F59E0B] font-semibold">{roundPts}pts</span>}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { pick: 'home' as const, label: ht?.code ?? '', flag: ht?.flag },
                        { pick: 'draw' as const, label: 'X', flag: '' },
                        { pick: 'away' as const, label: at?.code ?? '', flag: at?.flag },
                      ].map(({ pick, label, flag }) => {
                        const isSelected = pred?.pick === pick
                        const isActual = actualPick === pick
                        return (
                          <button
                            key={pick}
                            onClick={() => !m.result && updatePrediction(friend.id, m.id, pick)}
                            disabled={!!m.result}
                            className={`flex flex-col items-center gap-1 py-2 rounded-xl text-center transition-all
                              ${isSelected && correct ? 'bg-green-500 shadow-lg'
                              : isSelected && wrong ? 'bg-red-500/70'
                              : isSelected ? 'bg-[#E8192C] shadow-md'
                              : isActual ? 'bg-white/15'
                              : 'bg-white/5 hover:bg-white/10'}
                              ${m.result ? 'cursor-default' : 'cursor-pointer active:scale-95'}
                            `}
                          >
                            {flag && <span className="text-lg">{flag}</span>}
                            <span className={`text-[10px] font-bold ${isSelected ? 'text-white' : 'text-gray-400'}`}>{label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Fallback to leaderboard if data exists
  if (data && view === 'menu') {
    setView('leaderboard')
    return null
  }

  return null
}

function ScoreRow({ round, pts }: { round: string; pts: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">{round}</span>
      <span className="text-xs font-black text-[#F59E0B]">+{pts} pts</span>
    </div>
  )
}
