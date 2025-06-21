import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'

interface MenuProps {
  open: boolean
  handleClose: () => void
  matches: boolean
}

export default function Menu({ open, handleClose, matches }: MenuProps) {
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
      onClose={() => handleClose()}>
      <Box>
        <List>
          <ListItem key={'Dashboard'} disablePadding>
            <ListItemButton href="/dashboard">
              <ListItemText primary={'Dashboard'} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={'Messages'} disablePadding>
            <ListItemButton>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={'Past trips'} disablePadding>
            <ListItemButton href="/past">
              <ListItemText primary="Past trips" />
            </ListItemButton>
          </ListItem>
          <Divider />
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
