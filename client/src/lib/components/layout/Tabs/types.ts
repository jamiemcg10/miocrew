import { MouseEventHandler, ReactElement } from 'react'
import Tab from './Tab'

export type Value = string | number

export interface TabProps {
  title: string
  value: Value
}

export interface TabsProps {
  selectedPage: Value
  onSelectionChange?: Function
  children: ReactElement<TabProps, typeof Tab>[]
}

export interface TabsContextType {
  onSelectTab: MouseEventHandler<HTMLDivElement>
  selectedTab: Value
}
