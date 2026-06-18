import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Plan, PlanInput } from '@/types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MONTH_NAMES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]
const COMPANIONS_LABEL: Record<string, string> = {
  solo: 'Solo/a',
  pareja: 'En pareja',
  amigos: 'Con amigos',
  familia: 'Con familia',
}

function formatDate(date: Date) {
  return {
    dayName: DAY_NAMES[date.getDay()],
    day: date.getDate(),
    monthYear: `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`,
    full: `${date.getDate()} de ${MONTH_NAMES[date.getMonth()]} de ${date.getFullYear()}`,
  }
}

function formatCost(n: number) {
  return `${n}€` // € without emoji font dependency
}

function formatDuration(hours: number) {
  if (hours < 1) return `${hours * 60} min`
  if (Number.isInteger(hours)) return `${hours}h`
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return `${h}h ${m}min`
}

function slugDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const ORANGE = '#F97316'
const DARK = '#111827'
const GRAY = '#6B7280'
const LIGHT_GRAY = '#F9FAFB'
const BORDER = '#E5E7EB'
const ORANGE_LIGHT = '#FFF7ED'
const ORANGE_DARK = '#92400E'

const s = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 36,
    paddingVertical: 32,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  appName: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: ORANGE,
  },
  appTagline: {
    fontSize: 8.5,
    color: GRAY,
    marginTop: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  dateDayName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
  },
  dateMonthYear: {
    fontSize: 9,
    color: GRAY,
    marginTop: 1,
  },

  // ── Orange rule ───────────────────────────────────────────────────────────
  rule: {
    borderBottomWidth: 2,
    borderBottomColor: ORANGE,
    marginBottom: 14,
  },

  // ── Params pill row ───────────────────────────────────────────────────────
  paramsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 18,
    backgroundColor: ORANGE_LIGHT,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  paramChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginRight: 8,
  },
  paramLabel: {
    fontSize: 8,
    color: GRAY,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  paramValue: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: ORANGE_DARK,
  },
  paramSep: {
    fontSize: 9,
    color: '#D1D5DB',
  },

  // ── Section title ─────────────────────────────────────────────────────────
  sectionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: GRAY,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },

  // ── Plan card ─────────────────────────────────────────────────────────────
  planCard: {
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  planCardAccent: {
    height: 3,
    backgroundColor: ORANGE,
  },
  planCardBody: {
    padding: 14,
  },
  planHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5,
  },
  planBadge: {
    backgroundColor: ORANGE,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  planBadgeText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  planTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    flex: 1,
  },
  planDescription: {
    fontSize: 8.5,
    color: GRAY,
    marginBottom: 10,
    lineHeight: 1.5,
  },

  // Activities
  activityList: {
    gap: 4,
    marginBottom: 10,
  },
  activityRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-start',
  },
  activityArrow: {
    fontSize: 8,
    color: ORANGE,
    fontFamily: 'Helvetica-Bold',
    paddingTop: 0.5,
    width: 10,
    flexShrink: 0,
  },
  activityText: {
    fontSize: 8.5,
    color: '#374151',
    flex: 1,
    lineHeight: 1.45,
  },

  // Tip box
  tipBox: {
    backgroundColor: ORANGE_LIGHT,
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: ORANGE,
  },
  tipText: {
    fontSize: 8,
    color: ORANGE_DARK,
    lineHeight: 1.45,
  },
  tipBold: {
    fontFamily: 'Helvetica-Bold',
  },

  // Footer row of plan
  planFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  planMeta: {
    flexDirection: 'row',
    gap: 14,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaLabel: {
    fontSize: 7.5,
    color: '#9CA3AF',
  },
  metaValue: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 7,
    color: '#1D4ED8',
    fontFamily: 'Helvetica-Bold',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  pageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    marginTop: 4,
  },
  footerBrand: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: ORANGE,
  },
  footerUrl: {
    fontSize: 7.5,
    color: '#9CA3AF',
  },
})

// ─── Sub-components ───────────────────────────────────────────────────────────

function ParamSeparator() {
  return <Text style={s.paramSep}>  |  </Text>
}

function ParamChip({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.paramChip}>
      <Text style={s.paramLabel}>{label}</Text>
      <Text style={s.paramValue}>{value}</Text>
    </View>
  )
}

