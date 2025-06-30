import '../../styles/VerticalScroll.css'

import { trips } from '@/lib/utils/dummyData'
import { useState } from 'react'
import CrewMenu from './CrewMenu'
import CrewMember from './CrewMember'
import { attendeeSort } from '@/lib/utils/sortFns'
import Button from '@mui/material/Button'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'

export default function Crew() {
  function handleCloseMenu() {
    setAnchorEl(null)
  }

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <div className="py-10 px-8 sm:px-24 sm:py-12 flex flex-col overflow-y-hidden font-bold space-y-4 grow">
      <Button
        variant="contained"
        startIcon={<PersonAddRoundedIcon />}
        sx={{
          margin: '12px 0',
          alignSelf: 'end',
          width: 'initial',
          fontWeight: 600,
          top: '-6px'
        }}>
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
            {trips[2].attendees.sort(attendeeSort).map((a) => {
              return <CrewMember key={a.id} member={a} setAnchorEl={setAnchorEl} />
            })}
          </div>
        </div>
        <div className="absolute h-2 w-full top-0 bg-linear-to-b from-(--background) to-transparent"></div>
        <div className="absolute h-2 w-full bottom-0 bg-linear-to-t from-(--background) to-transparent"></div>
      </div>

      <CrewMenu anchorEl={anchorEl} onClose={handleCloseMenu} />
    </div>
  )
}
