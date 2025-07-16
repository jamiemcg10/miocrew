import Link from 'next/link'
import { Trip } from '../types'
import { dateFormatter } from '../utils/dateFormatter'
import Avatar from '@mui/material/Avatar'

interface TripTableProps {
  trips: Trip[]
}

export default function TripTable({ trips }: TripTableProps) {
  return (
    <div>
      {trips
        .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
        .map((trip) => {
          return (
            <Link href={`trip/${trip.id}`} key={trip.id}>
              <div className="h-16 sm:h-14 mb-4 bg-[#cccccc] dark:bg-white/20 rounded-lg items-center flex justify-between">
                <div className="flex grow justify-between mr-4 flex-col sm:flex-row">
                  <span className="px-2 inline-flex text-lg font-semibold">{trip.name}</span>
                  <span className="text-right px-2 inline-flex font-semibold">
                    {dateFormatter(trip.startDate)}{' '}
                    {trip.endDate && ' - ' + dateFormatter(trip.endDate)}
                  </span>
                </div>
                <span className="px-2 basis-1/4 sm:basis-1/5 inline-flex items-center shrink-0">
                  {Object.values(trip.attendees)
                    .slice(0, 5)
                    .map((attendee, i) => {
                      return (
                        <Avatar
                          sx={{
                            color: 'var(--foreground)',
                            border: '2px solid var(--foreground) !important',
                            backgroundColor: attendee.color,
                            height: 28,
                            width: 28,
                            mr: '-12px',
                            fontSize: 'small',
                            zIndex: 6 - i
                          }}
                          key={attendee.id}>
                          {attendee.firstName.charAt(0)}
                          {attendee.lastName.charAt(0)}
                        </Avatar>
                      )
                    })}
                  {Object.values(trip.attendees).length > 5 ? (
                    <span className="ml-6 sm:ml-5 text-sm text-nowrap">{`+ ${
                      Object.values(trip.attendees).length - 5
                    }`}</span>
                  ) : null}
                </span>
              </div>
            </Link>
          )
        })}
    </div>
  )
}
