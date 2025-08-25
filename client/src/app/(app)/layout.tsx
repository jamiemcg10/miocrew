'use client'

import { useTheme } from '@mui/material/styles'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Menu from '@/lib/components/layout/Menu'
import TopBar from '@/lib/components/layout/TopBar'
import { UserContext } from '@/lib/utils/UserContext'
import { User } from '@/lib/types'
import axios from 'axios'
import { LocalStorage } from '@/lib/utils/LocalStorage'

export default function AppLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  async function getUser() {
    axios
      .get(`http://localhost:8000/user/2`) // user hardcoded for now
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user)
          LocalStorage.set('user', response.data.user)
        }
      })
      .catch((e) => console.error('Error fetching user', e))
  }

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  function mount() {
    setMounted(true)
  }

  const cachedToggleMenu = useCallback(
    function (open?: boolean) {
      setOpen(open || false)
    },
    [setOpen]
  )

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const _user = LocalStorage.get<User>('user')

    if (!_user) {
      getUser()
    } else {
      setUser(_user)
    }
  }, [])

  // needs to be last
  useEffect(mount, [])

  if (!mounted) {
    return null
  }

  return (
    <UserContext value={user}>
      <div className="absolute h-full w-full">
        <div className="flex h-full">
          <Menu open={open} handleClose={cachedToggleMenu} matches={matches} />
          <div className="w-full flex flex-col overflow-hidden">
            <TopBar toggleMenu={cachedToggleMenu} matches={matches} />
            {children}
          </div>
        </div>
      </div>
    </UserContext>
  )
}
