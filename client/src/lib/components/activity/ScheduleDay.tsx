import Activity from './Activity'
import { type Activity as ActivityType } from '@/lib/types'
import { scheduleSort } from '@/lib/utils/sortFns'
import dayjs from 'dayjs'
import ActiveActivity from './ActiveActivity'
import { useState } from 'react'
import VerticalScrollShadow from '../layout/VerticalScrollShadow'

interface ScheduleDayProps {
  day: { date: dayjs.Dayjs; activities: ActivityType[] }
  index: number
}

const classes = { base: 'grow flex flex-col', slot: 'h-full' }

export default function ScheduleDay({ day, index }: ScheduleDayProps) {
  const [activeActivity, setActiveActivity] = useState<ActivityType | null>(null)

  return (
    <>
      <div className="w-[92%] sm:w-[55%] md:w-[40%] lg:w-[30%] shrink-0 h-full flex flex-col">
        <div className="text-center text-2xl lg:text-3xl">{day.date.format('dddd')}</div>
        <div className="text-center text-xl mb-2 sm:mb-4 relative">
          {day.date.format('MMMM D, YYYY')}
        </div>

        <VerticalScrollShadow classes={classes}>
          <div
            className="relative h-full bg-[#9b9bc7] dark:bg-[#29293A] rounded-sm grow py-0.5 overflow-y-scroll"
            style={{ scrollSnapAlign: 'start', scrollMargin: index ? '64px' : '32px' }}>
            <div className="flex flex-col space-y-3">
              {day.activities.sort(scheduleSort).map((activity) => {
                return (
                  <Activity
                    activity={activity}
                    key={activity.id}
                    setActiveActivity={setActiveActivity}
                  />
                )
              })}
            </div>
          </div>
        </VerticalScrollShadow>
      </div>

      <ActiveActivity activeActivity={activeActivity} setActiveActivity={setActiveActivity} />
    </>
  )
}
