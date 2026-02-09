import axios from 'axios'
import { DebtorPayload, ExpensePayload } from './types'

interface BaseExpenseArgs {
  userId: string
  tripId: string
}

interface AddExpenseArgs extends BaseExpenseArgs {
  data: { expense: ExpensePayload; debtors: DebtorPayload[] }
}

interface MarkExpensePaidArgs extends BaseExpenseArgs {
  expenseId: string
}

interface DeleteExpenseArgs extends BaseExpenseArgs {
  expenseId: string
}

export function getExpenses({ userId, tripId }: BaseExpenseArgs) {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/expenses/`

  return axios.get(requestUrl, { withCredentials: true })
}

export function addExpense(args: AddExpenseArgs) {
  const { userId, tripId, data } = args

  const isUpdate = !!data.expense.id

  const requestUrl = `${
    process.env.NEXT_PUBLIC_SERVER_BASE_URL
  }/user/${userId}/trip/${tripId}/expense/${isUpdate ? 'update' : 'create'}`

  return axios({
    method: isUpdate ? 'patch' : 'post',
    url: requestUrl,
    data,
    withCredentials: true
  })
}

export function markExpensePaid(args: MarkExpensePaidArgs) {
  const { userId, tripId, expenseId } = args

  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/expense/${expenseId}/mark_paid`

  return axios({
    method: 'patch',
    url: requestUrl,
    withCredentials: true
  })
}

export function deleteExpense(args: DeleteExpenseArgs) {
  const { userId, tripId, expenseId } = args

  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${userId}/trip/${tripId}/expense/${expenseId}/delete`

  return axios.delete(requestUrl, {
    withCredentials: true
  })
}
