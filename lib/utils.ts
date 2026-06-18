export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatCurrency(amount: number): string {
  return `${amount}€`
}

export function formatDuration(hours: number): string {
  if (hours < 1) return `${hours * 60} min`
  if (hours === 1) return '1 hora'
  if (Number.isInteger(hours)) return `${hours} horas`
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return `${h}h ${m}min`
}
