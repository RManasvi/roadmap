export type TaskType = 'concept' | 'code' | 'practice' | 'project' | 'reading'
export type ResourceType = 'video' | 'article' | 'interactive' | 'documentation'
export type ResourceLang = 'hindi' | 'indian-english' | 'english' | 'docs'
export type PhaseNumber = 1 | 2 | 3 | 4

export interface Task {
  id: string
  title: string
  description: string
  type: TaskType
}

export interface Resource {
  id: string
  title: string
  url: string
  type: ResourceType
  language: ResourceLang
  duration?: string
  note?: string
}

export interface Day {
  day: number
  phase: PhaseNumber
  title: string
  description: string
  timeEstimate: string
  tasks: Task[]
  resources: Resource[]
}

export interface PhaseConfig {
  phase: PhaseNumber
  label: string
  title: string
  duration: string
  color: string
  days: [number, number]
  totalDays: number
  milestone: string | null
  certifications: string[]
}

export const PHASES: PhaseConfig[] = [
  {
    phase: 1,
    label: 'Phase 1',
    title: 'Foundation Lock-In',
    duration: 'Weeks 1–4',
    color: '#00D4FF',
    days: [1, 22],
    totalDays: 22,
    milestone: null,
    certifications: ['HackerRank Python Certificate'],
  },
  {
    phase: 2,
    label: 'Phase 2',
    title: 'Analytics Stack',
    duration: 'Weeks 5–7',
    color: '#A855F7',
    days: [23, 45],
    totalDays: 23,
    milestone: '✅ CAN APPLY: Data Analyst Intern',
    certifications: ['Kaggle Pandas', 'Kaggle Data Visualization', 'Microsoft Power BI', 'Google Analytics GA4'],
  },
  {
    phase: 3,
    label: 'Phase 3',
    title: 'Product + Business Thinking',
    duration: 'Weeks 8–10',
    color: '#F59E0B',
    days: [46, 61],
    totalDays: 16,
    milestone: '✅ CAN APPLY: Product Analyst Intern',
    certifications: ['Kaggle Intro to ML', 'Kaggle Intermediate ML', 'Kaggle Time Series'],
  },
  {
    phase: 4,
    label: 'Phase 4',
    title: 'ML for Analysts + Polish',
    duration: 'Weeks 11–12',
    color: '#10B981',
    days: [62, 90],
    totalDays: 29,
    milestone: '✅ CAN APPLY: Data Scientist Intern, ML Analyst, BI Developer, Python Developer',
    certifications: ['Kaggle Feature Engineering', 'Kaggle NLP', 'Kaggle AI Ethics'],
  },
]
