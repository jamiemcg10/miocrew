'use client'

import { ReactNode, useState } from 'react'
import { User } from '@/lib/types'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { LocalStorage } from '@/lib/utils/LocalStorage'

export default function BoundaryLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const storedUser = LocalStorage.get<User>('user')
  const [user, setUser] = useState<User | null>(storedUser || null)

  return <UserContext value={{ user, setUser }}>{children}</UserContext>
}
