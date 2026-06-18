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

export async function generatePlans(input: PlanInput): Promise<Plan[]> {
  const companionsText = COMPANIONS_MAP[input.companions] || input.companions
  const moodText = input.mood?.length ? `Preferencias: ${input.mood.join(', ')}.` : ''

  const prompt = `Genera exactamente 3 planes de actividades para una persona que está ${companionsText} en ${input.location}, con ${input.time} hora(s) libres y un presupuesto de ${input.budget}€. ${moodText}

Cada plan debe:
- Ser realista y concreto (lugares reales, no genéricos)
- Caber en el presupuesto indicado
- Ajustarse al tiempo disponible
- Ser diferente al resto (variedad: cultural, gastronómico, deportivo, etc.)

Responde ÚNICAMENTE con JSON válido, sin texto adicional:
{
  "plans": [
    {
      "id": 1,
      "title": "Título corto del plan",
      "emoji": "🎨",
      "description": "Descripción breve en 1-2 frases",
      "activities": ["Actividad concreta 1", "Actividad concreta 2", "Actividad concreta 3"],
      "estimated_cost": 15,
      "duration_hours": 2.5,
      "tags": ["cultural", "tranquilo"],
      "tip": "Consejo práctico opcional"
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
          'Eres un experto local en ocio y actividades. Generas planes concretos, realizables y creativos. Respondes solo con JSON válido.',
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.8,
    max_tokens: 1200,
    response_format: { type: 'json_object' },
  })

  const content = completion.choices[0].message.content
  if (!content) throw new Error('No content from OpenAI')

  const parsed = JSON.parse(content) as { plans: Plan[] }
  return parsed.plans
}
