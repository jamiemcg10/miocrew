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
import { UserContext } from '@/lib/utils/UserContext'
import { useContext } from 'react'
import CrewAvatar from '../CrewAvatar'

interface MenuProps {
  open: boolean
  handleClose: () => void
  matches: boolean
}

export default function Menu({ open, handleClose, matches }: MenuProps) {
  const user = useContext(UserContext)

  if (!user) return

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
      <Box sx={{ height: '100%' }}>
        <List sx={{ height: '100%' }}>
          <ListItem key={'Greeting'} sx={{ pb: '1rem' }}>
            <ListItemIcon>{user ? <CrewAvatar user={user} /> : null}</ListItemIcon>
            <ListItemText
              primary={`Hi ${user?.firstName}!`}
              slotProps={{ primary: { fontWeight: 700 } }}
            />
          </ListItem>
          <Divider />
          <Divider />
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
            <ListItemButton href="/settings">
              <ListItemIcon>
                <SettingsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <div className="absolute bottom-0 w-full">
            <Divider />
            <ListItem key={'Log out'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </div>
        </List>
      </Box>
    </Drawer>
  )
}
