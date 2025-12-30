import { ReactNode } from 'react'

interface TableRowProps {
  children: ReactNode
  onClick?: () => void
  classes?: string
}

export default function TableRow({ children, classes, onClick }: TableRowProps) {
  const rowClasses = `min-h-12.5 flex justify-between items-center border-b-gray-300 border-b-1 cursor-pointer transition-colors hover:bg-black/10 active:bg-black/5 dark:hover:bg-white/10 dark:active:bg-white/5 ${classes}`

  return (
    <div className={rowClasses} onClick={onClick}>
      {children}
    </div>
  )
}
