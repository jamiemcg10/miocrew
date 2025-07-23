import { type CrewMember } from '@/lib/types'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { SetStateAction, Dispatch } from 'react'
import Avatar from '@mui/material/Avatar'
import { User } from '@heroui/user'
import { ringMap } from '../CrewAvatar'
import { getInitials } from '@/lib/utils/getInitials'

interface CrewMemberProps {
  member: CrewMember
  setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>
}

export default function CrewMember({ member, setAnchorEl }: CrewMemberProps) {
  return (
    <div className="flex justify-start basis-full sm:basis-1/2">
      <div className="ml-4 basis-2/3 flex items-center space-x-2 sm:space-x-4">
        <User
          avatarProps={{
            name: getInitials(member),
            isBordered: true,
            size: 'sm',
            classNames: {
              base: ringMap[member.color],
              name: 'font-bold text-lg'
            }
          }}
          description={member.type}
          name={`${member.firstName} ${member.lastName}`}
        />
      </div>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreHorizIcon />
      </IconButton>
    </div>
  )
}
