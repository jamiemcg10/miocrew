import { Idea } from '@/lib/types'
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState, useRef, Dispatch, SetStateAction, useContext } from 'react'
import ContextMenu from '../layout/ContextMenu'
import axios from 'axios'
import { UserContext } from '@/lib/utils/UserContext'
import { TripContext } from '@/lib/utils/TripContext'

interface IdeaCardProps {
  idea: Idea
  setActiveIdea: Dispatch<SetStateAction<Idea | null>>
  onEditIdea: () => void
}

export default function IdeaCard({ idea, setActiveIdea, onEditIdea }: IdeaCardProps) {
  function onClick() {
    setActiveIdea(idea)
  }

  function onDeleteIdea() {
    axios
      .delete(`http://localhost:8000/user/${user?.id}/trip/${trip?.id}/idea/${idea.id}/delete`, {
        withCredentials: true
      })
      .catch((e) => console.error('Error deleting idea', e))
      .finally(() => setMenuOpen(false))
  }

  const menuRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  return (
    <>
      <div
        className="shrink-0 cursor-pointer relative inline-flex justify-between space-y-2 flex-col p-2 rounded-md h-52 transition-transform hover:scale-105 active:scale-100"
        style={{ backgroundColor: idea.color }}
        onClick={onClick}>
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
          <div className="flex justify-between items-center h-6 -mx-[7px]">
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen(true)
              }}
              ref={menuRef}
              size="small">
              <MoreHorizIcon fontSize="small" />
            </IconButton>
            <div className="">
              <span className="font-light text-sm -mr-[7px]">{idea.likes ? idea.likes : null}</span>
              <Checkbox
                onClick={(e) => e.stopPropagation()}
                icon={<FavoriteBorderRoundedIcon fontSize="small" />}
                checkedIcon={<FavoriteRoundedIcon fontSize="small" />}
              />
            </div>
          </div>
        </div>
      </div>
      <ContextMenu
        anchorEl={menuRef.current}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onDelete={onDeleteIdea}
        onEdit={onEditIdea}
      />
    </>
  )
}
