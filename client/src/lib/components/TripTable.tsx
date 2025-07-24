import Link from 'next/link'
import { Trip } from '../types'
import { dateFormatter } from '../utils/dateFormatter'
import Avatar from '@mui/material/Avatar'
import { AvatarGroup } from '@heroui/avatar'
import CrewAvatar from './CrewAvatar'

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
              <div className="h-16 sm:h-14 mb-4 transition-colors bg-black/15 hover:bg-black/20 active:bg-black/10  dark:bg-white/20 dark:hover:bg-white/25 dark:active:bg-white/15 rounded-lg items-center flex justify-between">
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
                        return <CrewAvatar user={user} size="sm" />
                      })}
                    {Object.values(trip.attendees).length > 5 ? (
                      <CrewAvatar name={`+${Object.values(trip.attendees).length - 5}`} size="sm" />
                    ) : null}
                  </AvatarGroup>
                </span>
              </div>
            </Link>
          )
        })}
    </div>
  )
}
