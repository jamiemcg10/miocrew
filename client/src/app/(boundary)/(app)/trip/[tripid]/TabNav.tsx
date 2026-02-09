import Tab from '@/lib/components/layout/Tabs/Tab'
import Tabs from '@/lib/components/layout/Tabs/Tabs'
import { Value } from '@/lib/components/layout/Tabs/types'
import { Dispatch, SetStateAction } from 'react'

interface TabNavProps {
  page: string
  setPage: Dispatch<SetStateAction<string>>
}

export default function TabNav({ page, setPage }: TabNavProps) {
  function handlePageChange(value: Value) {
    localStorage.setItem('tab', `${value as string}`)
    setPage(value as string)
  }

  return (
    <Tabs selectedPage={page} onSelectionChange={handlePageChange}>
      <Tab title="Schedule" value="schedule"></Tab>
      <Tab title="Tasks" value="tasks"></Tab>
      <Tab title="Ideas" value="ideas"></Tab>
      <Tab title="Expenses" value="expenses"></Tab>
      <Tab title="Crew" value="crew"></Tab>
    </Tabs>
  )
}
