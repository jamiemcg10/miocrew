import { CrewMember, UserColor } from './user'

interface Debtor {
  id: string
  expenseId: string
  owes: number
  paid: boolean
  firstName: string
  lastName: string
  userId: string
  color: UserColor
  email: string
}

export interface Expense {
  id: string
  tripId: string
  name: string
  paidBy: CrewMember
  total: number
  split: 'Evenly' | 'Custom'
  owe: Record<string, Debtor> // TODO: change this to debtors
  settled: boolean
  due: 'immediate' | 'end'
  date: string
  notes?: string
}

export function isExpense(open: boolean | Expense): open is Expense {
  return typeof open !== 'boolean'
}
