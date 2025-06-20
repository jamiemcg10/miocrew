import TripTable from '@/lib/components/TripTable'
import { Trip } from '@/lib/types'

// dummy data
const trips = [
  {
    id: 'p1',
    name: 'Wine Moms Took on Napa',
    attendees: [
      { id: '1', name: 'Jane Fonda', color: 'purple' }, // color should really be their avatar
      { id: '2', name: 'Meryll Streep', color: 'orangered' },
      { id: '3', name: 'Jamie Lynn Curtis', color: 'turquoise' }
    ],
    startDate: new Date('October 5, 2023'),
    endDate: new Date('October 12, 2023')
  },
  {
    id: 'p2',
    name: "Last Year's Streep Family Vacation",
    attendees: [
      { id: '2', name: 'Meryll Streep', color: 'orangered' },
      { id: '4', name: 'Dustin Streep', color: 'teal' },
      { id: '5', name: 'Luca Streep', color: 'pink' },
      { id: '6', name: 'Astro Streep', color: 'navy' }
    ],
    startDate: new Date('December 24, 2024'),
    endDate: new Date('January 2, 2025')
  },
  {
    id: 'p3',
    name: 'Monster Jam 2019',
    attendees: [
      { id: '2', name: 'Meryll Streep', color: 'orangered' },
      { id: '4', name: 'Dustin Streep', color: 'teal' },
      { id: '5', name: 'Luca Streep', color: 'pink' },
      { id: '6', name: 'Astro Streep', color: 'navy' },
      { id: '7', name: 'Johnny Walker', color: 'green' },
      { id: '8', name: 'Jim Beam', color: 'red' },
      { id: '9', name: 'Jack Daniels', color: 'black' }
    ],
    startDate: new Date('October 12, 2019')
  }
] as Trip[]

export default function PastTripsPage() {
  return (
    <div className="p-6">
      <div className="text-xl font-bold mb-4">Past trips</div>
      <TripTable trips={trips} />
    </div>
  )
}
