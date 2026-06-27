'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/mundial',         label: 'Inicio',   icon: HomeIcon },
  { href: '/mundial/grupos',  label: 'Grupos',   icon: GroupsIcon },
  { href: '/mundial/fixture', label: 'Fixture',  icon: CalendarIcon },
  { href: '/mundial/quiniela',label: 'Quiniela', icon: TrophyIcon },
]

export default function MundialLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <div className="min-h-screen bg-[#060B14] text-white flex flex-col">
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D1526]/95 backdrop-blur-xl border-t border-white/10 pb-safe">
        <div className="flex items-stretch max-w-lg mx-auto">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = path === href || (href !== '/mundial' && path.startsWith(href))
            return (
              <Link key={href} href={href} className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors
                ${active ? 'text-[#E8192C]' : 'text-gray-500 hover:text-gray-300'}`}>
                <Icon active={active} />
                <span className={`text-[10px] font-semibold tracking-wide ${active ? 'text-[#E8192C]' : 'text-gray-500'}`}>{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#E8192C' : 'none'} stroke={active ? '#E8192C' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function GroupsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#E8192C' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}
function CalendarIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#E8192C' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}
function TrophyIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#E8192C' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4H17L19 7C19 10.3 15.9 13 12 13C8.1 13 5 10.3 5 7L7 4Z"/><path d="M5 7H3C3 10 5.5 12 7 12.5"/><path d="M19 7H21C21 10 18.5 12 17 12.5"/>
    </svg>
  )
}
