import { BaseMessage } from '@/lib/types'
import Popup from '../Popup'
import Button from '@mui/material/Button'

interface MessageViewProps {
  message: BaseMessage | null
  open: boolean
  onClose: () => void
}

const replyBtnSx = { ml: 'auto', mt: 'auto', fontWeight: 700 }

export default function MessageView({ message, open, onClose }: MessageViewProps) {
  return (
    <Popup open={open} onClose={onClose}>
      <div className="h-full flex flex-col">
        <div className="font-bold text-2xl">{message?.subject}</div>
        <div className="italic text-sm">{message?.sender}</div>
        <div className="mt-8">{message?.body}</div>
        <Button variant="contained" sx={replyBtnSx}>
          Reply
        </Button>
      </div>
    </Popup>
  )
}
