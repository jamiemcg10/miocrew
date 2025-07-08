import { Dispatch, SetStateAction } from 'react'
import { Idea } from '@/lib/types'
import Popup from '../Popup'
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded'

interface ActiveIdeaProps {
  activeIdea: Idea | null
  setActiveIdea: Dispatch<SetStateAction<Idea | null>>
}

export default function ActiveEvent({ activeIdea, setActiveIdea }: ActiveIdeaProps) {
  return (
    <Popup
      backgroundColor={activeIdea?.color}
      open={!!activeIdea}
      onClose={() => setActiveIdea(null)}>
      <div className="font-bold text-2xl mb-2">{activeIdea?.name}</div>
      <div
        className={
          'justify-self-center w-full sm:w-4/5 basis-3/5 min-h-3/5 h-3/5 max-h-3/5 mb-2 flex justify-center items-center rounded-sm' +
          (!activeIdea?.img ? ' bg-gray-500' : '')
        }>
        {activeIdea?.img ? (
          <img className="h-full rouded-sm" src={activeIdea?.img} alt={activeIdea?.name} />
        ) : (
          <EmojiObjectsRoundedIcon sx={{ fontSize: 68 }} />
        )}
      </div>
      <a className="italic font-sm underline" href={activeIdea?.url}>
        {activeIdea?.url}
      </a>

      {activeIdea?.cost ? (
        <div className="font-bold">
          {activeIdea?.cost} {activeIdea?.costType}
        </div>
      ) : null}
      <div className="mt-8">{activeIdea?.description}</div>
    </Popup>
  )
}
