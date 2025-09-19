import './Schedule.css'
import Button from '@mui/material/Button'
import dayjs from 'dayjs'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Activity } from '@/lib/types'
import ScheduleDay from './ScheduleDay'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import axios from 'axios'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { LocalStorage } from '@/lib/utils/LocalStorage'

interface ScheduleProps {
  setOpenAddDialog: Dispatch<SetStateAction<boolean | Activity>>
}

export default function Schedule({ setOpenAddDialog }: ScheduleProps) {
  async function getActivities() {
    axios
      .get(`http://localhost:8000/user/${user!.id}/trip/${trip!.id}/activities`, {
        withCredentials: true
      })
      .then((response) => {
        if (response.data.activities) {
          setActivities(response.data.activities)
          LocalStorage.set(`${trip?.id}:activities`, response.data.activities)
        }
      })
      .catch((e) => console.error('Error fetching scheduled activities', e))
  }

  function setOpenAddDialogTrue() {
    setOpenAddDialog(true)
  }

  const trip = useContext(TripContext)
  const user = useContext(UserContext)

  const storedActivities = LocalStorage.get<Activity[]>(`${trip?.id}:activities`)
  const [activities, setActivities] = useState<Activity[]>(storedActivities || [])

  const tripStart = dayjs(trip?.startDate)
  const tripEnd = dayjs(trip?.endDate || tripStart)

  // calculate number of days
  const tripLength = tripEnd.diff(tripStart, 'day')

  // for # days, add startDay + n to array {date:Date, activities:?}[]
  const days: Record<string, { date: dayjs.Dayjs; activities: Activity[] }> = {}

  for (let i = 0; i <= tripLength; i++) {
    days[tripStart.add(i, 'day').format('MMMM D, YYYY')] = {
      date: tripStart.add(i, 'day'),
      activities: []
    }
  }

  activities.forEach((activity) => {
    const activityDate = dayjs(activity.startTime).startOf('date').format('MMMM D, YYYY')
    days[activityDate]?.activities.push(activity)
  })

  if (!trip || !user) return

  useEffect(() => {
    getActivities()
  }, [])

  return (
    <>
      <div className="mb-8 sm:my-0 flex flex-col grow overflow-y-hidden">
        <div className="flex w-full justify-end pr-4">
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{ width: 'initial', fontWeight: 600 }}
            onClick={setOpenAddDialogTrue}>
            Add activity
          </Button>
        </div>
        <div className="grow relative mt-4 mb-1 overflow-y-hidden">
          <div className="absolute w-8 z-2 content-center top-0 bottom-4 left-0 bg-linear-to-l from-transparent to-(--background)"></div>
          <div
            className="flex justify-between px-8 space-x-6 overflow-x-scroll h-full pb-2"
            style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}>
            {Object.values(days).map((day, i) => {
              return <ScheduleDay day={day} index={i} key={i} />
            })}
          </div>
          <div className="absolute w-8 z-2 top-0 bottom-4 right-0 text-4xl content-center bg-linear-to-r from-transparent to-(--background)"></div>
        </div>
      </div>
    </>
  )
}
