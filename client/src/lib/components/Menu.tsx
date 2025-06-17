import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import { Box, Drawer } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface MenuProps {
  open: boolean
  handleClose: () => void
}

export default function Menu({ open, handleClose }: MenuProps) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm')) // might be able to centralize this in layout

  return (
    <Drawer
      sx={{
        width: '250px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 'inherit'
        }
      }}
      variant={matches ? 'permanent' : 'temporary'}
      anchor="left"
      open={matches || open}
      onClose={handleClose}>
      <Box>
        <List>
          {['Dashboard', 'Schedule', 'Tasks', 'Planning', 'Expenses'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem key={'Messages'} disablePadding>
            <ListItemButton>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={'Past trips'} disablePadding>
            <ListItemButton>
              <ListItemText primary="Past trips" />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Settings'} disablePadding>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
