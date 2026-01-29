import { User } from '@/lib/types'

type Field<T> = {
  value: T
  valid: boolean
}

interface Date {
  start: string
  end: string
}

interface TripState {
  name: Field<string>
  location: Field<string>
  description: Field<string>
  date: Field<Date | null>
  crewMembers: Field<User[]>
}

export const initialTripState = {
  name: getInitialValue(''),
  location: getInitialValue(''),
  description: getInitialValue(''),
  date: getInitialValue(null),
  crewMembers: getInitialValue([] as User[])
} as TripState

function getInitialValue(value?: string | null | User[]) {
  return {
    value,
    valid: true
  }
}

export function tripReducer(
  state: TripState,
  action: { type: string; value: string | Date | User[] }
) {
  return {
    ...state,
    [action.type]: {
      value: action.value,
      valid: (!Array.isArray(action.value) && !!action.value) || !!action.value.length
    }
  }
}
