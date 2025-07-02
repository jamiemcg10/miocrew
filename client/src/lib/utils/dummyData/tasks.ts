export const tasks = [
  {
    id: 'task1',
    name: 'Group dinner date',
    question: 'Which day should we do group dinner?',
    type: 'poll' as const,
    dueDate: new Date(),
    options: ['8/7', '8/8', '8/9'],
    assignee: 'Everyone' as const,
    creator: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered',
      type: 'Attendee'
    },
    completed: false
  },
  {
    id: 'task2',
    name: 'Make brunch reservation',
    description: '',
    type: 'general' as const,
    dueDate: new Date(),
    assignee: { id: '1', firstName: 'Jane', lastName: 'Fonda', color: 'purple', type: 'Owner' },
    creator: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered',
      type: 'Attendee'
    },
    completed: false
  },
  {
    id: 'task3',
    name: 'Send out B-list invites',
    description: '',
    type: 'general' as const,
    dueDate: new Date(),
    assignee: {
      id: '3',
      firstName: 'Jamie Lee',
      lastName: 'Curtis',
      color: 'turquoise',
      type: 'Attendee'
    },
    creator: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered',
      type: 'Attendee'
    },
    completed: true
  }
]
