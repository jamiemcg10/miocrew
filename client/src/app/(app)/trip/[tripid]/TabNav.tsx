import { Dispatch, Key, SetStateAction } from 'react'
import { Tabs, Tab } from '@heroui/tabs'

interface TabNavProps {
  page: string
  setPage: Dispatch<SetStateAction<string>>
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
        base: 'sm:mx-4 w-auto',
        tab: 'max-sm:px-2 font-semibold',
        tabList: 'bg-(--background) max-sm:gap-1',
        cursor: 'bg-(--dk-blue) dark:bg-(--lt-blue) rounded-sm',
        tabContent:
          'group-data-[selected=true]:text-slate-100 dark:group-data-[selected=true]:text-slate-800'
      }}>
      <Tab title="Schedule" key="schedule" />
      <Tab title="Tasks" key="tasks" />
      <Tab title="Ideas" key="ideas" />
      <Tab title="Expenses" key="expenses" />
      <Tab title="Crew" key="crew" />
    </Tabs>
  )
}
