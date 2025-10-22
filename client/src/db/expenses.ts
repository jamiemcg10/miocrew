import axios from 'axios'

interface deleteExpenseArgs {
  userId: string
  tripId: string
  expenseId: string
}

export async function deleteExpense(args: deleteExpenseArgs) {
  const { userId, tripId, expenseId } = args

  const requestUrl = `http://localhost:8000/user/${userId}/trip/${tripId}/expense/${expenseId}/delete`

  return axios.delete(requestUrl, {
    withCredentials: true
  })
}
