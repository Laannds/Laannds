export type Team = {
  code: string
  name: string
  flag: string
  group: string
}

export type MatchResult = {
  home: number
  away: number
}

export type Match = {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  venue: string
  city: string
  round: 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'third' | 'final'
  group?: string
  matchday?: number
  result?: MatchResult
  status: 'played' | 'live' | 'upcoming'
}

export const TEAMS: Record<string, Team> = {
  // Group A
  BRA: { code: 'BRA', name: 'Brasil',       flag: '🇧🇷', group: 'A' },
  JPN: { code: 'JPN', name: 'Japón',        flag: '🇯🇵', group: 'A' },
  SUI: { code: 'SUI', name: 'Suiza',        flag: '🇨🇭', group: 'A' },
  GHA: { code: 'GHA', name: 'Ghana',        flag: '🇬🇭', group: 'A' },
  // Group B
  FRA: { code: 'FRA', name: 'Francia',      flag: '🇫🇷', group: 'B' },
  DEN: { code: 'DEN', name: 'Dinamarca',    flag: '🇩🇰', group: 'B' },
  IRN: { code: 'IRN', name: 'Irán',         flag: '🇮🇷', group: 'B' },
  CMR: { code: 'CMR', name: 'Camerún',      flag: '🇨🇲', group: 'B' },
  // Group C
  COL: { code: 'COL', name: 'Colombia',     flag: '🇨🇴', group: 'C' },
  ENG: { code: 'ENG', name: 'Inglaterra',   flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'C' },
  AUS: { code: 'AUS', name: 'Australia',    flag: '🇦🇺', group: 'C' },
  IRQ: { code: 'IRQ', name: 'Irak',         flag: '🇮🇶', group: 'C' },
  // Group D
  GER: { code: 'GER', name: 'Alemania',     flag: '🇩🇪', group: 'D' },
  NGA: { code: 'NGA', name: 'Nigeria',      flag: '🇳🇬', group: 'D' },
  POL: { code: 'POL', name: 'Polonia',      flag: '🇵🇱', group: 'D' },
  KSA: { code: 'KSA', name: 'Arabia Saudí', flag: '🇸🇦', group: 'D' },
  // Group E
  USA: { code: 'USA', name: 'Estados Unidos', flag: '🇺🇸', group: 'E' },
  MAR: { code: 'MAR', name: 'Marruecos',    flag: '🇲🇦', group: 'E' },
  SRB: { code: 'SRB', name: 'Serbia',       flag: '🇷🇸', group: 'E' },
  CHN: { code: 'CHN', name: 'China',        flag: '🇨🇳', group: 'E' },
  // Group F
  NED: { code: 'NED', name: 'Países Bajos', flag: '🇳🇱', group: 'F' },
  MEX: { code: 'MEX', name: 'México',       flag: '🇲🇽', group: 'F' },
  SEN: { code: 'SEN', name: 'Senegal',      flag: '🇸🇳', group: 'F' },
  KOR: { code: 'KOR', name: 'Corea del Sur',flag: '🇰🇷', group: 'F' },
  // Group G
  BEL: { code: 'BEL', name: 'Bélgica',     flag: '🇧🇪', group: 'G' },
  CAN: { code: 'CAN', name: 'Canadá',       flag: '🇨🇦', group: 'G' },
  ALG: { code: 'ALG', name: 'Argelia',      flag: '🇩🇿', group: 'G' },
  JOR: { code: 'JOR', name: 'Jordania',     flag: '🇯🇴', group: 'G' },
  // Group H
  ESP: { code: 'ESP', name: 'España',       flag: '🇪🇸', group: 'H' },
  URU: { code: 'URU', name: 'Uruguay',      flag: '🇺🇾', group: 'H' },
  EGY: { code: 'EGY', name: 'Egipto',       flag: '🇪🇬', group: 'H' },
  IDN: { code: 'IDN', name: 'Indonesia',    flag: '🇮🇩', group: 'H' },
  // Group I
  ARG: { code: 'ARG', name: 'Argentina',    flag: '🇦🇷', group: 'I' },
  CRO: { code: 'CRO', name: 'Croacia',      flag: '🇭🇷', group: 'I' },
  RSA: { code: 'RSA', name: 'Sudáfrica',    flag: '🇿🇦', group: 'I' },
  UZB: { code: 'UZB', name: 'Uzbekistán',   flag: '🇺🇿', group: 'I' },
  // Group J
  POR: { code: 'POR', name: 'Portugal',     flag: '🇵🇹', group: 'J' },
  PAR: { code: 'PAR', name: 'Paraguay',     flag: '🇵🇾', group: 'J' },
  COD: { code: 'COD', name: 'RD Congo',     flag: '🇨🇩', group: 'J' },
  NZL: { code: 'NZL', name: 'Nueva Zelanda',flag: '🇳🇿', group: 'J' },
  // Group K
  ITA: { code: 'ITA', name: 'Italia',       flag: '🇮🇹', group: 'K' },
  ECU: { code: 'ECU', name: 'Ecuador',      flag: '🇪🇨', group: 'K' },
  HON: { code: 'HON', name: 'Honduras',     flag: '🇭🇳', group: 'K' },
  AUT: { code: 'AUT', name: 'Austria',      flag: '🇦🇹', group: 'K' },
  // Group L
  UKR: { code: 'UKR', name: 'Ucrania',      flag: '🇺🇦', group: 'L' },
  SCO: { code: 'SCO', name: 'Escocia',      flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'L' },
  PAN: { code: 'PAN', name: 'Panamá',       flag: '🇵🇦', group: 'L' },
  CRC: { code: 'CRC', name: 'Costa Rica',   flag: '🇨🇷', group: 'L' },
}

