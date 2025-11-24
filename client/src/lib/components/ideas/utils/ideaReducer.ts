import { Idea, isIdea } from '@/lib/types'

type Field<T> = {
  value: T
  valid: boolean
}
interface IdeaState {
  name: Field<string>
  description: Field<string>
  url: Field<string>
  cost: Field<number | undefined>
  costType: Field<'each' | 'total' | ''>
}

export const initialIdeaState = {
  name: getInitialValue(''),
  description: getInitialValue(''),
  url: getInitialValue(''),
  cost: getInitialValue(),
  costType: getInitialValue('')
} as IdeaState

const IDEA_FIELDS = ['name', 'description', 'url', 'cost', 'costType']

function getInitialValue(value?: string) {
  // TODO: can probably move this to a higher file
  return {
    value,
    valid: true
  }
}

export function ideaReducer(
  state: IdeaState,
  action: { type: string | number; value?: number | string | Idea }
) {
  if (action.type === 'set-idea') {
    if (isIdea(action.value)) {
      const value = action.value

      return IDEA_FIELDS.reduce((acc, c) => {
        const k = c as keyof Idea

        return {
          ...acc,
          [k]: { value: value[k], valid: true }
        }
      }, {} as IdeaState)
    } else {
      return initialIdeaState
    }
  } else if (action.type === 'costType-invalid') {
    return {
      ...state,
      costType: {
        value: '' as const,
        valid: false
      }
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
