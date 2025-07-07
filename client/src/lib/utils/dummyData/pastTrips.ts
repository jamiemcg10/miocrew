import { Trip } from '@/lib/types'

export const pastTrips = [
  {
    id: 'p1',
    name: 'Wine Moms Took on Napa',
    attendees: [
      { id: '1', firstName: 'Jane', lastName: 'Fonda', color: 'purple' }, // color should really be their avatar
      { id: '2', firstName: 'Meryll', lastName: 'Streep', color: 'orangered' },
      { id: '3', firstName: 'Jamie Lee', lastName: 'Curtis', color: 'turquoise' }
    ],
    startDate: new Date('October 5, 2023'),
    endDate: new Date('October 12, 2023')
  },
  {
    id: 'p2',
    name: "Last Year's Streep Family Vacation",
    attendees: [
      { id: '2', firstName: 'Meryll', lastName: 'Streep', color: 'orangered' },
      { id: '4', firstName: 'Dustin', lastName: 'Streep', color: 'teal' },
      { id: '5', firstName: 'Luca', lastName: 'Streep', color: 'pink' },
      { id: '6', firstName: 'Astro', lastName: 'Streep', color: 'navy' }
    ],
    startDate: new Date('December 24, 2024'),
    endDate: new Date('January 2, 2025')
  },
  {
    id: 'p3',
    name: 'Monster Jam 2019',
    attendees: [
      { id: '2', firstName: 'Meryll', lastName: 'Streep', color: 'orangered' },
      { id: '4', firstName: 'Dustin', lastName: 'Streep', color: 'teal' },
      { id: '5', firstName: 'Luca', lastName: 'Streep', color: 'pink' },
      { id: '6', firstName: 'Astro', lastName: 'Streep', color: 'navy' },
      { id: '7', firstName: 'Johnny', lastName: 'Walker', color: 'green' },
      { id: '8', firstName: 'Jim', lastName: 'Beam', color: 'red' },
      { id: '9', firstName: 'Jack', lastName: 'Daniels', color: 'black' }
    ],
    startDate: new Date('October 12, 2019')
  }
] as Trip[]
