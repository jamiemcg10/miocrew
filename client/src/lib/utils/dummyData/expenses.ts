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
      '1': 1043.28,
      '2': 1043.28,
      '3': 1043.29
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
      '1': 101,
      '2': 97.95
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
      '1': 22,
      '2': 22,
      '3': 22
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
      '4': 1251.94,
      '7': 625.97,
      '8': 625.97,
      '9': 625.97
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
      '4': 120,
      '7': 35,
      '8': 35,
      '9': 35
    },
    settled: false,
    due: 'end' as const,
    date: new Date('October 5, 2025'),
    notes: 'They comped my muffin because it took so long.'
  }
] as Expense[]
