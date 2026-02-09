import { createContext } from 'react'
import { Trip } from '../../types'

interface TripContextType {
  trip: Trip | null
  tripIsOver: boolean
}

export const TripContext = createContext<TripContextType>({ trip: null, tripIsOver: false })
