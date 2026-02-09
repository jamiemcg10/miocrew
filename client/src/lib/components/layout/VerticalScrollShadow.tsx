import { ReactNode } from 'react'

interface VerticalScrollShadowProps {
  children: ReactNode
  classes?: { base?: string; slot?: string }
}

export default function VerticalScrollShadow({ children, classes }: VerticalScrollShadowProps) {
  classes = { base: classes?.base || '', slot: classes?.slot || '' }
  return (
    <div className={'vertical-scroll relative overflow-y-auto ' + classes.base}>
      <div className="sticky -top-1 z-1 w-full h-3 bg-linear-to-b from-background to-transparent"></div>
      <div className={'relative overflow-y-hidden px-4 -my-1 ' + classes.slot}>{children}</div>
      <div className="sticky -bottom-1 w-full h-3 bg-linear-to-t from-background to-transparent"></div>
    </div>
  )
}
