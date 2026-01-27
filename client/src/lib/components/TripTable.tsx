'use client'

import Link from 'next/link'
import { Trip } from '../types'
import { dateFormatter } from '../utils/dateFormatter'
import { AvatarGroup } from '@heroui/avatar'
import CrewAvatar from './CrewAvatar'
import TableRow from './layout/TableRow'
import DashboardSectionHeader from '@/app/(boundary)/(app)/dashboard/DashboardSectionHeader'
import { tripSort } from '../utils/sortFns'
import TripTableLoading from './loading/TripTableLoading'

interface TripTableProps {
  trips?: Trip[]
  title: string
}

const avatarGroupClasses = { base: 'w-full gap-x-2 justify-end' }

export default function TripTable({ trips, title }: TripTableProps) {
  return (
    <div>
      <DashboardSectionHeader title={title} />

      {!trips ? (
        <TripTableLoading />
      ) : trips.length ? (
        trips.sort(tripSort).map((trip) => {
          return (
            <Link href={`/trip/${trip.id}`} key={trip.id}>
              <TableRow>
                <div className="flex grow justify-between mr-4 flex-col sm:flex-row">
                  <span className="mr-2 inline-flex">{trip.name}</span>
                  <span className="text-right pr-2 inline-flex">
                    {dateFormatter(trip.startDate)}{' '}
                    {trip.endDate && ' - ' + dateFormatter(trip.endDate)}
                  </span>
                </div>
                <span className="ml-2 basis-1/4 sm:basis-1/5 inline-flex items-center shrink-0">
                  <AvatarGroup isBordered max={6} classNames={avatarGroupClasses}>
                    {Object.values(trip.attendees)
                      .slice(0, 5)
                      .map((user) => {
                        return <CrewAvatar user={user} size="xs" key={user.id} />
                      })}
                    {Object.values(trip.attendees).length > 5 ? (
                      <CrewAvatar name={`+${Object.values(trip.attendees).length - 5}`} size="xs" />
                    ) : null}
                  </AvatarGroup>
                </span>
              </TableRow>
            </Link>
          )
        })
      ) : (
        <div>No trips</div>
      )}
    </div>
  )
}
