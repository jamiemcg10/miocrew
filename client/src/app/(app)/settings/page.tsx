'use client'

import CrewAvatar from '@/lib/components/CrewAvatar'
import { UserContext } from '@/lib/utils/UserContext'
import IconButton from '@mui/material/IconButton'
import { useContext, useRef } from 'react'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import Tooltip from '@mui/material/Tooltip'

export default function SettingsPage() {
  function onClickUpload() {
    inputRef.current?.click()
  }

  const user = useContext(UserContext)
  const inputRef = useRef<HTMLInputElement | null>(null)

  if (!user) return

  return (
    <>
      <div className="p-16">
        <div className="text-xl font-semibold mb-8">Settings</div>
        <div className="flex items-center px-4">
          <div className="relative">
            <CrewAvatar user={user} size="lg" baseClasses="mx-4" />

            <Tooltip
              title="Upload avatar"
              slotProps={{
                popper: { modifiers: [{ name: 'offset', options: { offset: [12, -14] } }] }
              }}>
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  transform: 'translate(-25%, 40%)'
                }}
                onClick={onClickUpload}>
                <AddAPhotoIcon sx={{ fontSize: '16px' }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <input type="file" ref={inputRef} className="hidden" />
    </>
  )
}
