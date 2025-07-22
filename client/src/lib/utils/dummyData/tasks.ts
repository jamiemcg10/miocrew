export const tasks = [
  {
    id: 'task1',
    name: 'Group dinner date',
    question: 'Which day should we do group dinner?',
    type: 'poll' as const,
    dueDate: new Date(),
    options: ['8/7', '8/8', '8/9'],
    multiple: false,
    assignee: 'Everyone' as const,
    creator: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered' as const,
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
    assignee: {
      id: '1',
      firstName: 'Jane',
      lastName: 'Fonda',
      color: 'purple' as const,
      type: 'Owner'
    },
    creator: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered' as const,
      type: 'Attendee'
    },
    completed: false
  },
  {
    id: 'task3',
    name: 'Send out B-list invites',
    description: 'Invite some more people',
    type: 'general' as const,
    dueDate: new Date(),
    assignee: {
      id: '3',
      firstName: 'Jamie Lee',
      lastName: 'Curtis',
      color: 'turquoise' as const,
      type: 'Attendee'
    },
    creator: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered' as const,
      type: 'Attendee'
    },
    notes: 'Invited the people we talked about in Signal',
    completed: true
  },
  {
    id: 'task4',
    name: 'Accomodation poll',
    question: 'Where should we stay?',
    type: 'poll' as const,
    dueDate: new Date(),
    options: [
      'In Napa in a hotel',
      'In Napa in an AirBnB',
      'In Sonoma in a hotel',
      'In Sonoma in an AirBnB',
      "In Sacramento at Katie's house (free)"
    ],
    multiple: false,
    assignee: 'Everyone' as const,
    creator: {
      id: '2',
      firstName: 'Meryll',
      lastName: 'Streep',
      color: 'orangered' as const,
      type: 'Attendee'
    },
    completed: true
  }
]
