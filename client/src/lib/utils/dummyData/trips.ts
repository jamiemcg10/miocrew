import { Trip } from '@/lib/types'

export const trips = [
  {
    id: '1',
    name: 'Wine Moms Take on Napa',
    location: 'Napa, CA',
    description: '',
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
    startDate: 'August 5, 2026',
    endDate: 'August 12, 2026'
  },
  {
    id: '2',
    name: 'Streep Family Vacation',
    location: 'Los Angeles, CA',
    description: '',
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
    startDate: 'December 24, 2026',
    endDate: 'January 2, 2027'
  },
  {
    id: '3',
    name: 'Monster Jam',
    location: 'Manchester, NH',
    description: '',
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
        olor: 'black',
        type: 'Crew',
        email: 'jack.daniels@distillersunion.com'
      }
    },
    startDate: 'March 4, 2026'
  },
  {
    id: 'p1',
    name: 'Wine Moms Took on Napa',
    location: 'Napa, CA',
    description: '',
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
    startDate: 'October 5, 2023',
    endDate: 'October 12, 2023'
  },
  {
    id: 'p2',
    name: "Last Year's Streep Family Vacation",
    location: 'Atlanta, GA',
    description: '',
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
    startDate: 'December 24, 2024',
    endDate: 'January 2, 2025'
  },
  {
    id: 'p3',
    name: 'Monster Jam 2019',
    location: 'Concord, NH',
    description: '',
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
    startDate: 'October 12, 2019'
  }
] as Trip[]
