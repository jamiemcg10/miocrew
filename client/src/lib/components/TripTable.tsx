import Link from 'next/link'
import { Trip } from '../types'
import { dateFormatter } from '../utils/dateFormatter'
import { AvatarGroup } from '@heroui/avatar'
import CrewAvatar from './CrewAvatar'
import TableRow from './layout/TableRow'

interface TripTableProps {
  trips: Trip[]
  title: string
}

export default function TripTable({ trips, title }: TripTableProps) {
  return (
    <div>
      <div className="text-xl font-bold my-4">{title}</div>
      {trips
        .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
        .map((trip) => {
          return (
            <Link href={`trip/${trip.id}`} key={trip.id}>
              <TableRow>
                <div className="flex grow justify-between mr-4 flex-col sm:flex-row">
                  <span className="px-2 inline-flex text-lg font-semibold">{trip.name}</span>
                  <span className="text-right px-2 inline-flex font-semibold">
                    {dateFormatter(trip.startDate)}{' '}
                    {trip.endDate && ' - ' + dateFormatter(trip.endDate)}
                  </span>
                </div>
                <span className="px-2 basis-1/4 sm:basis-1/5 inline-flex items-center shrink-0">
                  <AvatarGroup isBordered max={6} classNames={{ base: 'w-full' }}>
                    {Object.values(trip.attendees)
                      .slice(0, 5)
                      .map((user) => {
                        return <CrewAvatar user={user} size="sm" key={user.id} />
                      })}
                    {Object.values(trip.attendees).length > 5 ? (
                      <CrewAvatar name={`+${Object.values(trip.attendees).length - 5}`} size="sm" />
                    ) : null}
                  </AvatarGroup>
                </span>
              </TableRow>
            </Link>
          )
        })}
    </div>
  )
}
