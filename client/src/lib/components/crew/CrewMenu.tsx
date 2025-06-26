import { Menu, MenuItem } from '@mui/material'

interface CrewMenuProps {
  onClose: () => void
  anchorEl: HTMLButtonElement | null
}
export default function CrewMenu({ anchorEl, onClose }: CrewMenuProps) {
  return (
    <Menu
      open={!!anchorEl}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      onClose={onClose}>
      <MenuItem>Make admin</MenuItem>
      <MenuItem>Remove admin</MenuItem>
      <MenuItem>Remove from trip</MenuItem>
    </Menu>
  )
}
