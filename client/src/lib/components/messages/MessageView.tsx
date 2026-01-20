import { BaseMessage } from '@/lib/types'
import Popup from '../Popup'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined'
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined'
import { dateFormatter, timeFormatter } from '@/lib/utils/dateFormatter'

interface MessageViewProps {
  message: BaseMessage | null
  open: boolean
  onClose: () => void
  onDelete: () => void
  onReply: () => void
  onToggleRead: () => void
}

const replyBtnSx = { ml: 'auto', mt: 'auto', fontWeight: 700 }

export default function MessageView({
  message,
  open,
  onClose,
  onDelete,
  onReply,
  onToggleRead
}: MessageViewProps) {
  return (
    <Popup open={open} onClose={onClose}>
      <div className="h-full flex flex-col">
        <div className="font-bold text-2xl">{message?.subject}</div>
        <div className="italic text-sm">
          Sent by {message?.sender.firstName} {message?.sender.lastName} on{' '}
          {dateFormatter(message?.sentDate)} {timeFormatter(message?.sentDate)}
        </div>
        <div className="mt-8">{message?.body}</div>

        <div className="flex mt-auto">
          <div>
            <Tooltip title={message?.read ? 'Mark unread' : 'Mark read'}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleRead()
                }}>
                {message?.read ? (
                  <MarkunreadOutlinedIcon fontSize="small" />
                ) : (
                  <DraftsOutlinedIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}>
                <DeleteRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
          <Button variant="contained" sx={replyBtnSx} onClick={onReply}>
            Reply
          </Button>
        </div>
      </div>
    </Popup>
  )
}
