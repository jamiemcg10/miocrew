import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded'
import IdeaCard from './IdeaCard'
import ActiveIdea from './ActiveIdea'
import { Idea } from '@/lib/types'
import { getIdeaLikes } from '@/db'
import { UserContext } from '@/lib/utils/contexts/UserContext'
import { TripContext } from '@/lib/utils/contexts/TripContext'
import { IdeasContext } from '@/app/(boundary)/(app)/trip/[tripid]/TripWrapper'

interface IdeasProps {
  setOpenAddDialog: Dispatch<SetStateAction<Idea | boolean>>
}

const addIdeaBtnSx = {
  mb: '12px',
  alignSelf: 'end',
  width: 'initial',
  fontWeight: 600
}

export default function Ideas({ setOpenAddDialog }: IdeasProps) {
  function onClickAddButton() {
    setOpenAddDialog(true)
  }

  const { user } = useContext(UserContext)
  const trip = useContext(TripContext)
  const ideas = useContext(IdeasContext)

  const [activeIdea, setActiveIdea] = useState<Idea | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (!user || !trip) return

    // TODO: move this to TripWrapper
    getIdeaLikes({ userId: user.id, tripId: trip.id })
      .then((res) => {
        setFavorites(res.data.idea_likes)
      })
      .catch((e) => console.error('Error getting likes', e))
  }, [])

  return (
    <>
      <Button
        variant="contained"
        startIcon={<EmojiObjectsRoundedIcon />}
        sx={addIdeaBtnSx}
        onClick={onClickAddButton}>
        Add idea
      </Button>
      <div className="vertical-scroll relative overflow-y-auto px-8 md:px-0">
        <div className="sticky -top-1 z-1 w-full h-3 bg-linear-to-b from-(--background) to-transparent"></div>
        <div className="relative overflow-y-hidden p-4">
          <div className="relative grid grid-cols-[repeat(1,_1fr)] md:grid-cols-[repeat(2,_1fr)] lg:grid-cols-[repeat(3,_1fr)] 2xl:grid-cols-[repeat(4,_1fr)] gap-6 md:gap-4">
            {ideas.map((idea) => {
              return (
                <IdeaCard
                  idea={idea}
                  key={idea.id}
                  favorite={favorites.includes(idea.id)}
                  setActiveIdea={setActiveIdea}
                  onEditIdea={() => {
                    setOpenAddDialog(idea)
                  }}
                />
              )
            })}
          </div>
        </div>
        <div className="sticky -bottom-1 w-full h-3 bg-linear-to-t from-(--background) to-transparent"></div>
      </div>
      <ActiveIdea activeIdea={activeIdea} setActiveIdea={setActiveIdea}></ActiveIdea>
    </>
  )
}
