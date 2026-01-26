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
import { noTextTransformSx } from '@/lib/styles/sx'
import { messageDateSort } from '@/lib/utils/sortFns'

const composeBtnSx = { fontWeight: 700, ml: 4, mb: 2 }

export default function InboxPage() {
  const { user } = useContext(UserContext)

  const storedMessages = LocalStorage.get<BaseMessage[]>('messages')
  const [messages, setMessages] = useState<BaseMessage[]>(storedMessages || [])
  const [activeMessage, setActiveMessage] = useState<BaseMessage | null>(null)
  const [composing, setComposing] = useState<boolean | BaseMessage>(false)

  function fetchMessages() {
    getMessages({ userId: user!.id })
      .then((response) => {
        setMessages(response.data.messages)
        LocalStorage.set('messages', response.data.messages)
      })
      .catch((e) => console.error('Error fetching messages', e))
  }

  function onDeleteMessage(messageId: string) {
    if (!user) return

    setMessages(messages.filter((m) => m.id !== messageId))
    deleteMessage({ userId: user.id, messageId }).catch((e) =>
      console.error('Error deleting message', e)
    )
  }

  function batchDelete() {
    if (!user) return

    const checkedIds = checked.map((m) => m.id)

    setMessages(messages.filter((m) => !checkedIds.includes(m.id)))
    bulkDeleteMessage({ userId: user.id, messageIds: checked.map((m) => m.id) }).catch((e) =>
      console.error('Error deleting messages', e)
    )

    setChecked([])
  }

  function batchToggleStatus(status: 'read' | 'unread') {
    if (!user) return

    const checkedIds = checked.map((m) => m.id)

    setMessages(
      messages.map((m) => {
        return checkedIds.includes(m.id) ? { ...m, read: !m.read } : m
      })
    )
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

    fetchMessages()

    const refreshInterval = setInterval(fetchMessages, 30000)

    return () => clearInterval(refreshInterval)
  }, [user])

  function clickMarkRead() {
    batchToggleStatus('read')
  }

  function clickMarkUnread() {
    batchToggleStatus('unread')
  }

  return (
    <>
      <div className="flex flex-col h-full p-8 overflow-y-hidden">
        <div className="text-3xl">
          <DraftsOutlinedIcon />
          <span className="ml-2">Inbox</span>
        </div>
        <div className="py-4 flex flex-wrap-reverse justify-end">
          <div
            className={
              (!!checked.length ? 'opacity-1--' : 'opacity-0 pointer-events-none') +
              ' transform-opacity space-x-4'
            }>
            {checked.every((m) => !m.read) && (
              <Button
                size="small"
                startIcon={<DraftsOutlinedIcon />}
                onClick={clickMarkRead}
                sx={noTextTransformSx}>
                Mark read
              </Button>
            )}
            {checked.every((m) => m.read) && (
              <Button
                size="small"
                startIcon={<MarkunreadOutlinedIcon />}
                onClick={clickMarkUnread}
                sx={noTextTransformSx}>
                Mark unread
              </Button>
            )}
            <Button
              size="small"
              startIcon={<DeleteRoundedIcon />}
              onClick={batchDelete}
              sx={noTextTransformSx}
              color="error">
              Delete
            </Button>
          </div>

          <Button
            variant="contained"
            startIcon={<EditRoundedIcon />}
            sx={composeBtnSx}
            onClick={() => setComposing(true)}>
            Compose
          </Button>
        </div>
        <div className="text-xl mb-4">Messages</div>
        <div className="overflow-y-auto vertical-scroll">
          {messages.sort(messageDateSort).map((m, i) => {
            return (
              <MessageItem
                message={m}
                checked={checked}
                setChecked={setChecked}
                key={i}
                onClick={() => {
                  if (!user) return

                  setActiveMessage(m)

                  if (!m.read) {
                    const statusUpdate = messages.map((m, _i) =>
                      i !== _i ? m : { ...m, read: true }
                    )
                    setMessages(statusUpdate)
                    toggleMessageReadStatus({ userId: user.id, messageId: m.id, status: true })
                    LocalStorage.set('messages', statusUpdate)
                  }
                }}
                onDelete={() => onDeleteMessage(m.id)}
                onToggleRead={() => {
                  if (!user) return

                  setMessages(messages.map((m, j) => (i === j ? { ...m, read: !m.read } : m)))
                  toggleMessageReadStatus({ userId: user.id, messageId: m.id, status: !m.read })
                }}
              />
            )
          })}
        </div>
      </div>

      <MessageView
        message={activeMessage}
        open={!!activeMessage}
        onClose={() => setActiveMessage(null)}
        onReply={() => {
          if (!activeMessage) return

          setComposing(activeMessage)
          setActiveMessage(null)
        }}
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
      <ComposeMessageDialog
        open={composing}
        onClose={() => setComposing(false)}
        fetchMessages={fetchMessages}
      />
    </>
  )
}
