import { CrewMember } from './user'

export interface Expense {
  id: string
  tripId: string
  name: string
  paidBy: CrewMember
  total: number
  split: 'Even' | 'Custom'
  owe: Record<string, { owes: number; paid: boolean }>
  settled: boolean
  due: 'immediate' | 'end'
  date: Date
  notes?: string
}
