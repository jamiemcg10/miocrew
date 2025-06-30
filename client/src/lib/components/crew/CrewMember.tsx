import { type CrewMember } from '@/lib/types'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { SetStateAction, Dispatch } from 'react'
import Avatar from '@mui/material/Avatar'

interface CrewMemberProps {
  member: CrewMember
  setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>
}

export default function CrewMember({ member, setAnchorEl }: CrewMemberProps) {
  return (
    <div className="flex justify-between">
      <div className="basis-7/12 sm:basis-1/3 flex items-center space-x-2 sm:space-x-4">
        <Avatar
          alt={member.firstName}
          sx={{
            color: 'var(--foreground)',
            backgroundColor: member.color,
            border: '4px solid var(--foreground)',
            height: 40,
            width: 40,
            fontSize: '16px'
          }}>
          {member.firstName.charAt(0)}
          {member.lastName.charAt(0)}
        </Avatar>
        <div className="">
          {member.firstName} {member.lastName}
        </div>
      </div>
      <div className="basis-1/5 sm:basis-1/4 flex items-center">{member.type}</div>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreHorizIcon />
      </IconButton>
    </div>
  )
}
