import { User } from '@/lib/types'

export const users = {
  '1': { id: '1', firstName: 'Jane', lastName: 'Fonda', color: 'purple' }, // color should really be their avatar
  '2': {
    id: '2',
    firstName: 'Meryll',
    lastName: 'Streep',
    color: 'orangered'
  },
  '3': {
    id: '3',
    firstName: 'Jamie Lee',
    lastName: 'Curtis',
    color: 'turquoise'
  },
  '4': { id: '4', firstName: 'Dustin', lastName: 'Streep', color: 'teal' },
  '5': { id: '5', firstName: 'Luca', lastName: 'Streep', color: 'pink' },
  '6': { id: '6', firstName: 'Astro', lastName: 'Streep', color: 'navy' },
  '7': { id: '7', firstName: 'Johnny', lastName: 'Walker', color: 'green' },
  '8': { id: '8', firstName: 'Jim', lastName: 'Beam', color: 'red' },
  '9': { id: '9', firstName: 'Jack', lastName: 'Daniels', color: 'black' }
} as Record<string, User>
