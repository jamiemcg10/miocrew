'use client'

import { useTheme } from '@mui/material/styles'
import { ReactNode, useContext, useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Menu from '@/lib/components/layout/Menu'
import TopBar from '@/lib/components/layout/TopBar'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { redirect, RedirectType } from 'next/navigation'

export default function AppLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const { user } = useContext(UserContext)

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  function mount() {
    if (!user) {
      redirect('/login', RedirectType.replace)
    }
    setMounted(true)
  }

  function toggleMenu(open?: boolean) {
    setOpen(open || false)
  }

  // needs to be last
  useEffect(mount, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="absolute h-full w-full">
      <div className="flex h-full">
        <Menu open={open} handleClose={toggleMenu} matches={matches} />
        <div className="w-full flex flex-col overflow-hidden">
          <TopBar toggleMenu={toggleMenu} matches={matches} />
          {children}
        </div>
      </div>
    </div>
  )
}
