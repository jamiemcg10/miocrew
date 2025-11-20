import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Dispatch, SetStateAction, useRef } from 'react'

interface ContextMenuProps {
  open: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  onDelete: () => void
  onEdit: () => void
}
export default function ContextMenu({
  open,
  setMenuOpen,
  onClose,
  onDelete,
  onEdit
}: ContextMenuProps) {
  const menuRef = useRef(null)

  return (
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation()
          setMenuOpen(true)
        }}
        ref={menuRef}
        size="small">
        <MoreHorizIcon fontSize="small" />
      </IconButton>
      <Menu
        open={open}
        anchorEl={menuRef?.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={onClose}>
        <MenuItem
          dense
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
            onClose()
          }}>
          <ListItemIcon>
            <EditRoundedIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem
          dense
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}>
          <ListItemIcon>
            <DeleteRoundedIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}
