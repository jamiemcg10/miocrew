import { Expense, isExpense } from '@/lib/types'

type Field<T> = {
  // TODO: Can probably move this
  value: T
  valid: boolean
}
interface ExpenseState {
  name: Field<string>
  notes: Field<string>
  date: Field<string>
  total: Field<number>
  type: Field<'Evenly' | 'Custom'>
  immediately: Field<boolean>
}

export const initialExpenseState = {
  name: getInitialValue(''),
  notes: getInitialValue(''),
  date: getInitialValue(''),
  total: getInitialValue(0),
  type: getInitialValue('Evenly'),
  immediately: getInitialValue(false)
} as ExpenseState

const EXPENSE_FIELDS = ['name', 'notes', 'date', 'total', 'type', 'immediately']

function getInitialValue(value?: string | number | boolean) {
  // TODO: can probably move this to a higher file
  return {
    value,
    valid: true
  }
}

export function expenseReducer(
  state: ExpenseState,
  action: { type: string; value?: string | number | boolean | Expense }
) {
  if (action.type === 'set-expense') {
    if (isExpense(action.value)) {
      const value = action.value

      const generalFields = EXPENSE_FIELDS.reduce((acc, c) => {
        const k = c as keyof Expense

        return {
          ...acc,
          [k]: { value: value[k] || '', valid: true }
        }
      }, {} as ExpenseState)

      return { ...generalFields }
    } else {
      return initialExpenseState
    }
  }

  return {
    ...state,
    [action.type]: {
      value: action.value,
      valid: !!action.value
    }
  }
}
