export interface ExpensePayload {
  id?: string
  trip_id?: string
  name?: string
  paid_by_id?: string
  total: number
  split: string
  settled: boolean
  due: string
  date?: string
  notes?: string
}

export interface DebtorPayload {
  user_id: string
  owes: number
  paid: boolean
}
