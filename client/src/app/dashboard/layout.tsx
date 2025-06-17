'use client'

import { Box, Drawer } from '@mui/material'
import { ReactNode, useState } from 'react'

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  // rename when moved
  const [open, setOpen] = useState(true)
  return (
    <div>
      <Drawer open={open}>
        <Box sx={{ width: 250 }}></Box>
      </Drawer>
      {children}
    </div>
  )
}
