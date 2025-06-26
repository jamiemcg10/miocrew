import './Crew.css'

import { trips } from '@/lib/utils/dummyData'
import { useState } from 'react'
import CrewMenu from './CrewMenu'
import CrewMember from './CrewMember'
import { attendeeSort } from '@/lib/utils/sortFns'

export default function Crew() {
  function handleCloseMenu() {
    setAnchorEl(null)
  }

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <div className="px-24 py-12 flex flex-col overflow-y-hidden font-bold space-y-4 grow">
      <div className="flex justify-between mb-8">
        <div className="basis-1/3 border-b-2 border-b-white">Member</div>
        <div className="basis-1/4 border-b-2 border-b-white">Status</div>
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
