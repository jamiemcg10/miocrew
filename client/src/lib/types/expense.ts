export interface Expense {
  id: string
  tripId: string
  name: string
  paidBy: string
  total: number
  split: 'Even' | 'Custom'
  owe: Record<string, { owes: number; paid: boolean }>
  settled: boolean
  due: 'immediate' | 'end'
  date: Date
  notes?: string
}
