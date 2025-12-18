import { BaseMessage, isMessage, RecipientOption } from '@/lib/types'

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
  action: { type: string; value?: string | (string | RecipientOption)[] | BaseMessage }
) {
  if (action.type === 'reset-message') {
    return initialMessageState
  }

  if (action.type === 'set-reply' && isMessage(action.value)) {
    return {
      ...state,
      subject: `Re: ${action.value.subject}`,
      recipients: [
        {
          name: `${action.value.sender.firstName} ${action.value.sender.lastName}`,
          id: action.value.senderId,
          type: 'user'
        }
      ]
    }
  }

  return {
    ...state,
    [action.type]: action.value
  }
}
