import { type CrewMember } from '@/lib/types'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { SetStateAction, Dispatch } from 'react'
import { User } from '@heroui/user'
import { ringMap } from '../CrewAvatar'
import { getInitials } from '@/lib/utils/getInitials'

interface CrewMemberItemProps {
  member: CrewMember
  setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>
  setActiveCrewMember: Dispatch<SetStateAction<CrewMember | undefined>>
}

const iconBtnSx = { height: 'max-content', alignSelf: 'center' }

export default function CrewMemberItem({
  member,
  setAnchorEl,
  setActiveCrewMember
}: CrewMemberItemProps) {
  return (
    <div className="flex justify-start basis-full grow sm:basis-1/2 h-full gap-x-2 py-0.5">
      <div className="ml-4 basis-2/3 flex items-center space-x-2 sm:space-x-4">
        <User
          avatarProps={{
            name: getInitials(member),
            isBordered: true,
            size: 'sm',
            classNames: {
              base: 'shrink-0 mr-2 ' + ringMap[member.color],
              name: 'font-bold text-lg'
            }
          }}
          description={member.type}
          name={`${member.firstName} ${member.lastName}`}
        />
      </div>
      {member.type !== 'Captain' ? (
        <IconButton
          size="small"
          sx={iconBtnSx}
          onClick={(e) => {
            setAnchorEl(e.currentTarget)
            setActiveCrewMember(member)
          }}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      ) : null}
    </div>
  )
}
