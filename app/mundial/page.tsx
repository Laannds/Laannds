'use client'
import { MATCHES, TEAMS, GROUPS, computeStandings } from '@/lib/mundial-data'

export default function MundialHome() {
  const today = '2026-06-27'
  const todayMatches = MATCHES.filter(m => m.date === today)
  const recentPlayed = MATCHES.filter(m => m.status === 'played' && m.round !== 'group')
    .slice(-2)
  const upcomingR32 = MATCHES.filter(m => m.status === 'upcoming' && m.round === 'r32').slice(0, 3)

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">FIFA</p>
          <h1 className="text-2xl font-black text-white leading-tight">Mundial 2026</h1>
          <p className="text-xs text-gray-400 mt-0.5">EE.UU · Canadá · México</p>
        </div>
        <div className="bg-[#E8192C]/15 border border-[#E8192C]/30 rounded-2xl px-3 py-2 text-center">
          <p className="text-[10px] text-[#E8192C] font-bold uppercase tracking-wider">En curso</p>
          <p className="text-white font-black text-lg leading-tight">R32</p>
        </div>
      </div>

      {/* LIVE Match */}
      {todayMatches.filter(m => m.status === 'live').map(m => (
        <div key={m.id} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E8192C] to-[#9B0E1C] p-5">
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"/>
            <span className="text-xs text-white/90 font-bold uppercase">En Vivo</span>
          </div>
          <p className="text-xs text-white/70 font-semibold mb-4 uppercase tracking-wider">Octavos de Final</p>
          <div className="flex items-center justify-between gap-3">
            <TeamBlock code={m.homeTeam} align="left" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-black text-white tracking-tight">VS</span>
              <span className="text-xs text-white/60">{m.time} h</span>
            </div>
            <TeamBlock code={m.awayTeam} align="right" />
          </div>
          <p className="text-xs text-white/50 text-center mt-4">{m.venue} · {m.city}</p>
        </div>
      ))}

      {/* Today's upcoming */}
      {todayMatches.filter(m => m.status === 'upcoming').map(m => (
        <MatchCard key={m.id} match={m} label="Hoy" accent />
      ))}

      {/* Recent R32 results */}
      {recentPlayed.length > 0 && (
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Últimos Resultados</h2>
          <div className="space-y-2">
            {recentPlayed.map(m => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {/* Next R32 matches */}
      {upcomingR32.length > 0 && (
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Próximos Octavos</h2>
          <div className="space-y-2">
            {upcomingR32.map(m => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {/* Mini standings for top groups */}
      <section>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Clasificados — Fase Grupos</h2>
        <div className="grid grid-cols-2 gap-2">
          {['A','B','E','F'].map(g => {
            const st = computeStandings(g)
            return (
              <div key={g} className="bg-white/5 rounded-2xl p-3 border border-white/10">
                <p className="text-[10px] font-black text-[#E8192C] mb-2 uppercase">Grupo {g}</p>
                {st.slice(0,2).map((s,i) => (
                  <div key={s.code} className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold w-3 ${i===0?'text-[#F59E0B]':'text-gray-400'}`}>{i===0?'1':'2'}</span>
                    <span className="text-sm">{TEAMS[s.code]?.flag}</span>
                    <span className="text-xs text-white font-semibold flex-1 truncate">{TEAMS[s.code]?.name}</span>
                    <span className="text-xs font-black text-[#F59E0B]">{s.points}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function TeamBlock({ code, align }: { code: string; align: 'left' | 'right' }) {
  const t = TEAMS[code]
  return (
    <div className={`flex-1 flex flex-col items-${align === 'left' ? 'start' : 'end'} gap-1`}>
      <span className="text-4xl">{t?.flag}</span>
      <span className="text-sm font-bold text-white/90">{t?.code}</span>
    </div>
  )
}

function MatchCard({ match: m, label, accent }: { match: typeof MATCHES[0]; label?: string; accent?: boolean }) {
  const ht = TEAMS[m.homeTeam]
  const at = TEAMS[m.awayTeam]
  const dateStr = new Date(m.date + 'T00:00:00').toLocaleDateString('es-ES', { weekday:'short', day:'numeric', month:'short' })
  return (
    <div className={`rounded-2xl p-4 border ${accent
      ? 'bg-white/10 border-white/20'
      : 'bg-white/5 border-white/8'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
          {label ?? dateStr} · {m.time}
        </span>
        {m.status === 'played' && <span className="text-[10px] text-green-400 font-bold">FIN</span>}
        {m.status === 'upcoming' && <span className="text-[10px] text-[#F59E0B] font-bold uppercase">{label ? m.time : 'Próximo'}</span>}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl">{ht?.flag}</span>
        <span className="text-sm font-semibold text-white flex-1">{ht?.name}</span>
        {m.result
          ? <span className="font-black text-lg text-white tabular-nums">{m.result.home}–{m.result.away}</span>
          : <span className="text-gray-500 text-sm font-bold">VS</span>}
        <span className="text-sm font-semibold text-white flex-1 text-right">{at?.name}</span>
        <span className="text-xl">{at?.flag}</span>
      </div>
      <p className="text-[10px] text-gray-500 text-center mt-2">{m.city}</p>
    </div>
  )
}
