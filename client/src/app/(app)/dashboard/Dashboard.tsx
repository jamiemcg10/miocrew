'use client'

import { Button } from '@mui/material'

// dummy data
const trips = [
  {
    id: '1',
    name: 'Wine Moms Take on Napa',
    attendees: [
      { id: '1', name: 'Jane Fonda', color: 'purple' }, // color should really be their avatar
      { id: '2', name: 'Meryll Streep', color: 'orangered' },
      { id: '3', name: 'Jamie Lynn Curtis', color: 'turquoise' }
    ],
    startDate: new Date('August 5, 2026'),
    endDate: new Date('August 12, 2026') // optional
  },
  {
    id: '2',
    name: 'Streep Family Vacation',
    attendees: [
      { id: '2', name: 'Meryll Streep', color: 'orangered' },
      { id: '4', name: 'Dustin Streep', color: 'teal' },
      { id: '5', name: 'Luca Streep', color: 'pink' },
      { id: '6', name: 'Astro Streep', color: 'navy' }
    ],
    startDate: new Date('December 24, 2026'),
    endDate: new Date('January 2, 2027') // optional
  },
  {
    id: '3',
    name: 'Monster Jam',
    attendees: [
      { id: '2', name: 'Meryll Streep', color: 'orangered' },
      { id: '4', name: 'Dustin Streep', color: 'teal' },
      { id: '5', name: 'Luca Streep', color: 'pink' },
      { id: '6', name: 'Astro Streep', color: 'navy' },
      { id: '7', name: 'Johnny Walker', color: 'green' },
      { id: '8', name: 'Jim Beam', color: 'red' },
      { id: '9', name: 'Jack Daniels', color: 'black' }
    ],
    startDate: new Date('October 4, 2025')
  }
] // need trip type

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium'
})

export default function Dashboard() {
  return (
    <div className="flex flex-col px-4">
      <Button
        href="/create"
        color="secondary"
        variant="contained"
        sx={{ margin: '16px 0 16px 0', alignSelf: 'end', width: 'initial' }}>
        Create trip
      </Button>
      <div className="text-xl font-bold mb-4">Upcoming trips</div>
      <div>
        {/* <div className="font-bold mb-2">
          <span className="px-2 inline-flex w-2/5">Trip name</span>
          <span className="px-2 inline-flex w-1/4">Date</span>
          <span className="px-2 inline-flex w-1/5">Attendees</span>
        </div> */}
        {trips
          .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
          .map((trip) => {
            return (
              <div
                key={trip.id}
                className="h-16 sm:h-12 mb-4 bg-white/20 rounded-lg items-center flex justify-between">
                <div className="flex grow justify-between mr-4 flex-col sm:flex-row">
                  <span className="px-2 inline-flex text-lg font-semibold">{trip.name}</span>
                  <span className="text-right px-2 inline-flex font-semibold">
                    {dateFormatter.format(trip.startDate)}{' '}
                    {trip.endDate && ' - ' + dateFormatter.format(trip.endDate)}
                  </span>
                </div>
                <span className="px-2 w-1/4 sm:w-1/5 inline-flex items-center shrink-0">
                  {trip.attendees.slice(0, 5).map((attendee, i) => {
                    return (
                      <div
                        className="relative inline-flex border-white border-2 rounded-full w-7 h-7 font-bold justify-center items-center sm:not-last:-mr-3 not-last:-mr-5"
                        style={{ backgroundColor: attendee.color, zIndex: 5 - i }}
                        key={attendee.id}>
                        {attendee.name.charAt(0)}
                      </div>
                    )
                  })}
                  {trip.attendees.length > 5 ? (
                    <>
                      <span className="ml-6 sm:ml-5 text-sm text-nowrap">{`+ ${
                        trip.attendees.length - 5
                      }`}</span>
                      <span className="hidden sm:block ml-1 text-sm">more</span>
                    </>
                  ) : null}
                </span>
              </div>
            )
          })}
      </div>
      <div className="text-xl font-bold mb-4">Action items</div>
      <div>You have no action items right now</div>
    </div>
  )
}
