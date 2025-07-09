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
      <div className="relative overflow-y-auto px-8 md:px-0">
        <div className="sticky -top-1 z-1 w-full h-3 bg-linear-to-b from-(--background) to-transparent"></div>
        <div className="relative overflow-y-hidden">
          <div className="relative grid grid-cols-[repeat(1,_1fr)] md:grid-cols-[repeat(2,_1fr)] lg:grid-cols-[repeat(3,_1fr)] 2xl:grid-cols-[repeat(4,_1fr)] gap-6 md:gap-4">
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
