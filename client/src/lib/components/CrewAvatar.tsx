import { Avatar } from '@heroui/avatar'
import { getInitials } from '../utils/getInitials'
import { User, UserColor } from '../types'
import clsx from 'clsx'

interface CrewAvatarProps {
  user?: User
  size?: 'xs' | 'sm' | 'md' | 'lg'
  baseClasses?: string
}

export const ringMap: Record<UserColor, string> = {
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

function getAvatarSize(size: CrewAvatarProps['size']) {
  switch (size) {
    case 'xs':
      return 'w-4 h-4'
    case 'sm':
      return 'w-6 h-6'
    default:
      return ''
  }
}

function getFontSize(size: CrewAvatarProps['size']) {
  switch (size) {
    case 'xs':
      return 'text-xs'
    case 'sm':
      return 'text-sm'
    case 'lg':
      return 'text-2xl'
    default:
      return 'text-lg'
  }
}
export default function CrewAvatar({ user, size, baseClasses }: CrewAvatarProps) {
  return (
    <Avatar
      name={getInitials(user)}
      isBordered
      classNames={{
        base: clsx(user && ringMap[user.color], getAvatarSize(size), baseClasses),
        name: clsx('font-bold', getFontSize(size))
      }}
      size={size === 'xs' ? 'sm' : size}
    />
  )
}
