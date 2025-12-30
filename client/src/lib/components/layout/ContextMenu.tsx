import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Dispatch, SetStateAction, useRef, MouseEventHandler } from 'react'
import { PopoverOrigin } from '@mui/material'

interface ContextMenuProps {
  open: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  onDelete: () => void
  onEdit: () => void
}

const origin: Record<'anchor' | 'transform', PopoverOrigin> = {
  anchor: {
    vertical: 'bottom',
    horizontal: 'left'
  },
  transform: {
    vertical: 'top',
    horizontal: 'left'
  }
}

export default function ContextMenu({
  open,
  setMenuOpen,
  onClose,
  onDelete,
  onEdit
}: ContextMenuProps) {
  const menuRef = useRef(null)

  const onToggle: MouseEventHandler = (e) => {
    e.stopPropagation()
    setMenuOpen(true)
  }

  const onClickEdit: MouseEventHandler = (e) => {
    e.stopPropagation()
    onEdit()
    onClose()
  }
  const onClickDelete: MouseEventHandler = (e) => {
    e.stopPropagation()
    onDelete
  }

  return (
    <>
      <IconButton onClick={onToggle} ref={menuRef} size="small">
        <MoreHorizIcon fontSize="small" />
      </IconButton>
      <Menu
        open={open}
        anchorEl={menuRef?.current}
        anchorOrigin={origin.anchor}
        transformOrigin={origin.transform}
        onClose={onClose}>
        <MenuItem dense onClick={onClickEdit}>
          <ListItemIcon>
            <EditRoundedIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem dense onClick={onClickDelete}>
          <ListItemIcon>
            <DeleteRoundedIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}
