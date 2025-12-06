'use client'

import Button from '@mui/material/Button'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined'
import { useContext, useEffect, useState } from 'react'
import type { BaseMessage } from '@/lib/types'
import MessageView from '@/lib/components/messages/MessageView'
import ComposeMessageDialog from '@/lib/components/messages/ComposeMessageDialog'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import MessageItem from '@/lib/components/messages/MessageItem'
import { LocalStorage } from '@/lib/utils/LocalStorage'
import {
  bulkDeleteMessage,
  bulkToggleMessageReadStatus,
  deleteMessage,
  getMessages,
  toggleMessageReadStatus
} from '@/db'

export default function InboxPage() {
  const user = useContext(UserContext)

  const storedMessages = LocalStorage.get<BaseMessage[]>('messages')
  const [messages, setMessages] = useState<BaseMessage[]>(storedMessages || [])
  const [activeMessage, setActiveMessage] = useState<BaseMessage | null>(null)
  const [composing, setComposing] = useState(false)

  function onDeleteMessage(messageId: string) {
    if (!user) return

    deleteMessage({ userId: user.id, messageId }).catch((e) =>
      console.error('Error deleting message', e)
    )
  }

  function batchDelete() {
    if (!user) return

    bulkDeleteMessage({ userId: user.id, messageIds: checked.map((m) => m.id) }).catch((e) =>
      console.error('Error deleting messages', e)
    )

    setChecked([])
  }

  function batchToggleStatus(status: 'read' | 'unread') {
    if (!user) return

    bulkToggleMessageReadStatus({
      userId: user.id,
      messageIds: checked.map((m) => m.id),
      status
    }).catch((e) => console.error('Error toggling status', e))

    setChecked([])
  }

  const checkedMessages: BaseMessage[] = []

  const [checked, setChecked] = useState(checkedMessages)

  // TODO: Make this a component
  useEffect(() => {
    if (!user) return

    getMessages({ userId: user.id })
      .then((response) => {
        setMessages(response.data.messages)
        LocalStorage.set('messages', response.data.messages)
      })
      .catch((e) => console.error('Error fetching messages', e))
  }, [user])

  return (
    <>
      <div className="p-8">
        <div className="text-3xl">
          <DraftsOutlinedIcon />
          <span className="ml-2">Inbox</span>
        </div>
        <div className="py-4 flex flex-wrap-reverse justify-end">
          <div
            className={
              (!!checked.length ? 'opacity-1--' : 'opacity-0') + ' transform-opacity space-x-4'
            }>
            {checked.every((m) => !m.read) && (
              <Button
                size="small"
                startIcon={<DraftsOutlinedIcon />}
                onClick={() => batchToggleStatus('read')}
                sx={{ textTransform: 'none' }}>
                Mark read
              </Button>
            )}
            {checked.every((m) => m.read) && (
              <Button
                size="small"
                startIcon={<MarkunreadOutlinedIcon />}
                onClick={() => batchToggleStatus('unread')}
                sx={{ textTransform: 'none' }}>
                Mark unread
              </Button>
            )}
            <Button
              size="small"
              startIcon={<DeleteRoundedIcon />}
              onClick={() => batchDelete()}
              sx={{ textTransform: 'none' }}
              color="error">
              Delete
            </Button>
          </div>

          <Button
            variant="contained"
            startIcon={<EditRoundedIcon />}
            sx={{ fontWeight: 700, ml: 4, mb: 2 }}
            onClick={() => setComposing(true)}>
            Compose
          </Button>
        </div>
        <div className="text-xl mb-4">Messages</div>
        {messages.map((m, i) => {
          return (
            <MessageItem
              message={m}
              checked={checked}
              setChecked={setChecked}
              key={i}
              onClick={() => setActiveMessage(m)}
              onDelete={() => onDeleteMessage(m.id)}
              onToggleRead={() => {
                if (!user) return

                toggleMessageReadStatus({ userId: user.id, messageId: m.id, status: !m.read })
              }}
            />
          )
        })}
      </div>

      <MessageView
        message={activeMessage}
        open={!!activeMessage}
        onClose={() => setActiveMessage(null)}
        onDelete={() => {
          if (!activeMessage) return

          onDeleteMessage(activeMessage.id)
          setActiveMessage(null)
        }}
        onToggleRead={() => {
          if (!user || !activeMessage) return

          toggleMessageReadStatus({
            userId: user.id,
            messageId: activeMessage.id,
            status: !activeMessage.read
          })
          setActiveMessage(null)
        }}
      />
      <ComposeMessageDialog open={composing} onClose={() => setComposing(false)} />
    </>
  )
}
