import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined'
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import type { BaseMessage } from '@/lib/types'
import Tooltip from '@mui/material/Tooltip'

interface MessageItemProps {
  message: BaseMessage
  onClick: () => void
  checked: Record<string, boolean>
  setChecked: Dispatch<SetStateAction<Record<string, boolean>>>
}

export default function MessageItem({ message, onClick, checked, setChecked }: MessageItemProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked
    })
  }

  return (
    <div
      className="group h-16 sm:h-12 border-b-gray-300/20 rounded-xs border-b-1 flex items-center justify-start cursor-pointer bg-[#cccccc] even:bg-black/10 odd:bg-black/5 dark:even:bg-white/10 dark:odd:bg-white/5 even:hover:bg-black/13 odd:hover:bg-black/8 dark:even:hover:bg-white/13 dark:odd:hover:bg-white/8 even:active:bg-black/10 odd:active:bg-black/5 dark:even:active:bg-white/10 dark:odd:active:bg-white/5"
      onClick={onClick}>
      <Checkbox
        size="small"
        name={message.id}
        checked={checked[message.id]}
        onChange={handleChange}
        onClick={(e) => {
          e.stopPropagation()
        }}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
      />
      <div className={(!message.read ? 'font-extrabold' : 'opacity-90') + ' text-lg line-clamp-2'}>
        {message.subject}
      </div>
      <div className="ml-auto mr-2 shrink-0 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
        <Tooltip title={message.read ? 'Mark unread' : 'Mark read'}>
          <IconButton size="small">
            {message.read ? (
              <MarkunreadOutlinedIcon fontSize="small" />
            ) : (
              <DraftsOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" color="error">
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}
