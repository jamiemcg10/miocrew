import { AppBar, IconButton } from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

interface TopBarProps {
  toggleMenu: (v: boolean) => void
  matches: boolean
}

export default function TopBar({ toggleMenu, matches }: TopBarProps) {
  return (
    <AppBar
      sx={[
        { position: 'relative', height: '56px', placeContent: 'center' },
        matches && { display: 'none' }
      ]}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => toggleMenu(true)}
        sx={[
          {
            ml: 1,
            width: 'max-content'
          }
        ]}>
        <MenuRoundedIcon />
      </IconButton>
    </AppBar>
  )
}
