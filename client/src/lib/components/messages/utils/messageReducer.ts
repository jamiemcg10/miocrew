import { RecipientOption } from '@/lib/types'

interface MessageState {
  recipients: RecipientOption[]
  subject: string
  body: string
}

export const initialMessageState = {
  recipients: [],
  subject: '',
  body: ''
}

export function messageReducer(
  state: MessageState,
  action: { type: string; value?: string | (string | RecipientOption)[] }
) {
  if (action.type === 'reset-message') {
    return initialMessageState
  }

  return {
    ...state,
    [action.type]: action.value
  }
}
