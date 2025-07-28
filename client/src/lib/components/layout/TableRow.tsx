import { ReactNode } from 'react'

interface TableRowProps {
  children: ReactNode
  onClick?: () => void
  classes?: string
}

export default function TableRow({ children, classes, onClick }: TableRowProps) {
  return (
    <div
      className={`min-h-[3.125rem] flex justify-between items-center border-b-gray-300 border-b-1 cursor-pointer transition-colors hover:bg-black/10 active:bg-black/5 dark:hover:bg-white/10 dark:active:bg-white/5 ${classes}`}
      onClick={onClick}>
      {children}
    </div>
  )
}
