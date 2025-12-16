import { Idea } from '@/lib/types'
import { LocalStorage } from '@/lib/utils/LocalStorage'
import { createContext, ReactNode } from 'react'

interface TripProps {
  tripId: string
  children: ReactNode
}

export const IdeasContext = createContext<Idea[]>([])

export default function TripWrapper({ tripId, children }: TripProps) {
  const storedIdeas = LocalStorage.get<Idea[]>(`${tripId}:ideas`)

  return (
    <>
      <IdeasContext value={storedIdeas || []}>{children}</IdeasContext>
    </>
  )
}
