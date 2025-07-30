import { Trip } from '@/lib/types'

export const pastTrips = [
  {
    id: 'p1',
    name: 'Wine Moms Took on Napa',
    attendees: {
      '1': {
        id: '1',
        firstName: 'Jane',
        lastName: 'Fonda',
        color: 'purple',
        type: 'Captain',
        email: 'jane.fonda@sagaftra.com'
      },
      '2': {
        id: '2',
        firstName: 'Meryll',
        lastName: 'Streep',
        color: 'orangered',
        type: 'Crew',
        email: 'meryll.streep@sagaftra.com'
      },
      '3': {
        id: '3',
        firstName: 'Jamie Lee',
        lastName: 'Curtis',
        color: 'turquoise',
        type: 'Crew',
        email: 'jamie.lee.curtis@sagaftra.com'
      }
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
        type: 'Captain',
        email: 'meryll.streep@sagaftra.com'
      },
      '4': {
        id: '4',
        firstName: 'Dustin',
        lastName: 'Streep',
        color: 'teal',
        type: 'Admin',
        email: 'dustin.streep@yahoo.com'
      },
      '5': {
        id: '5',
        firstName: 'Luca',
        lastName: 'Streep',
        color: 'pink',
        type: 'Crew',
        email: 'luca.streep@yahoo.com'
      },
      '6': {
        id: '6',
        firstName: 'Astro',
        lastName: 'Streep',
        color: 'navy',
        type: 'Crew',
        email: 'astro.streep@yahoo.com'
      }
    },
    startDate: new Date('December 24, 2024'),
    endDate: new Date('January 2, 2025')
  },
  {
    id: 'p3',
    name: 'Monster Jam 2019',
    attendees: {
      '2': {
        id: '2',
        firstName: 'Meryll',
        lastName: 'Streep',
        color: 'orangered',
        type: 'Crew',
        email: 'meryll.streep@sagaftra.com'
      },
      '4': {
        id: '4',
        firstName: 'Dustin',
        lastName: 'Streep',
        color: 'teal',
        type: 'Captain',
        email: 'dustin.streep@yahoo.com'
      },
      '5': {
        id: '5',
        firstName: 'Luca',
        lastName: 'Streep',
        color: 'pink',
        type: 'Crew',
        email: 'luca.streep@yahoo.com'
      },
      '6': {
        id: '6',
        firstName: 'Astro',
        lastName: 'Streep',
        color: 'navy',
        type: 'Crew',
        email: 'astro.streep@yahoo.com'
      },
      '7': {
        id: '7',
        firstName: 'Johnny',
        lastName: 'Walker',
        color: 'green',
        type: 'Admin',
        email: 'johnny.walker@distillersunion.com'
      },
      '8': {
        id: '8',
        firstName: 'Jim',
        lastName: 'Beam',
        color: 'red',
        type: 'Crew',
        email: 'jim.beam@distillersunion.com'
      },
      '9': {
        id: '9',
        firstName: 'Jack',
        lastName: 'Daniels',
        color: 'black',
        type: 'Crew',
        email: 'jack.daniels@distillersunion.com'
      }
    },
    startDate: new Date('October 12, 2019')
  }
] as Trip[]
