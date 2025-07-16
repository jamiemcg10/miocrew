import { Trip } from '@/lib/types'

export const trips = [
  {
    id: '1',
    name: 'Wine Moms Take on Napa',
    attendees: {
      '1': { id: '1', firstName: 'Jane', lastName: 'Fonda', color: 'purple', type: 'Owner' }, // color should really be their avatar
      '2': {
        id: '2',
        firstName: 'Meryll',
        lastName: 'Streep',
        color: 'orangered',
        type: 'Crew'
      },
      '3': {
        id: '3',
        firstName: 'Jamie Lee',
        lastName: 'Curtis',
        color: 'turquoise',
        type: 'Crew'
      }
    },
    startDate: new Date('August 5, 2026'),
    endDate: new Date('August 12, 2026')
  },
  {
    id: '2',
    name: 'Streep Family Vacation',
    attendees: {
      '2': { id: '2', firstName: 'Meryll', lastName: 'Streep', color: 'orangered', type: 'Owner' },
      '4': { id: '4', firstName: 'Dustin', lastName: 'Streep', color: 'teal', type: 'Admin' },
      '5': { id: '5', firstName: 'Luca', lastName: 'Streep', color: 'pink', type: 'Crew' },
      '6': { id: '6', firstName: 'Astro', lastName: 'Streep', color: 'navy', type: 'Crew' }
    },
    startDate: new Date('December 24, 2026'),
    endDate: new Date('January 2, 2027')
  },
  {
    id: '3',
    name: 'Monster Jam',
    attendees: {
      '2': {
        id: '2',
        firstName: 'Meryll',
        lastName: 'Streep',
        color: 'orangered',
        type: 'Attendee'
      },
      '4': { id: '4', firstName: 'Dustin', lastName: 'Streep', color: 'teal', type: 'Owner' },
      '5': { id: '5', firstName: 'Luca', lastName: 'Streep', color: 'pink', type: 'Crew' },
      '6': { id: '6', firstName: 'Astro', lastName: 'Streep', color: 'navy', type: 'Crew' },
      '7': { id: '7', firstName: 'Johnny', lastName: 'Walker', color: 'green', type: 'Admin' },
      '8': { id: '8', firstName: 'Jim', lastName: 'Beam', color: 'red', type: 'Crew' },
      '9': { id: '9', firstName: 'Jack', lastName: 'Daniels', olor: 'black', type: 'Crew' }
    },
    startDate: new Date('October 4, 2025')
  }
] as Trip[]
