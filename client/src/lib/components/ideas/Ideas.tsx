import '../../styles/VerticalScroll.css'

import { Dispatch, SetStateAction, useState } from 'react'
import Button from '@mui/material/Button'
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded'
import { ideas } from '@/lib/utils/dummyData/ideas'
import IdeaCard from './IdeaCard'
import ActiveIdea from './ActiveIdea'
import { Idea } from '@/lib/types'

interface IdeasProps {
  setOpenAddDialog: Dispatch<SetStateAction<boolean>>
}

export default function Ideas({ setOpenAddDialog }: IdeasProps) {
  const [activeIdea, setActiveIdea] = useState<Idea | null>(null)

  return (
    <>
      <Button
        variant="contained"
        startIcon={<EmojiObjectsRoundedIcon />}
        sx={{
          mb: '12px',
          alignSelf: 'end',
          width: 'initial',
          fontWeight: 600
        }}
        onClick={() => setOpenAddDialog(true)}>
        Add idea
      </Button>
      <div className="relative overflow-y-auto max-[528px]:px-4">
        <div className="sticky -top-1 z-1 w-full h-3 bg-linear-to-b from-(--background) to-transparent"></div>
        <div className="relative overflow-y-hidden">
          <div className="relative flex flex-wrap gap-y-4 gap-x-4">
            {ideas.map((idea) => {
              return <IdeaCard idea={idea} key={idea.id} onClick={() => setActiveIdea(idea)} />
            })}
          </div>
        </div>
        <div className="sticky -bottom-1 w-full h-3 bg-linear-to-t from-(--background) to-transparent"></div>
      </div>
      <ActiveIdea activeIdea={activeIdea} setActiveIdea={setActiveIdea}></ActiveIdea>
    </>
  )
}
