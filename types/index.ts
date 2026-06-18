export interface PlanInput {
  budget: number
  location: string
  neighborhood?: string
  time: number // hours
  companions: 'solo' | 'pareja' | 'amigos' | 'familia'
  occasion?: 'normal' | 'primera-cita' | 'cumpleanos' | 'con-ninos' | 'turista'
  environment?: 'interior' | 'exterior' | 'cualquiera'
  transport?: 'pie' | 'publico' | 'coche'
  mood?: string[]
}

export interface Activity {
  name: string
  detail?: string
  cost?: number
}

export interface Plan {
  id: number
  title: string
  emoji: string
  description: string
  activities: string[]
  estimated_cost: number
  duration_hours: number
  tags: string[]
  tip?: string
}

export interface GenerationResult {
  plans: Plan[]
}

export interface Profile {
  id: string
  email: string
  plan: 'free' | 'pro'
  generations_used: number
  generations_reset_at: string
  created_at: string
}

export interface Generation {
  id: string
  user_id: string
  input: PlanInput
  output: Plan[]
  created_at: string
}
