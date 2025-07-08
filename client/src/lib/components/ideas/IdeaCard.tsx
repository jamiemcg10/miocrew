import { Idea } from '@/lib/types'

interface IdeaCardProps {
  idea: Idea
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <div>
      <div>{idea.name}</div>
    </div>
  )
}
