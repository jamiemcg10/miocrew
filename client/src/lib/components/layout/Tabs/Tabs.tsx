import { useEffect, useRef, useState, ReactElement, MouseEvent } from 'react'
import { TabsContext } from './context'
import { TabProps, TabsProps } from './types'
import Tab from './Tab'

export default function Tabs({ children, selectedPage, onSelectionChange = () => {} }: TabsProps) {
  function getWidth() {
    if (!navRef.current) return 0

    return navRef.current.clientWidth / children.length
  }
  function onSelectTab(e: MouseEvent<HTMLDivElement>) {
    const eventTarget = e.target as HTMLDivElement

    for (let i = 0; i < children.length; i++) {
      if (eventTarget.textContent === children[i].props.title) {
        setSelected(i)
        setSelectedTab(children[i].props.value)
        setCursorPosition(eventTarget.offsetLeft)
        onSelectionChange(children[i].props.value)
      }
    }
  }

  function handleResize() {
    requestAnimationFrame(() => {
      setCursorPosition(getWidth() * selected)
      setCursorWidth(getWidth())
    })
  }

  const navRef = useRef<HTMLDivElement | null>(null)

  const initialSelected = children.findIndex(
    (c: ReactElement<TabProps, typeof Tab>) => selectedPage === c.props.value
  )

  const [selected, setSelected] = useState(initialSelected)
  const [selectedTab, setSelectedTab] = useState<any | null>(selectedPage)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [cursorWidth, setCursorWidth] = useState(0)

  useEffect(() => {
    if (!navRef.current) return

    handleResize()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [selected])

  return (
    <TabsContext value={{ onSelectTab, selectedTab }}>
      <div className="relative flex mx-1 xs:mx-4" ref={navRef}>
        <div
          className="absolute h-full -z-1 transition-left bg-(--dk-blue) dark:bg-(--lt-blue) rounded-sm"
          style={{
            left: cursorPosition + 'px',
            width: cursorWidth + 'px',
            display: cursorWidth > 0 ? 'block' : 'none'
          }}></div>
        {children}
      </div>
    </TabsContext>
  )
}
