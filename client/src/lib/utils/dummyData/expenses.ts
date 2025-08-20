import { Expense } from '@/lib/types'
import { users } from './users'
import { trips } from './trips'

export const expenses = [
  {
    id: 'exp1',
    tripId: '1',
    paidBy: {
      id: '1',
      firstName: 'Jane',
      lastName: 'Fonda',
      color: 'purple',
      type: 'Captain' as const,
      email: 'jane.fonda@sagaftra.com'
    },
    name: 'AirBnB',
    total: 3129.85,
    split: 'Even' as const,
    owe: [
      { owes: 1043.28, paid: true, ...users['1'] },
      { owes: 1043.28, paid: false, ...users['2'] },
      { owes: 1043.29, paid: false, ...users['3'] }
    ],
    settled: false,
    due: 'immediate' as const,
    date: new Date('January 23, 2026')
  },
  {
    id: 'exp2',
    tripId: '1',
    paidBy: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered',
      type: 'Crew' as const,
      email: 'meryll.streep@sagaftra.com'
    },
    name: 'Early brunch',
    total: 198.95,
    split: 'Custom' as const,
    owe: [
      { owes: 101, paid: false, ...users['1'] },
      { owes: 97.95, paid: true, ...users['2'] }
    ],
    settled: false,
    due: 'end' as const,
    date: new Date('August 3, 2026'),
    notes: 'They comped my muffin because it took so long.'
  },
  {
    id: 'exp3',
    tripId: '1',
    paidBy: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered',
      type: 'Crew' as const,
      email: 'meryll.streep@sagaftra.com'
    },
    name: 'Bike tour',
    total: 66,
    split: 'Even' as const,
    owe: [
      { owes: 22, paid: false, ...users['1'] },
      { owes: 22, paid: true, ...users['2'] },
      { owes: 22, paid: false, ...users['3'] }
    ],
    settled: false,
    due: 'end' as const,
    date: new Date('August 4, 2026')
  },
  {
    id: 'exp4',
    tripId: '3',
    paidBy: {
      id: '7',
      firstName: 'Johnny',
      lastName: 'Walker',
      color: 'green',
      type: 'Admin' as const,
      email: 'johnny.walker@distillersunion.com'
    },
    name: 'Hotel',
    total: 3129.85,
    split: 'Custom' as const,
    owe: [
      { owes: 1251.94, paid: false, ...users['4'] },
      { owes: 625.97, paid: true, ...users['7'] },
      { owes: 625.97, paid: false, ...users['8'] },
      { owes: 625.97, paid: false, ...users['9'] }
    ],
    settled: false,
    due: 'immediate' as const,
    date: new Date('October 5, 2025')
  },
  {
    id: 'exp5',
    tripId: '3',
    paidBy: {
      id: '4',
      firstName: 'Dustin',
      lastName: 'Streep',
      color: 'teal',
      type: 'Captain' as const,
      email: 'dustin.streep@yahoo.com'
    },
    name: 'Tickets',
    total: 225,
    split: 'Custom' as const,
    owe: [
      { owes: 120, paid: true, ...users['4'] },
      { owes: 35, paid: false, ...users['7'] },
      { owes: 35, paid: false, ...users['8'] },
      { owes: 35, paid: false, ...users['9'] }
    ],
    settled: false,
    due: 'end' as const,
    date: new Date('October 5, 2025'),
    notes: 'Family tickets grouped together'
  },
  {
    id: 'exp6',
    tripId: '1',
    paidBy: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered',
      type: 'Crew' as const,
      email: 'meryll.streep@sagaftra.com'
    },
    name: 'JetBlue flights',
    total: 2032,
    split: 'Even' as const,
    owe: [
      { owes: 677.33, paid: true, ...users['1'] },
      { owes: 677.33, paid: true, ...users['2'] },
      { owes: 677.34, paid: true, ...users['3'] }
    ],
    settled: true,
    due: 'immediate' as const,
    date: new Date('June 4, 2026')
  },
  {
    id: 'exp7',
    tripId: '1',
    paidBy: {
      id: '1',
      firstName: 'Jane',
      lastName: 'Fonda',
      color: 'purple',
      type: 'Captain' as const,
      email: 'jane.fonda@sagaftra.com'
    },
    name: 'Airport coffee',
    total: 10,
    split: 'Even' as const,
    owe: [
      { owes: 5, paid: true, ...users['1'] },
      { owes: 5, paid: false, ...users['3'] }
    ],
    settled: false,
    due: 'end' as const,
    date: new Date('August 4, 2026')
  },
  {
    id: 'exp8',
    tripId: '1',
    paidBy: {
      id: '1',
      firstName: 'Jane',
      lastName: 'Fonda',
      color: 'purple',
      type: 'Captain' as const,
      email: 'jane.fonda@sagaftra.com'
    },
    name: 'Wine crate from Madonna Vineyards',
    total: 225,
    split: 'Even' as const,
    owe: [
      { owes: 75, paid: true, ...users['1'] },
      { owes: 75, paid: true, ...users['2'] },
      { owes: 75, paid: false, ...users['3'] }
    ],
    settled: false,
    due: 'end' as const,
    date: new Date('August 4, 2026')
  },
  {
    id: 'exp9',
    tripId: '1',
    paidBy: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered',
      type: 'Crew' as const,
      email: 'meryll.streep@sagaftra.com'
    },
    name: 'Uber to Sonoma',
    total: 85.25,
    split: 'Custom' as const,
    owe: [
      { owes: 25, paid: false, ...users['1'] },
      { owes: 35.25, paid: true, ...users['2'] },
      { owes: 25, paid: false, ...users['3'] }
    ],
    settled: false,
    due: 'end' as const,
    date: new Date('August 8, 2026')
  },
  {
    id: 'exp10',
    tripId: '1',
    paidBy: {
      id: '3',
      firstName: 'Jamie Lee',
      lastName: 'Curtis',
      color: 'turquoise',
      type: 'Crew' as const,
      email: 'jamie.lee.curtis@sagaftra.com'
    },
    name: 'Late night pizza',
    total: 45,
    split: 'Even' as const,
    owe: [
      { owes: 15, paid: false, ...users['1'] },
      { owes: 15, paid: false, ...users['2'] },
      { owes: 15, paid: true, ...users['3'] }
    ],
    settled: false,
    due: 'end' as const,
    date: new Date('August 10, 2026'),
    notes: '1 lg pepperoni & jalapeno, 1 lg gyro'
  },
  {
    id: 'exp11',
    tripId: '1',
    paidBy: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered',
      type: 'Crew' as const,
      email: 'meryll.streep@sagaftra.com'
    },
    name: 'Uber to airport',
    total: 166,
    split: 'Even' as const,
    owe: [
      { owes: 55, paid: false, ...users['1'] },
      { owes: 55, paid: true, ...users['2'] },
      { owes: 56, paid: false, ...users['3'] }
    ],
    settled: false,
    due: 'end' as const,
    date: new Date('August 12, 2026')
  }
] as Expense[]
