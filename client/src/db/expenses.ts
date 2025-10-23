import axios from 'axios'
import { DebtorPayload, ExpensePayload } from './types'

interface addExpenseArgs {
  userId: string
  tripId: string
  data: { expense: ExpensePayload; debtors: DebtorPayload[] }
}

interface deleteExpenseArgs {
  userId: string
  tripId: string
  expenseId: string
}

export async function addExpense(args: addExpenseArgs) {
  const { userId, tripId, data } = args

  const isUpdate = !!data.expense.id

  const requestUrl = isUpdate
    ? `${process.env.SERVER_BASE_URL}/user/${userId}/trip/${tripId}/${'expense/update'}`
    : `${process.env.SERVER_BASE_URL}/user/${userId}/trip/${tripId}/expense/create`

  return axios({
    method: isUpdate ? 'patch' : 'post',
    url: requestUrl,
    data,
    withCredentials: true
  })
}

export async function deleteExpense(args: deleteExpenseArgs) {
  const { userId, tripId, expenseId } = args

  const requestUrl = `${process.env.SERVER_BASE_URL}/user/${userId}/trip/${tripId}/expense/${expenseId}/delete`

  return axios.delete(requestUrl, {
    withCredentials: true
  })
}
