import { User } from '@/lib/types'

export const users = {
  '1': {
    id: '1',
    firstName: 'Jane',
    lastName: 'Fonda',
    color: 'purple',
    email: 'jane.fonda@sagaftra.com'
  },
  '2': {
    id: '2',
    firstName: 'Meryll',
    lastName: 'Streep',
    color: 'orangered',
    email: 'meryll.streep@sagaftra.com'
  },
  '3': {
    id: '3',
    firstName: 'Jamie Lee',
    lastName: 'Curtis',
    color: 'turquoise',
    email: 'jamie.lee.curtis@sagaftra.com'
  },
  '4': {
    id: '4',
    firstName: 'Dustin',
    lastName: 'Streep',
    color: 'teal',
    email: 'dustin.streep@yahoo.com'
  },
  '5': {
    id: '5',
    firstName: 'Luca',
    lastName: 'Streep',
    color: 'pink',
    email: 'luca.streep@yahoo.com'
  },
  '6': {
    id: '6',
    firstName: 'Astro',
    lastName: 'Streep',
    color: 'navy',
    email: 'astro.streep@yahoo.com'
  },
  '7': {
    id: '7',
    firstName: 'Johnny',
    lastName: 'Walker',
    color: 'green',
    email: 'johnny.walker@distillersunion.com'
  },
  '8': {
    id: '8',
    firstName: 'Jim',
    lastName: 'Beam',
    color: 'red',
    email: 'jim.beam@distillersunion.com'
  },
  '9': {
    id: '9',
    firstName: 'Jack',
    lastName: 'Daniels',
    color: 'black',
    email: 'jack.daniels@distillersunion.com'
  }
} as Record<string, User>
