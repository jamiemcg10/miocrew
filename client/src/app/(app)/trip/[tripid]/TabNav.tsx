import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

interface TabNavProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const tabSx = {
  transition: '250ms',
  fontWeight: '600',
  fontSize: '12px',
  minWidth: '80px',
  '@media (min-width:450px)': {
    minWidth: 'initial',
    fontSize: 'initial'
  },
  '@media (min-width:640px)': {
    '&:hover': {
      color: '#1976d2'
    }
  },
  '@media (min-width:640px) and (prefers-color-scheme:dark)': {
    '&:hover': {
      color: '#90caf9'
    }
  },
  '&:active': {
    color: 'inherit'
  }
}

export default function TabNav({ page, setPage }: TabNavProps) {
  function handlePageChange(_e: SyntheticEvent, value: number) {
    localStorage.setItem('tab', `${value}`)
    setPage(value)
  }

  return (
    <Tabs value={page} onChange={handlePageChange} variant="fullWidth">
      <Tab label="Schedule" sx={tabSx} />
      <Tab label="Tasks" sx={tabSx} />
      <Tab label="Planning" sx={tabSx} />
      <Tab label="Expenses" sx={tabSx} />
      <Tab label="Crew" sx={tabSx} />
    </Tabs>
  )
}
