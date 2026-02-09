import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { SxProps } from '@mui/material/styles'

interface TopBarProps {
  toggleMenu: (v: boolean) => void
  matches: boolean
}

const iconBtnSx: SxProps = [
  {
    ml: 1,
    width: 'max-content'
  }
]

export default function TopBar({ toggleMenu, matches }: TopBarProps) {
  function onClick() {
    toggleMenu(true)
  }

  const appBarSx: SxProps = [
    { position: 'relative', height: '56px', placeContent: 'center' },
    matches && { display: 'none' }
  ]

  return (
    <AppBar sx={appBarSx}>
      <IconButton color="inherit" aria-label="open drawer" onClick={onClick} sx={iconBtnSx}>
        <MenuRoundedIcon />
      </IconButton>
    </AppBar>
  )
}