export const GROUPS: Record<string, string[]> = {
  A: ['BRA', 'JPN', 'SUI', 'GHA'],
  B: ['FRA', 'DEN', 'IRN', 'CMR'],
  C: ['COL', 'ENG', 'AUS', 'IRQ'],
  D: ['GER', 'NGA', 'POL', 'KSA'],
  E: ['USA', 'MAR', 'SRB', 'CHN'],
  F: ['NED', 'MEX', 'SEN', 'KOR'],
  G: ['BEL', 'CAN', 'ALG', 'JOR'],
  H: ['ESP', 'URU', 'EGY', 'IDN'],
  I: ['ARG', 'CRO', 'RSA', 'UZB'],
  J: ['POR', 'PAR', 'COD', 'NZL'],
  K: ['ITA', 'ECU', 'HON', 'AUT'],
  L: ['UKR', 'SCO', 'PAN', 'CRC'],
}

export const MATCHES: Match[] = [
  // ── GROUP A ──────────────────────────────────────────────────────────────
  { id:'a1', homeTeam:'BRA', awayTeam:'GHA', date:'2026-06-11', time:'16:00', venue:'SoFi Stadium',        city:'Los Ángeles',  round:'group', group:'A', matchday:1, result:{home:3,away:0}, status:'played' },
  { id:'a2', homeTeam:'JPN', awayTeam:'SUI', date:'2026-06-11', time:'19:00', venue:'MetLife Stadium',     city:'Nueva York',   round:'group', group:'A', matchday:1, result:{home:2,away:0}, status:'played' },
  { id:'a3', homeTeam:'BRA', awayTeam:'JPN', date:'2026-06-15', time:'16:00', venue:'SoFi Stadium',        city:'Los Ángeles',  round:'group', group:'A', matchday:2, result:{home:2,away:0}, status:'played' },
  { id:'a4', homeTeam:'SUI', awayTeam:'GHA', date:'2026-06-15', time:'19:00', venue:'AT&T Stadium',        city:'Dallas',       round:'group', group:'A', matchday:2, result:{home:3,away:1}, status:'played' },
  { id:'a5', homeTeam:'BRA', awayTeam:'SUI', date:'2026-06-19', time:'20:00', venue:'SoFi Stadium',        city:'Los Ángeles',  round:'group', group:'A', matchday:3, result:{home:1,away:0}, status:'played' },
  { id:'a6', homeTeam:'JPN', awayTeam:'GHA', date:'2026-06-19', time:'20:00', venue:'MetLife Stadium',     city:'Nueva York',   round:'group', group:'A', matchday:3, result:{home:2,away:1}, status:'played' },
  // ── GROUP B ──────────────────────────────────────────────────────────────
  { id:'b1', homeTeam:'FRA', awayTeam:'CMR', date:'2026-06-12', time:'13:00', venue:'Estadio Azteca',      city:'Ciudad de México', round:'group', group:'B', matchday:1, result:{home:3,away:0}, status:'played' },
  { id:'b2', homeTeam:'DEN', awayTeam:'IRN', date:'2026-06-12', time:'16:00', venue:'BC Place',            city:'Vancouver',    round:'group', group:'B', matchday:1, result:{home:2,away:0}, status:'played' },
  { id:'b3', homeTeam:'FRA', awayTeam:'DEN', date:'2026-06-16', time:'13:00', venue:'Estadio Azteca',      city:'Ciudad de México', round:'group', group:'B', matchday:2, result:{home:2,away:0}, status:'played' },
  { id:'b4', homeTeam:'IRN', awayTeam:'CMR', date:'2026-06-16', time:'16:00', venue:'BC Place',            city:'Vancouver',    round:'group', group:'B', matchday:2, result:{home:1,away:0}, status:'played' },
  { id:'b5', homeTeam:'FRA', awayTeam:'IRN', date:'2026-06-20', time:'20:00', venue:'Estadio Azteca',      city:'Ciudad de México', round:'group', group:'B', matchday:3, result:{home:1,away:0}, status:'played' },
  { id:'b6', homeTeam:'DEN', awayTeam:'CMR', date:'2026-06-20', time:'20:00', venue:'BC Place',            city:'Vancouver',    round:'group', group:'B', matchday:3, result:{home:3,away:0}, status:'played' },
  // ── GROUP C ──────────────────────────────────────────────────────────────
  { id:'c1', homeTeam:'COL', awayTeam:'IRQ', date:'2026-06-12', time:'19:00', venue:'Lumen Field',         city:'Seattle',      round:'group', group:'C', matchday:1, result:{home:3,away:0}, status:'played' },
  { id:'c2', homeTeam:'ENG', awayTeam:'AUS', date:'2026-06-12', time:'22:00', venue:'Allegiant Stadium',   city:'Las Vegas',    round:'group', group:'C', matchday:1, result:{home:2,away:0}, status:'played' },
  { id:'c3', homeTeam:'COL', awayTeam:'ENG', date:'2026-06-16', time:'19:00', venue:'Lumen Field',         city:'Seattle',      round:'group', group:'C', matchday:2, result:{home:1,away:0}, status:'played' },
  { id:'c4', homeTeam:'AUS', awayTeam:'IRQ', date:'2026-06-16', time:'22:00', venue:'Allegiant Stadium',   city:'Las Vegas',    round:'group', group:'C', matchday:2, result:{home:2,away:1}, status:'played' },
  { id:'c5', homeTeam:'COL', awayTeam:'AUS', date:'2026-06-20', time:'20:00', venue:'Lumen Field',         city:'Seattle',      round:'group', group:'C', matchday:3, result:{home:2,away:0}, status:'played' },
  { id:'c6', homeTeam:'ENG', awayTeam:'IRQ', date:'2026-06-20', time:'20:00', venue:'Allegiant Stadium',   city:'Las Vegas',    round:'group', group:'C', matchday:3, result:{home:3,away:0}, status:'played' },
  // ── GROUP D ──────────────────────────────────────────────────────────────
  { id:'d1', homeTeam:'GER', awayTeam:'KSA', date:'2026-06-13', time:'13:00', venue:'Gillette Stadium',    city:'Boston',       round:'group', group:'D', matchday:1, result:{home:4,away:0}, status:'played' },
  { id:'d2', homeTeam:'NGA', awayTeam:'POL', date:'2026-06-13', time:'16:00', venue:'Arrowhead Stadium',   city:'Kansas City',  round:'group', group:'D', matchday:1, result:{home:1,away:0}, status:'played' },
  { id:'d3', homeTeam:'GER', awayTeam:'NGA', date:'2026-06-17', time:'13:00', venue:'Gillette Stadium',    city:'Boston',       round:'group', group:'D', matchday:2, result:{home:2,away:0}, status:'played' },
  { id:'d4', homeTeam:'POL', awayTeam:'KSA', date:'2026-06-17', time:'16:00', venue:'Arrowhead Stadium',   city:'Kansas City',  round:'group', group:'D', matchday:2, result:{home:2,away:1}, status:'played' },
  { id:'d5', homeTeam:'GER', awayTeam:'POL', date:'2026-06-21', time:'20:00', venue:'Gillette Stadium',    city:'Boston',       round:'group', group:'D', matchday:3, result:{home:1,away:0}, status:'played' },
  { id:'d6', homeTeam:'NGA', awayTeam:'KSA', date:'2026-06-21', time:'20:00', venue:'Arrowhead Stadium',   city:'Kansas City',  round:'group', group:'D', matchday:3, result:{home:2,away:0}, status:'played' },
  // ── GROUP E ──────────────────────────────────────────────────────────────
  { id:'e1', homeTeam:'USA', awayTeam:'CHN', date:'2026-06-13', time:'19:00', venue:'MetLife Stadium',     city:'Nueva York',   round:'group', group:'E', matchday:1, result:{home:3,away:0}, status:'played' },
  { id:'e2', homeTeam:'MAR', awayTeam:'SRB', date:'2026-06-13', time:'22:00', venue:'SoFi Stadium',        city:'Los Ángeles',  round:'group', group:'E', matchday:1, result:{home:2,away:0}, status:'played' },
  { id:'e3', homeTeam:'USA', awayTeam:'MAR', date:'2026-06-17', time:'19:00', venue:'MetLife Stadium',     city:'Nueva York',   round:'group', group:'E', matchday:2, result:{home:1,away:1}, status:'played' },
  { id:'e4', homeTeam:'SRB', awayTeam:'CHN', date:'2026-06-17', time:'22:00', venue:'SoFi Stadium',        city:'Los Ángeles',  round:'group', group:'E', matchday:2, result:{home:3,away:0}, status:'played' },
  { id:'e5', homeTeam:'USA', awayTeam:'SRB', date:'2026-06-21', time:'20:00', venue:'MetLife Stadium',     city:'Nueva York',   round:'group', group:'E', matchday:3, result:{home:2,away:1}, status:'played' },
  { id:'e6', homeTeam:'MAR', awayTeam:'CHN', date:'2026-06-21', time:'20:00', venue:'SoFi Stadium',        city:'Los Ángeles',  round:'group', group:'E', matchday:3, result:{home:2,away:0}, status:'played' },
  // ── GROUP F ──────────────────────────────────────────────────────────────
  { id:'f1', homeTeam:'NED', awayTeam:'KOR', date:'2026-06-14', time:'13:00', venue:'AT&T Stadium',        city:'Dallas',       round:'group', group:'F', matchday:1, result:{home:3,away:1}, status:'played' },
  { id:'f2', homeTeam:'MEX', awayTeam:'SEN', date:'2026-06-14', time:'16:00', venue:'Estadio Guadalajara', city:'Guadalajara',  round:'group', group:'F', matchday:1, result:{home:1,away:0}, status:'played' },
  { id:'f3', homeTeam:'NED', awayTeam:'MEX', date:'2026-06-18', time:'13:00', venue:'AT&T Stadium',        city:'Dallas',       round:'group', group:'F', matchday:2, result:{home:2,away:0}, status:'played' },
  { id:'f4', homeTeam:'SEN', awayTeam:'KOR', date:'2026-06-18', time:'16:00', venue:'Estadio Guadalajara', city:'Guadalajara',  round:'group', group:'F', matchday:2, result:{home:2,away:1}, status:'played' },
  { id:'f5', homeTeam:'NED', awayTeam:'SEN', date:'2026-06-22', time:'20:00', venue:'AT&T Stadium',        city:'Dallas',       round:'group', group:'F', matchday:3, result:{home:1,away:0}, status:'played' },
  { id:'f6', homeTeam:'MEX', awayTeam:'KOR', date:'2026-06-22', time:'20:00', venue:'Estadio Guadalajara', city:'Guadalajara',  round:'group', group:'F', matchday:3, result:{home:2,away:0}, status:'played' },
  // ── GROUP G ──────────────────────────────────────────────────────────────
  { id:'g1', homeTeam:'BEL', awayTeam:'JOR', date:'2026-06-14', time:'19:00', venue:'BC Place',            city:'Vancouver',    round:'group', group:'G', matchday:1, result:{home:2,away:0}, status:'played' },
  { id:'g2', homeTeam:'CAN', awayTeam:'ALG', date:'2026-06-14', time:'22:00', venue:'BMO Field',           city:'Toronto',      round:'group', group:'G', matchday:1, result:{home:2,away:1}, status:'played' },
  { id:'g3', homeTeam:'BEL', awayTeam:'CAN', date:'2026-06-18', time:'19:00', venue:'BC Place',            city:'Vancouver',    round:'group', group:'G', matchday:2, result:{home:2,away:1}, status:'played' },
  { id:'g4', homeTeam:'ALG', awayTeam:'JOR', date:'2026-06-18', time:'22:00', venue:'BMO Field',           city:'Toronto',      round:'group', group:'G', matchday:2, result:{home:1,away:0}, status:'played' },
  { id:'g5', homeTeam:'BEL', awayTeam:'ALG', date:'2026-06-22', time:'20:00', venue:'BC Place',            city:'Vancouver',    round:'group', group:'G', matchday:3, result:{home:1,away:0}, status:'played' },
  { id:'g6', homeTeam:'CAN', awayTeam:'JOR', date:'2026-06-22', time:'20:00', venue:'BMO Field',           city:'Toronto',      round:'group', group:'G', matchday:3, result:{home:3,away:0}, status:'played' },
  // ── GROUP H ──────────────────────────────────────────────────────────────
  { id:'h1', homeTeam:'ESP', awayTeam:'IDN', date:'2026-06-15', time:'13:00', venue:'Estadio Azteca',      city:'Ciudad de México', round:'group', group:'H', matchday:1, result:{home:3,away:0}, status:'played' },
  { id:'h2', homeTeam:'URU', awayTeam:'EGY', date:'2026-06-15', time:'16:00', venue:'Hard Rock Stadium',   city:'Miami',        round:'group', group:'H', matchday:1, result:{home:2,away:0}, status:'played' },
  { id:'h3', homeTeam:'ESP', awayTeam:'URU', date:'2026-06-19', time:'13:00', venue:'Estadio Azteca',      city:'Ciudad de México', round:'group', group:'H', matchday:2, result:{home:2,away:1}, status:'played' },
  { id:'h4', homeTeam:'EGY', awayTeam:'IDN', date:'2026-06-19', time:'16:00', venue:'Hard Rock Stadium',   city:'Miami',        round:'group', group:'H', matchday:2, result:{home:2,away:0}, status:'played' },
  { id:'h5', homeTeam:'ESP', awayTeam:'EGY', date:'2026-06-23', time:'20:00', venue:'Estadio Azteca',      city:'Ciudad de México', round:'group', group:'H', matchday:3, result:{home:1,away:0}, status:'played' },
  { id:'h6', homeTeam:'URU', awayTeam:'IDN', date:'2026-06-23', time:'20:00', venue:'Hard Rock Stadium',   city:'Miami',        round:'group', group:'H', matchday:3, result:{home:3,away:0}, status:'played' },
  // ── GROUP I ──────────────────────────────────────────────────────────────
  { id:'i1', homeTeam:'ARG', awayTeam:'UZB', date:'2026-06-15', time:'19:00', venue:'MetLife Stadium',     city:'Nueva York',   round:'group', group:'I', matchday:1, result:{home:3,away:0}, status:'played' },
  { id:'i2', homeTeam:'CRO', awayTeam:'RSA', date:'2026-06-15', time:'22:00', venue:'Lumen Field',         city:'Seattle',      round:'group', group:'I', matchday:1, result:{home:2,away:0}, status:'played' },
  { id:'i3', homeTeam:'ARG', awayTeam:'CRO', date:'2026-06-19', time:'19:00', venue:'MetLife Stadium',     city:'Nueva York',   round:'group', group:'I', matchday:2, result:{home:2,away:0}, status:'played' },
  { id:'i4', homeTeam:'RSA', awayTeam:'UZB', date:'2026-06-19', time:'22:00', venue:'Lumen Field',         city:'Seattle',      round:'group', group:'I', matchday:2, result:{home:2,away:1}, status:'played' },
  { id:'i5', homeTeam:'ARG', awayTeam:'RSA', date:'2026-06-23', time:'20:00', venue:'MetLife Stadium',     city:'Nueva York',   round:'group', group:'I', matchday:3, result:{home:1,away:0}, status:'played' },
  { id:'i6', homeTeam:'CRO', awayTeam:'UZB', date:'2026-06-23', time:'20:00', venue:'Lumen Field',         city:'Seattle',      round:'group', group:'I', matchday:3, result:{home:3,away:0}, status:'played' },
  // ── GROUP J ──────────────────────────────────────────────────────────────
  { id:'j1', homeTeam:'POR', awayTeam:'NZL', date:'2026-06-16', time:'13:00', venue:'Estadio Monterrey',   city:'Monterrey',    round:'group', group:'J', matchday:1, result:{home:4,away:0}, status:'played' },
  { id:'j2', homeTeam:'PAR', awayTeam:'COD', date:'2026-06-16', time:'16:00', venue:'Gillette Stadium',    city:'Boston',       round:'group', group:'J', matchday:1, result:{home:1,away:0}, status:'played' },
  { id:'j3', homeTeam:'POR', awayTeam:'PAR', date:'2026-06-20', time:'13:00', venue:'Estadio Monterrey',   city:'Monterrey',    round:'group', group:'J', matchday:2, result:{home:2,away:0}, status:'played' },
  { id:'j4', homeTeam:'COD', awayTeam:'NZL', date:'2026-06-20', time:'16:00', venue:'Gillette Stadium',    city:'Boston',       round:'group', group:'J', matchday:2, result:{home:2,away:0}, status:'played' },
  { id:'j5', homeTeam:'POR', awayTeam:'COD', date:'2026-06-24', time:'20:00', venue:'Estadio Monterrey',   city:'Monterrey',    round:'group', group:'J', matchday:3, result:{home:1,away:0}, status:'played' },
  { id:'j6', homeTeam:'PAR', awayTeam:'NZL', date:'2026-06-24', time:'20:00', venue:'Gillette Stadium',    city:'Boston',       round:'group', group:'J', matchday:3, result:{home:2,away:1}, status:'played' },
  // ── GROUP K ──────────────────────────────────────────────────────────────
  { id:'k1', homeTeam:'ITA', awayTeam:'HON', date:'2026-06-16', time:'19:00', venue:'Arrowhead Stadium',   city:'Kansas City',  round:'group', group:'K', matchday:1, result:{home:2,away:0}, status:'played' },
  { id:'k2', homeTeam:'ECU', awayTeam:'AUT', date:'2026-06-16', time:'22:00', venue:'Hard Rock Stadium',   city:'Miami',        round:'group', group:'K', matchday:1, result:{home:1,away:0}, status:'played' },
  { id:'k3', homeTeam:'ITA', awayTeam:'ECU', date:'2026-06-20', time:'19:00', venue:'Arrowhead Stadium',   city:'Kansas City',  round:'group', group:'K', matchday:2, result:{home:2,away:1}, status:'played' },
  { id:'k4', homeTeam:'AUT', awayTeam:'HON', date:'2026-06-20', time:'22:00', venue:'Hard Rock Stadium',   city:'Miami',        round:'group', group:'K', matchday:2, result:{home:2,away:0}, status:'played' },
  { id:'k5', homeTeam:'ITA', awayTeam:'AUT', date:'2026-06-24', time:'20:00', venue:'Arrowhead Stadium',   city:'Kansas City',  round:'group', group:'K', matchday:3, result:{home:1,away:0}, status:'played' },
  { id:'k6', homeTeam:'ECU', awayTeam:'HON', date:'2026-06-24', time:'20:00', venue:'Hard Rock Stadium',   city:'Miami',        round:'group', group:'K', matchday:3, result:{home:3,away:1}, status:'played' },
  // ── GROUP L ──────────────────────────────────────────────────────────────
  { id:'l1', homeTeam:'UKR', awayTeam:'CRC', date:'2026-06-17', time:'13:00', venue:'Estadio BBVA',        city:'Monterrey',    round:'group', group:'L', matchday:1, result:{home:2,away:0}, status:'played' },
  { id:'l2', homeTeam:'SCO', awayTeam:'PAN', date:'2026-06-17', time:'16:00', venue:'Lincoln Financial Field', city:'Filadelfia', round:'group', group:'L', matchday:1, result:{home:1,away:0}, status:'played' },
  { id:'l3', homeTeam:'UKR', awayTeam:'SCO', date:'2026-06-21', time:'13:00', venue:'Estadio BBVA',        city:'Monterrey',    round:'group', group:'L', matchday:2, result:{home:1,away:0}, status:'played' },
  { id:'l4', homeTeam:'PAN', awayTeam:'CRC', date:'2026-06-21', time:'16:00', venue:'Lincoln Financial Field', city:'Filadelfia', round:'group', group:'L', matchday:2, result:{home:2,away:1}, status:'played' },
  { id:'l5', homeTeam:'UKR', awayTeam:'PAN', date:'2026-06-25', time:'20:00', venue:'Estadio BBVA',        city:'Monterrey',    round:'group', group:'L', matchday:3, result:{home:2,away:0}, status:'played' },
  { id:'l6', homeTeam:'SCO', awayTeam:'CRC', date:'2026-06-25', time:'20:00', venue:'Lincoln Financial Field', city:'Filadelfia', round:'group', group:'L', matchday:3, result:{home:2,away:0}, status:'played' },

  // ── ROUND OF 32 ──────────────────────────────────────────────────────────
  { id:'r32-1', homeTeam:'BRA', awayTeam:'SEN', date:'2026-06-26', time:'13:00', venue:'SoFi Stadium',        city:'Los Ángeles',  round:'r32', result:{home:2,away:1}, status:'played' },
  { id:'r32-2', homeTeam:'ARG', awayTeam:'SUI', date:'2026-06-26', time:'17:00', venue:'MetLife Stadium',     city:'Nueva York',   round:'r32', result:{home:3,away:0}, status:'played' },
  { id:'r32-3', homeTeam:'FRA', awayTeam:'MAR', date:'2026-06-27', time:'14:00', venue:'Estadio Azteca',      city:'Ciudad de México', round:'r32', status:'live' },
  { id:'r32-4', homeTeam:'GER', awayTeam:'MEX', date:'2026-06-27', time:'20:00', venue:'AT&T Stadium',        city:'Dallas',       round:'r32', status:'upcoming' },
  { id:'r32-5', homeTeam:'ENG', awayTeam:'EGY', date:'2026-06-28', time:'14:00', venue:'Allegiant Stadium',   city:'Las Vegas',    round:'r32', status:'upcoming' },
  { id:'r32-6', homeTeam:'COL', awayTeam:'POL', date:'2026-06-28', time:'18:00', venue:'Lumen Field',         city:'Seattle',      round:'r32', status:'upcoming' },
  { id:'r32-7', homeTeam:'ESP', awayTeam:'SCO', date:'2026-06-29', time:'14:00', venue:'Estadio Azteca',      city:'Ciudad de México', round:'r32', status:'upcoming' },
  { id:'r32-8', homeTeam:'POR', awayTeam:'AUS', date:'2026-06-29', time:'18:00', venue:'Estadio Monterrey',   city:'Monterrey',    round:'r32', status:'upcoming' },
  { id:'r32-9', homeTeam:'NED', awayTeam:'CAN', date:'2026-06-30', time:'14:00', venue:'BC Place',            city:'Vancouver',    round:'r32', status:'upcoming' },
  { id:'r32-10', homeTeam:'USA', awayTeam:'DEN', date:'2026-06-30', time:'20:00', venue:'MetLife Stadium',    city:'Nueva York',   round:'r32', status:'upcoming' },
  { id:'r32-11', homeTeam:'BEL', awayTeam:'PAR', date:'2026-07-01', time:'14:00', venue:'Hard Rock Stadium',  city:'Miami',        round:'r32', status:'upcoming' },
  { id:'r32-12', homeTeam:'ITA', awayTeam:'SRB', date:'2026-07-01', time:'18:00', venue:'Arrowhead Stadium',  city:'Kansas City',  round:'r32', status:'upcoming' },
  { id:'r32-13', homeTeam:'URU', awayTeam:'JPN', date:'2026-07-02', time:'14:00', venue:'Gillette Stadium',   city:'Boston',       round:'r32', status:'upcoming' },
  { id:'r32-14', homeTeam:'CRO', awayTeam:'ALG', date:'2026-07-02', time:'18:00', venue:'Lincoln Financial Field', city:'Filadelfia', round:'r32', status:'upcoming' },
  { id:'r32-15', homeTeam:'UKR', awayTeam:'IRN', date:'2026-07-03', time:'14:00', venue:'Estadio BBVA',       city:'Monterrey',    round:'r32', status:'upcoming' },
  { id:'r32-16', homeTeam:'NGA', awayTeam:'ECU', date:'2026-07-03', time:'18:00', venue:'BMO Field',          city:'Toronto',      round:'r32', status:'upcoming' },
]

