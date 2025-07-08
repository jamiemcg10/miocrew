import { Idea } from '@/lib/types'
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'

interface IdeaCardProps {
  idea: Idea
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <div
      className="max-[528px]:w-full shrink-0 relative inline-flex justify-between space-y-2 flex-col p-2 rounded-md h-52 w-56"
      style={{ backgroundColor: idea.color }}>
      <div className="basis-3/5 min-h-3/5 max-h-3/5 bg-gray-500 flex justify-center items-center rounded-sm">
        {idea.img ? (
          <img className="h-full" src={idea.img} alt={idea.name} />
        ) : (
          <EmojiObjectsRoundedIcon sx={{ fontSize: 68 }} />
        )}
      </div>
      <div className="flex flex-col justify-between grow">
        <div className="line-clamp-2 text-sm" title={idea.name}>
          {idea.name}
        </div>
        <div className="flex justify-between items-center h-6">
          <div>M</div>
          <div className="-mr-2">
            <span className="font-light text-sm -mr-[7px]">{idea.likes ? idea.likes : null}</span>
            <Checkbox
              icon={<FavoriteBorderRoundedIcon fontSize="small" />}
              checkedIcon={<FavoriteRoundedIcon fontSize="small" />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
