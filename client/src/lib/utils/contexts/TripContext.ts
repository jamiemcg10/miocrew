import { createContext } from 'react'
import { Trip } from '../../types'

export const TripContext = createContext<Trip | null>(null)