function PlanSection({ plan, index }: { plan: Plan; index: number }) {
  return (
    <View style={s.planCard}>
      <View style={s.planCardAccent} />
      <View style={s.planCardBody}>
        {/* Title row */}
        <View style={s.planHeaderRow}>
          <View style={s.planBadge}>
            <Text style={s.planBadgeText}>Plan {index + 1}</Text>
          </View>
          <Text style={s.planTitle}>{plan.title}</Text>
        </View>

        {/* Description */}
        <Text style={s.planDescription}>{plan.description}</Text>

        {/* Activities */}
        <View style={s.activityList}>
          {plan.activities.map((act, i) => (
            <View key={i} style={s.activityRow}>
              <Text style={s.activityArrow}>-{'>'}</Text>
              <Text style={s.activityText}>{act}</Text>
            </View>
          ))}
        </View>

        {/* Tip */}
        {plan.tip && (
          <View style={s.tipBox}>
            <Text style={s.tipText}>
              <Text style={s.tipBold}>Tip: </Text>
              {plan.tip}
            </Text>
          </View>
        )}

        {/* Footer: cost + duration + tags */}
        <View style={s.planFooter}>
          <View style={s.planMeta}>
            <View style={s.metaPill}>
              <Text style={s.metaLabel}>Coste: </Text>
              <Text style={s.metaValue}>{formatCost(plan.estimated_cost)}</Text>
            </View>
            <View style={s.metaPill}>
              <Text style={s.metaLabel}>Duracion: </Text>
              <Text style={s.metaValue}>{formatDuration(plan.duration_hours)}</Text>
            </View>
          </View>
          <View style={s.tagsRow}>
            {plan.tags.slice(0, 3).map((tag) => (
              <View key={tag} style={s.tag}>
                <Text style={s.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

// ─── Main Document ────────────────────────────────────────────────────────────

interface PlanPDFDocumentProps {
  plans: Plan[]
  input: PlanInput
  generatedAt: Date
}

export function PlanPDFDocument({ plans, input, generatedAt }: PlanPDFDocumentProps) {
  const date = formatDate(generatedAt)

  return (
    <Document
      title={`Plan del dia - ${date.full}`}
      author="quehagohoy.es"
      subject="Planes personalizados generados con IA"
      creator="quehagohoy.es"
    >
      <Page size="A4" style={s.page}>
        {/* ── Header ── */}
        <View style={s.header}>
          <View>
            <Text style={s.appName}>Que hago hoy?</Text>
            <Text style={s.appTagline}>Tu plan personalizado del dia</Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.dateDayName}>{date.dayName}</Text>
            <Text style={s.dateMonthYear}>
              {date.day} de {date.monthYear}
            </Text>
          </View>
        </View>

        <View style={s.rule} />

        {/* ── Params ── */}
        <View style={s.paramsRow}>
          <ParamChip label="Ciudad" value={input.location} />
          <ParamSeparator />
          <ParamChip label="Tiempo" value={`${input.time}h`} />
          <ParamSeparator />
          <ParamChip label="Presupuesto" value={formatCost(input.budget)} />
          <ParamSeparator />
          <ParamChip label="Compania" value={COMPANIONS_LABEL[input.companions] ?? input.companions} />
          {input.mood && input.mood.length > 0 && (
            <>
              <ParamSeparator />
              <ParamChip label="Estilo" value={input.mood.join(', ')} />
            </>
          )}
        </View>

        {/* ── Plans ── */}
        <Text style={s.sectionTitle}>Tus 3 planes para hoy</Text>

        {plans.map((plan, i) => (
          <PlanSection key={plan.id} plan={plan} index={i} />
        ))}

        {/* ── Footer ── */}
        <View style={s.pageFooter}>
          <Text style={s.footerBrand}>Que hago hoy?</Text>
          <Text style={s.footerUrl}>quehagohoy.es</Text>
        </View>
      </Page>
    </Document>
  )
}

export function getPDFFileName(input: PlanInput, date: Date) {
  const city = input.location.toLowerCase().replace(/\s+/g, '-').slice(0, 20)
  return `plan-${city}-${slugDate(date)}.pdf`
}
