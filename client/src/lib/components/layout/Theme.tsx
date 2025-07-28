'use client'

import { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { createTheme, ThemeProvider } from '@mui/material/styles'

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
  return (
    <NextThemesProvider attribute="class" enableSystem={true} defaultTheme="system">
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </NextThemesProvider>
  )
}
