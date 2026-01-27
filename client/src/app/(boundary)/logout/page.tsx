'use client'

import { UserContext } from '@/lib/utils/contexts/UserContext'
import { LocalStorage } from '@/lib/utils/LocalStorage'
import { redirect, RedirectType } from 'next/navigation'
import { useContext, useEffect } from 'react'

export default function Logout() {
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    LocalStorage.clear()
    setUser(null)
    redirect('/login', RedirectType.replace)
  })

  return <div className="flex w-screen h-screen justify-center items-center">Logging out...</div>
}
