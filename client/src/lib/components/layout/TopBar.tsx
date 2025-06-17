import { AppBar, IconButton } from '@mui/material'

interface TopBarProps {
  toggleMenu: (v: boolean) => void
  matches: boolean
}

export default function TopBar({ toggleMenu, matches }: TopBarProps) {
  return (
    <AppBar sx={[{ position: 'relative', height: '56px' }, matches && { display: 'none' }]}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => toggleMenu(true)}
        sx={[
          {
            mr: 2,
            width: 'max-content'
          }
        ]}>
        M
      </IconButton>
    </AppBar>
  )
}
