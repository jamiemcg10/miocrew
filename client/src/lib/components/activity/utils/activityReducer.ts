import { Activity, isActivity } from '@/lib/types'

type Field<T> = {
  // TODO: Can probably move this
  value: T
  valid: boolean
}
interface ActivityState {
  name: Field<string>
  description: Field<string>
  location: Field<string>
  startDate: Field<string>
  startTime: Field<string>
  endDate: Field<string>
  endTime: Field<string>
}

export const initialActivityState = {
  name: getInitialValue(''),
  description: getInitialValue(''),
  location: getInitialValue(''),
  startDate: getInitialValue(''),
  startTime: getInitialValue(''),
  endDate: getInitialValue(''),
  endTime: getInitialValue('')
} as ActivityState

const ACTIVITY_FIELDS = [
  'name',
  'description',
  'location',
  'startDate',
  'startTime',
  'endDate',
  'endTime'
]

function getInitialValue(value?: string) {
  // TODO: can probably move this to a higher file
  return {
    value,
    valid: true
  }
}

export function activityReducer(
  state: ActivityState,
  action: { type: string; value?: string | Activity }
) {
  if (action.type === 'set-activity') {
    if (isActivity(action.value)) {
      const value = action.value

      const generalFields = ACTIVITY_FIELDS.slice(0, 3).reduce((acc, c) => {
        const k = c as keyof Activity

        return {
          ...acc,
          [k]: { value: value[k] || '', valid: true }
        }
      }, {} as ActivityState)

      const [startDate, startTime] = action.value.startTime.split('T')
      const [endDate, endTime] = (action.value.endTime || '').split('T')

      const timeFields = {
        startDate: {
          value: startDate,
          valid: true
        },
        startTime: {
          value: startTime,
          valid: true
        },
        endDate: {
          value: endDate,
          valid: true
        },
        endTime: {
          value: endTime,
          valid: true
        }
      }

      return { ...generalFields, ...timeFields }
    } else {
      return initialActivityState
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
