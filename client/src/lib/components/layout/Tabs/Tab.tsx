import { useContext } from 'react'
import { TabProps } from './types'
import { TabsContext } from './context'

export default function Tab({ title, value }: TabProps) {
  const ctx = useContext(TabsContext)
  if (!ctx) return

  const { onSelectTab, selectedTab } = ctx

  return (
    <div
      onClick={onSelectTab}
      className={
        'text-sm max-sm:px-2 font-semibold grow shrink basis-0 cursor-pointer h-8 text-center content-center ' +
        (selectedTab === value && 'text-slate-100 dark:text-slate-800')
      }>
      {title}
    </div>
  )
}
