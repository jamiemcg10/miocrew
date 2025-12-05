import { User } from '@/lib/types'

type Field<T> = {
  value: T
  valid: boolean
}

interface TripState {
  name: Field<string>
  location: Field<string>
  description: Field<string>
  startDate: Field<string>
  endDate: Field<string>
  crewMembers: Field<User[]>
}

export const initialTripState = {
  name: getInitialValue(''),
  location: getInitialValue(''),
  description: getInitialValue(''),
  startDate: getInitialValue(''),
  endDate: getInitialValue(''),
  crewMembers: getInitialValue([] as User[])
} as TripState

function getInitialValue(value?: string | User[]) {
  return {
    value,
    valid: true
  }
}

export function tripReducer(state: TripState, action: { type: string; value: string | User[] }) {
  console.log({ action })
  return {
    ...state,
    [action.type]: {
      value: action.value,
      valid: !!action.value && !!action.value.length
    }
  }
}
