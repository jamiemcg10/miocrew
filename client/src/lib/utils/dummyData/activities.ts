import { Activity } from '@/lib/types/activity'

export const activities = [
  {
    id: 'wm1',
    tripId: '1',
    name: 'Check into AirBnB and relax',
    description:
      'Arrive, hang out at AirBnB until dinner. Early arrivers can start scoping out what we need',
    location: '132 Sonoma Crest Road Ext',
    startTime: 'August 5, 2026 2:00 PM',
    color: 'orangered'
  },
  {
    id: 'wm2',
    tripId: '1',
    name: 'Dinner at Gran Turismo',
    location: '132 Sonoma Crest Road',
    startTime: 'August 5, 2026 6:30 PM',
    endTime: 'August 5, 2026 8:30 PM',
    color: 'teal'
  },
  {
    id: 'wm3',
    tripId: '1',
    name: 'Napa Wine Tour',
    description: 'Bus tour with stops at 5 different vineyards',
    location: '11824 Main St',
    startTime: 'August 6, 2026 2:00 PM',
    endTime: 'August 6, 2026 6:00 PM',
    color: 'violet'
  },
  {
    id: 'wm4',
    tripId: '1',
    name: 'Lunch at Josh Vineyards',
    location: '414 Boston Ave.',
    startTime: 'August 7, 2026 12:00 PM',
    endTime: 'August 7, 2026 1:30 PM',
    color: 'goldenrod'
  },
  {
    id: 'wm5',
    tripId: '1',
    name: 'Club Xtrove',
    location: '4155 Elm St.',
    startTime: 'August 7, 2026 10:00 PM',
    endTime: 'August 8, 2026 3:00 AM',
    color: 'navy'
  },
  {
    id: 'wm6',
    tripId: '1',
    name: 'Check out of AirBnB',
    location: '132 Sonoma Crest Road Ext',
    startTime: 'August 12, 2026 11:00 AM',
    color: 'limegreen'
  },
  {
    id: 'wm7',
    tripId: '1',
    name: 'Winery hopping down Main Street',
    location: '416 Boston Ave.',
    description: 'Go see the best of what Napa has to offer. Eat dinner somewhere in here.',
    startTime: 'August 7, 2026 2:00 PM',
    endTime: 'August 7, 2026 7:30 PM',
    color: 'lime'
  }
] as Activity[]
