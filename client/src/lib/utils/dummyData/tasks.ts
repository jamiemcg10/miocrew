export const tasks = [
  {
    id: 'task1',
    tripId: '1',
    name: 'Group dinner date',
    description: 'Which day should we do group dinner?',
    type: 'poll' as const,
    dueDate: new Date(),
    options: ['8/7', '8/8', '8/9'],
    multiple: false,
    assignee: 'Everyone' as const,
    creator: '2',
    completed: false
  },
  {
    id: 'task2',
    tripId: '1',
    name: 'Make brunch reservation',
    description: '',
    type: 'general' as const,
    dueDate: new Date(),
    assignee: '1',
    creator: '2',
    completed: false
  },
  {
    id: 'task3',
    tripId: '3',
    name: 'Send out B-list invites',
    description: 'Invite some more people',
    type: 'general' as const,
    dueDate: new Date(),
    assignee: '3',
    creator: '2',
    notes: 'Invited the people we talked about in Signal',
    completed: true
  },
  {
    id: 'task4',
    tripId: '1',
    name: 'Accomodation poll',
    description: 'Where should we stay?',
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
    creator: '2',
    completed: true
  }
]
