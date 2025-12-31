import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined'
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined'
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react'
import type { BaseMessage } from '@/lib/types'
import Tooltip from '@mui/material/Tooltip'

interface MessageItemProps {
  message: BaseMessage
  onClick: () => void
  onDelete: () => void
  onToggleRead: () => void
  checked: BaseMessage[]
  setChecked: Dispatch<SetStateAction<BaseMessage[]>>
}

const checkboxSx = { '& .MuiSvgIcon-root': { fontSize: 16 } }

function onClickCheckbox(e: MouseEvent) {
  e.stopPropagation()
}

export default function MessageItem({
  message,
  onClick,
  onDelete,
  onToggleRead,
  checked,
  setChecked
}: MessageItemProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.checked
      ? setChecked([...checked, message])
      : setChecked(checked.filter((m) => m.id !== message.id))
  }

  const isChecked = !!checked.filter((m) => m.id === message.id).length

  const messageClasses =
    'group h-10 border-b-gray-300/20 rounded-xs border-b-1 flex items-center justify-start cursor-pointer bg-[#cccccc]' +
    (message.read
      ? ' bg-black/5  dark:bg-white/5  hover:bg-black/8  dark:hover:bg-white/8  active:bg-black/5  dark:active:bg-white/5'
      : ' bg-black/10 dark:bg-white/10 hover:bg-black/13 dark:hover:bg-white/13 active:bg-black/10 dark:active:bg-white/10')

  return (
    <div className={messageClasses} onClick={onClick}>
      <Checkbox
        size="small"
        name={message.id}
        checked={isChecked}
        onChange={handleChange}
        onClick={onClickCheckbox}
        sx={checkboxSx}
      />
      <div
        className={
          (!message.read ? 'font-semibold' : 'opacity-90') + ' line-clamp-2 tracking-wide'
        }>
        {message.subject}
      </div>
      <div className="ml-auto mr-2 shrink-0 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
        <Tooltip title={message.read ? 'Mark unread' : 'Mark read'}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onToggleRead()
            }}>
            {message.read ? (
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
    </div>
  )
}
