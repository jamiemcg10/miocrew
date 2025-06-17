'use client'

import { createTheme, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'

const theme = createTheme({
  colorSchemes: {
    dark: true
  }
})

export default function Theme({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
