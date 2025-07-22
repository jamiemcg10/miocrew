import { Expense } from '@/lib/types'

export const expenses = [
  {
    id: 'exp1',
    tripId: '1',
    paidBy: '1',
    name: 'AirBnB',
    total: 3129.85,
    split: 'even' as const,
    owe: {
      '1': { owes: 1043.28, paid: true },
      '2': { owes: 1043.28, paid: false },
      '3': { owes: 1043.29, paid: false }
    },
    settled: false,
    due: 'immediate' as const,
    date: new Date('January 23, 2026')
  },
  {
    id: 'exp2',
    tripId: '1',
    paidBy: '2',
    name: 'Early brunch',
    total: 198.95,
    split: 'custom' as const,
    owe: {
      '1': { owes: 101, paid: false },
      '2': { owes: 97.95, paid: true }
    },
    settled: false,
    due: 'end' as const,
    date: new Date('August 3, 2026'),
    notes: 'They comped my muffin because it took so long.'
  },
  {
    id: 'exp3',
    tripId: '1',
    paidBy: '2',
    name: 'Bike tour',
    total: 66,
    split: 'even' as const,
    owe: {
      '1': { owes: 22, paid: false },
      '2': { owes: 22, paid: true },
      '3': { owes: 22, paid: false }
    },
    settled: false,
    due: 'end' as const,
    date: new Date('August 4, 2026')
  },
  {
    id: 'exp4',
    tripId: '3',
    paidBy: '7',
    name: 'Hotel',
    total: 3129.85,
    split: 'custom' as const,
    owe: {
      '4': { owes: 1251.94, paid: false },
      '7': { owes: 625.97, paid: true },
      '8': { owes: 625.97, paid: false },
      '9': { owes: 625.97, paid: false }
    },
    settled: false,
    due: 'immediate' as const,
    date: new Date('October 5, 2025')
  },
  {
    id: 'exp5',
    tripId: '3',
    paidBy: '4',
    name: 'Tickets',
    total: 225,
    split: 'custom' as const,
    owe: {
      '4': { owes: 120, paid: true },
      '7': { owes: 35, paid: false },
      '8': { owes: 35, paid: false },
      '9': { owes: 35, paid: false }
    },
    settled: false,
    due: 'end' as const,
    date: new Date('October 5, 2025'),
    notes: 'They comped my muffin because it took so long.'
  },
  {
    id: 'exp6',
    tripId: '1',
    paidBy: '2',
    name: 'JetBlue flights',
    total: 2032,
    split: 'even' as const,
    owe: {
      '1': { owes: 677.33, paid: true },
      '2': { owes: 677.33, paid: true },
      '3': { owes: 677.34, paid: true }
    },
    settled: true,
    due: 'immediate' as const,
    date: new Date('June 4, 2026')
  },
  {
    id: 'exp7',
    tripId: '1',
    paidBy: '1',
    name: 'Airport coffee',
    total: 10,
    split: 'even' as const,
    owe: {
      '1': { owes: 5, paid: true },
      '3': { owes: 5, paid: false }
    },
    settled: false,
    due: 'end' as const,
    date: new Date('August 4, 2026')
  },
  {
    id: 'exp8',
    tripId: '1',
    paidBy: '1',
    name: 'Wine crate from Madonna Vineyards',
    total: 225,
    split: 'even' as const,
    owe: {
      '1': { owes: 75, paid: true },
      '2': { owes: 75, paid: true },
      '3': { owes: 75, paid: false }
    },
    settled: false,
    due: 'end' as const,
    date: new Date('August 4, 2026')
  },
  {
    id: 'exp9',
    tripId: '1',
    paidBy: '2',
    name: 'Uber to Sonoma',
    total: 85.25,
    split: 'custom' as const,
    owe: {
      '1': { owes: 25, paid: false },
      '2': { owes: 35.25, paid: true },
      '3': { owes: 25, paid: false }
    },
    settled: false,
    due: 'end' as const,
    date: new Date('August 8, 2026')
  },
  {
    id: 'exp10',
    tripId: '1',
    paidBy: '3',
    name: 'Late night pizza',
    total: 45,
    split: 'even' as const,
    owe: {
      '1': { owes: 15, paid: false },
      '2': { owes: 15, paid: false },
      '3': { owes: 15, paid: true }
    },
    settled: false,
    due: 'end' as const,
    date: new Date('August 10, 2026'),
    notes: '1 lg pepperoni & jalapeno, 1 lg gyro'
  },
  {
    id: 'exp11',
    tripId: '1',
    paidBy: '2',
    name: 'Uber to airport',
    total: 166,
    split: 'even' as const,
    owe: {
      '1': { owes: 55, paid: false },
      '2': { owes: 55, paid: true },
      '3': { owes: 56, paid: false }
    },
    settled: false,
    due: 'end' as const,
    date: new Date('August 12, 2026')
  }
] as Expense[]
