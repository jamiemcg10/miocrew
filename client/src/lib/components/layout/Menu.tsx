import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import ListItemIcon from '@mui/material/ListItemIcon'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded'
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded'
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded'

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
              <ListItemIcon>
                <TableChartRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={'Messages'} disablePadding>
            <ListItemButton href="/inbox">
              <ListItemIcon>
                <EmailRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={'Craete trip'} disablePadding>
            <ListItemButton href="/create">
              <ListItemIcon>
                <EditCalendarRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Create trip" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={'Past trips'} disablePadding>
            <ListItemButton href="/past">
              <ListItemIcon>
                <WorkHistoryRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Past trips" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={'Settings'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={'Log out'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
