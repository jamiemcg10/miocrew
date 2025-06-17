'use client'

import { AppBar, Box, Drawer, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { ReactNode, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  // rename DashboardLayout when moved
  // use useCallback for onClose function when finalized
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const [open, setOpen] = useState(true)
  return (
    <div>
      <AppBar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(!open)}
          edge="start"
          sx={[
            {
              mr: 2,
              height: '56px'
            },
            open && { display: 'none' }
          ]}>
          {/* <MenuIcon /> */}M
        </IconButton>
      </AppBar>
      <div className="flex">
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
          onClose={() => setOpen(false)}>
          <Box>
            <List>
              {['Dashboard', 'Schedule', 'Tasks', 'Planning', 'Expenses'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider />
              <ListItem key={'Past trips'} disablePadding>
                <ListItemButton>
                  <ListItemText primary="Past trips" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        {children}
      </div>
    </div>
  )
}
