import { Avatar } from '@heroui/avatar'
import { getInitials } from '../utils/getInitials'
import { User, UserColor } from '../types'

interface CrewAvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg'
  extraClasses?: string
}

const ringMap: Record<UserColor, string> = {
  orangered: 'ring-[orangered]',
  teal: 'ring-[teal]',
  pink: 'ring-[pink]',
  navy: 'ring-[navy]',
  green: 'ring-[green]',
  red: 'ring-[red]',
  black: 'ring-[black]',
  purple: 'ring-[purple]',
  turquoise: 'ring-[turquoise]'
}

export default function CrewAvatar({ user, size, extraClasses }: CrewAvatarProps) {
  return (
    <Avatar
      name={getInitials(user)}
      isBordered
      classNames={{
        base: `${ringMap[user?.color]} ${extraClasses}`,
        name: 'font-bold' + (size === 'sm' ? ' text-sm' : ' text-lg')
      }}
      size={size}
    />
  )
}
