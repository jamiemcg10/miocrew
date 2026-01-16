import { Idea } from '@/lib/types'
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { useState, useEffect, Dispatch, SetStateAction, useContext } from 'react'
import ContextMenu from '../layout/ContextMenu'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { deleteIdea, updateIdeaLike } from '@/db'

interface IdeaCardProps {
  idea: Idea
  setActiveIdea: Dispatch<SetStateAction<Idea | null>>
  onEditIdea: () => void
  favorite: boolean
}

const emojiIconSx = { fontSize: 68 }

export default function IdeaCard({ idea, setActiveIdea, onEditIdea, favorite }: IdeaCardProps) {
  function onClick() {
    setActiveIdea(idea)
  }

  function onDeleteIdea() {
    if (!user || !trip) return

    deleteIdea({ tripId: trip.id, userId: user.id, ideaId: idea.id })
      .catch((e) => console.error('Error deleting idea', e))
      .finally(() => setMenuOpen(false))
  }

  function onFavoriteIdea() {
    if (!user || !trip) return

    updateIdeaLike({ userId: user.id, tripId: trip.id, ideaId: idea.id, like: !like })
      .then(() => {
        setLike(!like) // Might not need this with websockets
      })
      .catch((e) => console.error(`Error liking idea`, e))
  }

  const [menuOpen, setMenuOpen] = useState(false)
  const [like, setLike] = useState(favorite)

  const { user } = useContext(UserContext)
  const trip = useContext(TripContext)

  useEffect(() => {
    setLike(favorite)
  }, [favorite])

  return (
    <>
      <div
        className="shrink-0 font-semibold tracking-wide cursor-pointer relative inline-flex justify-between space-y-2 flex-col p-2 rounded-md h-52 transition-transform hover:scale-105 active:scale-100"
        style={{ backgroundColor: idea.color }}
        onClick={onClick}>
        <div className="basis-3/5 min-h-3/5 max-h-3/5 bg-gray-500 flex justify-center items-center rounded-sm">
          {idea.img ? (
            <img className="h-full" src={idea.img} alt={idea.name} />
          ) : (
            <EmojiObjectsRoundedIcon sx={emojiIconSx} />
          )}
        </div>
        <div className="flex flex-col justify-between grow">
          <div className="line-clamp-2 text-sm" title={idea.name}>
            {idea.name}
          </div>
          <div className="flex justify-between items-center h-6 -mx-[7px]">
            <ContextMenu
              open={menuOpen}
              setMenuOpen={setMenuOpen}
              onClose={() => setMenuOpen(false)}
              onDelete={onDeleteIdea}
              onEdit={onEditIdea}
            />
            <div>
              <span className="font-light text-sm -mr-[7px]">{idea.likes ? idea.likes : null}</span>
              <Checkbox
                checked={like}
                onClick={(e) => {
                  e.stopPropagation()
                  onFavoriteIdea()
                }}
                icon={<FavoriteBorderRoundedIcon fontSize="small" />}
                checkedIcon={<FavoriteRoundedIcon fontSize="small" />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
