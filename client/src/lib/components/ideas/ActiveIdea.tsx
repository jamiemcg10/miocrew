import { Dispatch, SetStateAction } from 'react'
import { Idea } from '@/lib/types'
import Popup from '../Popup'
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import IconButton from '@mui/material/IconButton'

interface ActiveIdeaProps {
  activeIdea: Idea | null
  setActiveIdea: Dispatch<SetStateAction<Idea | null>>
}

const linkIconSx = { rotate: '135deg' }
const emojiIconSx = { fontSize: 216 }

export default function ActiveIdea({ activeIdea, setActiveIdea }: ActiveIdeaProps) {
  function onClose() {
    setActiveIdea(null)
  }

  if (!activeIdea) return

  // TODO: fix http:// handling for url

  return (
    <Popup backgroundColor={activeIdea.color} open={!!activeIdea} onClose={onClose}>
      <div className="flex items-center space-x-1">
        <div className="font-bold text-2xl">{activeIdea.name}</div>
        {activeIdea.url ? (
          <IconButton sx={linkIconSx} href={activeIdea.url} target="_blank">
            <LinkRoundedIcon />
          </IconButton>
        ) : null}
      </div>
      <div className="italic text-sm">
        Suggested by {activeIdea.creator.firstName} {activeIdea.creator.lastName}
      </div>
      <div
        className={
          'mt-2 justify-self-center w-full sm:w-4/5 basis-3/5 min-h-3/5 h-3/5 max-h-3/5 mb-2 flex justify-center items-center rounded-sm' +
          (!activeIdea.img ? ' bg-gray-500' : '')
        }>
        {activeIdea.img ? (
          <img className="h-full rouded-sm" src={activeIdea.img} alt={activeIdea.name} />
        ) : (
          <EmojiObjectsRoundedIcon sx={emojiIconSx} />
        )}
      </div>

      {activeIdea.cost ? (
        <div className="font-bold">
          ${activeIdea.cost} {activeIdea.costType}
        </div>
      ) : null}
      <div className="mt-8">{activeIdea.description}</div>
    </Popup>
  )
}
