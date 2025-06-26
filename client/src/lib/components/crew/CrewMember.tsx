import { type CrewMember } from '@/lib/types'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { SetStateAction, Dispatch } from 'react'

interface CrewMemberProps {
  member: CrewMember
  setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>
}

export default function CrewMember({ member, setAnchorEl }: CrewMemberProps) {
  return (
    <div className="flex justify-between">
      <div className="basis-1/3 flex items-center space-x-4">
        <div
          className="h-10 w-10 rounded-full border-4 border-black dark:border-white font-bold text-center content-center"
          style={{ backgroundColor: member.color }}>
          {member.firstName.charAt(0)}
          {member.lastName.charAt(0)}
        </div>
        <div className="">
          {member.firstName} {member.lastName}
        </div>
      </div>
      <div className="basis-1/4 flex items-center">{member.type}</div>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreHorizIcon />
      </IconButton>
    </div>
  )
}
