import { CrewMember, UserColor } from './user'

interface Debtor {
  id: string
  owes: number
  paid: boolean
  firstName: string
  lastName: string
  color: UserColor
  email: string
}

export interface Expense {
  id: string
  tripId: string
  name: string
  paidBy: CrewMember
  total: number
  split: 'Even' | 'Custom'
  owe: Record<string, Debtor>
  settled: boolean
  due: 'immediate' | 'end'
  date: Date
  notes?: string
}
