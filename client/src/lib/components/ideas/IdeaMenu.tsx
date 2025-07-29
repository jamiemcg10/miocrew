import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

interface IdeaMenuProps {
  open: boolean
  onClose: () => void
  anchorEl: HTMLButtonElement | null
}
export default function IdeaMenu({ open, anchorEl, onClose }: IdeaMenuProps) {
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
      <MenuItem dense>
        <ListItemIcon>
          <EditRoundedIcon fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <DeleteRoundedIcon fontSize="small" />
        </ListItemIcon>
        Delete
      </MenuItem>
    </Menu>
  )
}
