'use client'

import { useTheme } from '@mui/material/styles'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Menu from '@/lib/components/layout/Menu'
import TopBar from '@/lib/components/layout/TopBar'

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  const cachedToggleMenu = useCallback(
    function (open?: boolean) {
      setOpen(open || false)
    },
    [setOpen]
  )

  useEffect(() => {
    // needs to be last
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="absolute h-full w-full">
      <div className="flex h-full">
        <Menu open={open} handleClose={cachedToggleMenu} matches={matches} />
        <div className="w-full flex flex-col overflow-hidden">
          <TopBar toggleMenu={cachedToggleMenu} matches={matches} />
          {children}
        </div>
      </div>
    </div>
  )
}
