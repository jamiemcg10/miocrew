import { CrewMember, Trip } from '@/lib/types'

export const trips = [
  {
    id: '1',
    name: 'Wine Moms Take on Napa',
    attendees: [
      { id: '1', firstName: 'Jane', lastName: 'Fonda', color: 'purple', type: 'Owner' }, // color should really be their avatar
      { id: '2', firstName: 'Meryll', lastName: 'Streep', color: 'orangered', type: 'Attendee' },
      { id: '3', firstName: 'Jamie Lee', lastName: 'Curtis', color: 'turquoise', type: 'Attendee' }
    ] as CrewMember[],
    startDate: new Date('August 5, 2026'),
    endDate: new Date('August 12, 2026')
  },
  {
    id: '2',
    name: 'Streep Family Vacation',
    attendees: [
      { id: '2', firstName: 'Meryll', lastName: 'Streep', color: 'orangered', type: 'Owner' },
      { id: '4', firstName: 'Dustin', lastName: 'Streep', color: 'teal', type: 'Admin' },
      { id: '5', firstName: 'Luca', lastName: 'Streep', color: 'pink', type: 'Attendee' },
      { id: '6', firstName: 'Astro', lastName: 'Streep', color: 'navy', type: 'Attendee' }
    ] as CrewMember[],
    startDate: new Date('December 24, 2026'),
    endDate: new Date('January 2, 2027')
  },
  {
    id: '3',
    name: 'Monster Jam',
    attendees: [
      { id: '2', firstName: 'Meryll', lastName: 'Streep', color: 'orangered', type: 'Attendee' },
      { id: '4', firstName: 'Dustin', lastName: 'Streep', color: 'teal', type: 'Owner' },
      { id: '5', firstName: 'Luca', lastName: 'Streep', color: 'pink', type: 'Attendee' },
      { id: '6', firstName: 'Astro', lastName: 'Streep', color: 'navy', type: 'Attendee' },
      { id: '7', firstName: 'Johnny', lastName: 'Walker', color: 'green', type: 'Admin' },
      { id: '8', firstName: 'Jim', lastName: 'Beam', color: 'red', type: 'Attendee' },
      { id: '9', firstName: 'Jack', lastName: 'Daniels', olor: 'black', type: 'Attendee' }
    ] as CrewMember[],
    startDate: new Date('October 4, 2025')
  }
] as Trip[]
