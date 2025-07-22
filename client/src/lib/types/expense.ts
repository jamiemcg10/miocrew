export interface Expense {
  id: string
  tripId: string
  name: string
  paidBy: string // or user or userId
  total: number
  split: 'Even' | 'Custom'
  owe: Record<string, { owes: number; paid: boolean }>
  settled: boolean
  due: 'immediate' | 'end'
  date: Date
  notes?: string
}
