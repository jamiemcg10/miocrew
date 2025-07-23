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

      <div className="relative flex flex-col overflow-y-hidden grow">
        <div className="relative overflow-y-scroll py-2">
          <div className="flex sm:flex-wrap flex-col sm:flex-row space-y-4">
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
