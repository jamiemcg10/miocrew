import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined'
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import type { Message } from '@/lib/types'

interface MessageProps {
  message: Message
  checked: Record<string, boolean>
  setChecked: Dispatch<SetStateAction<Record<string, boolean>>>
}

export default function Message({ message, checked, setChecked }: MessageProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked
    })
  }

  return (
    <div className="group h-16 sm:h-12 mb-0.5 rounded-lg flex items-center justify-start cursor-pointer bg-[#cccccc] dark:even:bg-white/20 dark:odd:bg-white/10">
      <Checkbox
        size="small"
        name={message.id}
        checked={checked[message.id]}
        onChange={handleChange}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
      />
      <div className={(!message.read ? 'font-extrabold' : 'opacity-90') + ' text-lg line-clamp-2'}>
        {message.subject}
      </div>
      <div className="ml-auto mr-2 shrink-0 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
        <IconButton size="small" title={message.read ? 'Mark unread' : 'Mark read'}>
          {message.read ? (
            <MarkunreadOutlinedIcon fontSize="small" />
          ) : (
            <DraftsOutlinedIcon fontSize="small" />
          )}
        </IconButton>
        <IconButton size="small" color="error">
          <DeleteRoundedIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  )
}
