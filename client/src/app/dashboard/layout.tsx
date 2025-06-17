'use client'

import { AppBar, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ReactNode, useCallback, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Menu from '@/lib/components/Menu'

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  // rename DashboardLayout when moved
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const [open, setOpen] = useState(true)

  const cachedCloseMenu = useCallback(
    function () {
      setOpen(false)
    },
    [setOpen]
  )

  return (
    <div>
      <div className="flex">
        <Menu open={open} handleClose={cachedCloseMenu} />
        <div className="w-full">
          <AppBar sx={[{ position: 'relative', height: '56px' }, matches && { display: 'none' }]}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              sx={[
                {
                  mr: 2,
                  width: 'max-content'
                }
              ]}>
              M
            </IconButton>
          </AppBar>
          {children}
        </div>
      </div>
    </div>
  )
}
