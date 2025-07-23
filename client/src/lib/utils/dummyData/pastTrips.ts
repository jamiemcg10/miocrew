import { Trip } from '@/lib/types'

export const pastTrips = [
  {
    id: 'p1',
    name: 'Wine Moms Took on Napa',
    attendees: {
      '1': { id: '1', firstName: 'Jane', lastName: 'Fonda', color: 'purple', type: 'Captain' }, // color should really be their avatar
      '2': { id: '2', firstName: 'Meryll', lastName: 'Streep', color: 'orangered', type: 'Crew' },
      '3': { id: '3', firstName: 'Jamie Lee', lastName: 'Curtis', color: 'turquoise', type: 'Crew' }
    },
    sartDate: new Date('October 5, 2023'),
    endDate: new Date('October 12, 2023')
  },
  {
    id: 'p2',
    name: "Last Year's Streep Family Vacation",
    attendees: {
      '2': {
        id: '2',
        firstName: 'Meryll',
        lastName: 'Streep',
        color: 'orangered',
        type: 'Captain'
      },
      '4': { id: '4', firstName: 'Dustin', lastName: 'Streep', color: 'teal', type: 'Admin' }, // TODO: make users dummyData
      '5': { id: '5', firstName: 'Luca', lastName: 'Streep', color: 'pink', type: 'Crew' },
      '6': { id: '6', firstName: 'Astro', lastName: 'Streep', color: 'navy', type: 'Crew' }
    },
    startDate: new Date('December 24, 2024'),
    endDate: new Date('January 2, 2025')
  },
  {
    id: 'p3',
    name: 'Monster Jam 2019',
    attendees: {
      '2': { id: '2', firstName: 'Meryll', lastName: 'Streep', color: 'orangered', type: 'Crew' },
      '4': { id: '4', firstName: 'Dustin', lastName: 'Streep', color: 'teal', type: 'Captain' },
      '5': { id: '5', firstName: 'Luca', lastName: 'Streep', color: 'pink', type: 'Crew' },
      '6': { id: '6', firstName: 'Astro', lastName: 'Streep', color: 'navy', type: 'Crew' },
      '7': { id: '7', firstName: 'Johnny', lastName: 'Walker', color: 'green', type: 'Admin' },
      '8': { id: '8', firstName: 'Jim', lastName: 'Beam', color: 'red', type: 'Crew' },
      '9': { id: '9', firstName: 'Jack', lastName: 'Daniels', color: 'black', type: 'Crew' }
    },
    startDate: new Date('October 12, 2019')
  }
] as Trip[]