export type Standing = {
  code: string
  played: number
  won: number
  drawn: number
  lost: number
  gf: number
  ga: number
  gd: number
  points: number
}

export function computeStandings(groupId: string): Standing[] {
  const teamCodes = GROUPS[groupId]
  const standings: Record<string, Standing> = {}
  for (const code of teamCodes) {
    standings[code] = { code, played:0, won:0, drawn:0, lost:0, gf:0, ga:0, gd:0, points:0 }
  }
  const groupMatches = MATCHES.filter(m => m.group === groupId && m.status === 'played' && m.result)
  for (const m of groupMatches) {
    const { home, away } = m.result!
    const h = standings[m.homeTeam]
    const a = standings[m.awayTeam]
    if (!h || !a) continue
    h.played++; h.gf += home; h.ga += away; h.gd = h.gf - h.ga
    a.played++; a.gf += away; a.ga += home; a.gd = a.gf - a.ga
    if (home > away) { h.won++; h.points += 3; a.lost++ }
    else if (home < away) { a.won++; a.points += 3; h.lost++ }
    else { h.drawn++; h.points++; a.drawn++; a.points++ }
  }
  return Object.values(standings).sort((a,b) =>
    b.points - a.points || b.gd - a.gd || b.gf - a.gf
  )
}

export const ROUND_LABELS: Record<string, string> = {
  group: 'Fase de Grupos',
  r32: 'Octavos de Final',
  r16: 'Cuartos',
  qf: 'Semifinal',
  sf: 'Final',
  final: 'Gran Final',
}

export const ROUND_POINTS: Record<string, number> = {
  r32: 2, r16: 4, qf: 6, sf: 8, final: 10,
}
