import { Dispatch, Key, SetStateAction } from 'react'
import { Tabs, Tab } from '@heroui/tabs'

interface TabNavProps {
  page: string
  setPage: Dispatch<SetStateAction<string>>
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
  function handlePageChange(key: Key) {
    localStorage.setItem('tab', `${key as string}`)
    setPage(key as string)
  }

  return (
    <Tabs
      aria-label="tab-nav"
      fullWidth
      size="lg"
      radius="none"
      selectedKey={page}
      onSelectionChange={handlePageChange}
      classNames={{
        base: 'mx-4 w-auto',
        tab: 'max-sm:px-2',
        tabList: 'bg-(--background) max-sm:gap-1',
        cursor: 'bg-(--dk-blue) dark:bg-(--lt-blue) rounded-sm',
        tabContent:
          'group-data-[selected=true]:text-slate-100 dark:group-data-[selected=true]:text-slate-800'
      }}>
      <Tab title="Schedule" key="schedule" />
      <Tab title="Tasks" key="tasks" />
      <Tab title="Planning" key="planning" />
      <Tab title="Expenses" key="expenses" />
      <Tab title="Crew" key="crew" />
    </Tabs>
  )
}
