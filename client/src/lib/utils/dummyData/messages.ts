export const messages = [
  {
    id: 'm1',
    sender: '1',
    subject: 'Welcome to the trip!',
    body: 'Hey all! Thanks for accepting the invite! Look for more soon regarding lodging and itinerary',
    read: true,
    recipients: ['2', '3']
  },
  {
    id: 'm2',
    sender: '8',
    subject: 'Can you respond to the poll?',
    body: 'Trying to get the date for the tour locked in ASAP',
    read: false,
    recipients: ['6', '7', '9']
  },
  {
    id: 'm3',
    sender: '7',
    subject: 'Should we invite Jose Cuervo?',
    body: "He's fun to hang out with and I think he'd be a good addition to the group!",
    read: true,
    recipients: ['8', '9', '2']
  },
  {
    id: 'm4',
    sender: '3',
    subject: 'Napa Hotel Price',
    body: 'The hotel we originally looked at was fully booked. The next cheapest one I can find is an extra $100 per person per night. Is that too much?',
    read: false,
    recipients: ['1', '2']
  },
  {
    id: 'm5',
    sender: '6',
    subject: 'Late arrival',
    body: "Hey all! Just wanted to mention that I won't get in until Tuesday.",
    read: true,
    recipients: ['2', '4', '5']
  }
]
