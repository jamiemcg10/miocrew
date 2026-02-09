import { Dispatch, SetStateAction, useContext, useState } from 'react'
import CrewMenu from './CrewMenu'
import { attendeeSort } from '@/lib/utils/sortFns'
import Button from '@mui/material/Button'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { CrewMember } from '@/lib/types'
import CrewMemberItem from './CrewMemberItem'
import { removeCrew, toggleCrewType } from '@/db'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import VerticalScrollShadow from '../layout/VerticalScrollShadow'

interface CrewProps {
  setOpenAddDialog: Dispatch<SetStateAction<boolean>>
}

const addCrewBtnSx = {
  mb: '12px',
  alignSelf: 'end',
  width: 'initial',
  fontWeight: 600
}

export default function Crew({ setOpenAddDialog }: CrewProps) {
  const { trip, tripIsOver } = useContext(TripContext)
  const { user } = useContext(UserContext)

  function handleCloseMenu() {
    setAnchorEl(null)
    setActiveCrewMember(undefined)
  }

  function onClickAddButton() {
    setOpenAddDialog(true)
  }

  function removeCrewMember() {
    if (!user || !trip || !activeCrewMember) return

    removeCrew({
      userId: user.id,
      tripId: trip.id,
      attendeeId: activeCrewMember.attendeeId
    }).catch((e) => console.error('Error removing crew', e))

    handleCloseMenu()
  }

  function toggleCrew() {
    if (!user || !trip || !activeCrewMember) return

    toggleCrewType({
      userId: user.id,
      tripId: trip.id,
      attendeeId: activeCrewMember.attendeeId,
      newType: activeCrewMember.type === 'Admin' ? 'Crew' : 'Admin'
    }).catch((e) => console.error('Error toggling crew type', e))

    handleCloseMenu()
  }

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [activeCrewMember, setActiveCrewMember] = useState<CrewMember | undefined>(undefined)

  return (
    <>
      {user && trip?.attendees[user.id].type !== 'Crew' ? (
        <Button
          variant="contained"
          startIcon={<PersonAddRoundedIcon />}
          sx={addCrewBtnSx}
          onClick={onClickAddButton}>
          Add crew
        </Button>
      ) : null}

      <VerticalScrollShadow>
        <div className="flex sm:flex-wrap flex-col sm:flex-row space-y-4">
          {trip &&
            user &&
            Object.values(trip.attendees)
              .sort(attendeeSort)
              .map((a) => {
                return (
                  <CrewMemberItem
                    key={a.id}
                    member={a}
                    showActions={trip.attendees[user.id].type !== 'Crew'}
                    setAnchorEl={setAnchorEl}
                    setActiveCrewMember={setActiveCrewMember}
                  />
                )
              })}
        </div>
      </VerticalScrollShadow>
      <CrewMenu
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        onClickRemove={removeCrewMember}
        onChangeStatus={toggleCrew}
        activeCrewMember={activeCrewMember}
      />
    </>
  )
}
