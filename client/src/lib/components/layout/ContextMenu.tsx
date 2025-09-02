import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

interface ContextMenuProps {
  open: boolean
  onClose: () => void
  anchorEl: HTMLButtonElement | null
  onDelete: () => void
  onEdit: () => void
}
export default function ContextMenu({
  open,
  anchorEl,
  onClose,
  onDelete,
  onEdit
}: ContextMenuProps) {
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
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
        onClick={() => {
          onEdit()
          onClose()
        }}>
        <ListItemIcon>
          <EditRoundedIcon fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>
      <MenuItem dense onClick={onDelete}>
        <ListItemIcon>
          <DeleteRoundedIcon fontSize="small" />
        </ListItemIcon>
        Delete
      </MenuItem>
    </Menu>
  )
}
