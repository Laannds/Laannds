import OpenAI from 'openai'
import type { PlanInput, Plan } from '@/types'

function getOpenAIClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

const COMPANIONS_MAP: Record<string, string> = {
  solo: 'solo/a',
  pareja: 'en pareja',
  amigos: 'con amigos',
  familia: 'con familia',
}

async function callOpenAI(input: PlanInput): Promise<Plan[]> {
  const companionsText = COMPANIONS_MAP[input.companions] ?? input.companions
  const moodText = input.mood?.length ? `Preferencias del usuario: ${input.mood.join(', ')}.` : ''

  const prompt = `Genera exactamente 3 planes de actividades para una persona que está ${companionsText} en ${input.location}, con ${input.time} hora(s) libres y un presupuesto máximo de ${input.budget}€. ${moodText}

Requisitos por plan:
- Actividades concretas y realizables (nombres reales de lugares, barrios, parques)
- Coste total dentro del presupuesto indicado
- Ajustado al tiempo disponible
- Variedad entre planes (ej: cultural, gastronómico, deportivo/naturaleza)
- Mínimo 2 actividades por plan, máximo 4

Responde ÚNICAMENTE con JSON válido, sin texto adicional:
{
  "plans": [
    {
      "id": 1,
      "title": "Título corto y atractivo",
      "emoji": "🎨",
      "description": "Descripción en 1-2 frases que genere ganas de hacerlo",
      "activities": ["Actividad específica 1", "Actividad específica 2", "Actividad específica 3"],
      "estimated_cost": 15,
      "duration_hours": 2.5,
      "tags": ["cultural", "tranquilo"],
      "tip": "Consejo práctico local que no es obvio"
    }
  ]
}`

  const openai = getOpenAIClient()
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'Eres un experto local en ocio y actividades de tiempo libre. Generas planes concretos, realizables y creativos adaptados exactamente a la situación del usuario. Siempre respondes solo con JSON válido.',
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.85,
    max_tokens: 1400,
    response_format: { type: 'json_object' },
  })

  const content = completion.choices[0].message.content
  if (!content) throw new Error('OpenAI returned empty content')

  const parsed = JSON.parse(content) as { plans: Plan[] }

  if (!Array.isArray(parsed.plans) || parsed.plans.length === 0) {
    throw new Error('OpenAI returned invalid plan structure')
  }

  return parsed.plans
}

export async function generatePlans(input: PlanInput): Promise<Plan[]> {
  try {
    return await callOpenAI(input)
  } catch (firstError) {
    // One retry on any failure (network blip or malformed JSON)
    console.warn('OpenAI first attempt failed, retrying:', firstError)
    try {
      return await callOpenAI(input)
    } catch (secondError) {
      console.error('OpenAI retry also failed:', secondError)
      throw secondError
    }
  }
}
