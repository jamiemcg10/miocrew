import { CrewMember } from '@/lib/types'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

interface CrewMenuProps {
  onClose: () => void
  anchorEl: HTMLButtonElement | null
  activeCrewMemberType?: CrewMember['type']
}
export default function CrewMenu({ anchorEl, onClose, activeCrewMemberType }: CrewMenuProps) {
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
      {activeCrewMemberType !== 'Admin' ? (
        <MenuItem>Make admin</MenuItem>
      ) : (
        <MenuItem>Remove admin</MenuItem>
      )}
      <MenuItem>Remove from trip</MenuItem>
    </Menu>
  )
}
