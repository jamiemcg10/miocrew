import '../../styles/VerticalScroll.css'

import { Dispatch, SetStateAction, useContext, useState } from 'react'
import CrewMenu from './CrewMenu'
import CrewMember from './CrewMember'
import { attendeeSort } from '@/lib/utils/sortFns'
import Button from '@mui/material/Button'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import { TripContext } from '@/lib/utils/TripContext'

interface CrewProps {
  setOpenAddDialog: Dispatch<SetStateAction<boolean>>
}

export default function Crew({ setOpenAddDialog }: CrewProps) {
  const trip = useContext(TripContext)

  function handleCloseMenu() {
    setAnchorEl(null)
  }

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PersonAddRoundedIcon />}
        sx={{
          mb: '12px',
          alignSelf: 'end',
          width: 'initial',
          fontWeight: 600
        }}
        onClick={() => setOpenAddDialog(true)}>
        Add crew
      </Button>
      <div className="flex justify-between mb-8">
        <div className="basis-7/12 sm:basis-1/3 border-b-2 border-b-black dark:border-b-white">
          Member
        </div>
        <div className="basis-1/5 sm:basis-1/4 border-b-2 border-b-black dark:border-b-white">
          Status
        </div>
        <div className="w-10">&nbsp;</div>
      </div>
      <div className="relative flex flex-col overflow-y-hidden grow">
        <div className="relative overflow-y-scroll py-2">
          <div className="space-y-4">
            {trip &&
              Object.values(trip.attendees)
                .sort(attendeeSort)
                .map((a) => {
                  return <CrewMember key={a.id} member={a} setAnchorEl={setAnchorEl} />
                })}
          </div>
        </div>
        <div className="absolute h-2 w-full top-0 bg-linear-to-b from-(--background) to-transparent"></div>
        <div className="absolute h-2 w-full bottom-0 bg-linear-to-t from-(--background) to-transparent"></div>
      </div>

      <CrewMenu anchorEl={anchorEl} onClose={handleCloseMenu} />
    </>
  )
}
