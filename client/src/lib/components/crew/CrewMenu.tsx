import { CrewMember } from '@/lib/types'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

interface CrewMenuProps {
  onClose: () => void
  anchorEl: HTMLButtonElement | null
  activeCrewMember?: CrewMember
  onClickRemove: () => void
}
export default function CrewMenu({
  anchorEl,
  onClose,
  onClickRemove,
  activeCrewMember
}: CrewMenuProps) {
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
      {activeCrewMember?.type !== 'Admin' ? (
        <MenuItem>Make admin</MenuItem>
      ) : (
        <MenuItem>Remove admin</MenuItem>
      )}
      <MenuItem onClick={onClickRemove}>Remove from trip</MenuItem>
    </Menu>
  )
}
