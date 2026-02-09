'use client'

import { getUsers } from '@/db'
import { User } from '@/lib/types'
import { LocalStorage } from '@/lib/utils/LocalStorage'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import Button from '@mui/material/Button'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { redirect, RedirectType } from 'next/navigation'

const selectSx = { width: 300 }
const loginBtnSx = { fontWeight: 700, mt: 5 }

type Users = Record<string, User>

export default function LoginPage() {
  const { user, setUser } = useContext(UserContext)
  const [users, setUsers] = useState<Users>({})
  const [selectedUserId, setSelectedUserId] = useState('')

  function login() {
    const user = users[selectedUserId]
    setUser(user)
    LocalStorage.set('user', user)
    redirect('/dashboard', RedirectType.replace)
  }

  const mappedUsers = Object.values(users).map((u) => (
    <MenuItem key={u.id} value={u.id}>
      {u.firstName} {u.lastName}
    </MenuItem>
  ))

  useEffect(() => {
    if (user) {
      redirect('/dashboard', RedirectType.replace)
    }

    getUsers().then((response) => {
      const reducedUsers = response.data.users.reduce((acc: Users, c: User) => {
        return { ...acc, [c.id]: c }
      }, {} as Users)
      setUsers(reducedUsers)
    })
  }, [])

  return (
    <div className="absolute flex flex-col h-full w-full items-center justify-center">
      <Image src="/goose.svg" height="128" width="128" alt="traveling goose" loading="eager" />

      <div>
        <span className="text-7xl font-bold text-blue-400">Mio</span>
        <span className="text-gray-400 text-2xl font-bold">Crew</span>
      </div>
      <FormControl>
        <InputLabel>Select user</InputLabel>
        <Select
          label="Select user"
          sx={selectSx}
          value={selectedUserId}
          variant="filled"
          onChange={(u) => setSelectedUserId(u.target.value)}>
          <MenuItem value={''}>&nbsp;</MenuItem>
          {mappedUsers}
        </Select>
      </FormControl>
      <Button variant="contained" disabled={!selectedUserId} onClick={login} sx={loginBtnSx}>
        Let's go!
      </Button>
    </div>
  )
}
