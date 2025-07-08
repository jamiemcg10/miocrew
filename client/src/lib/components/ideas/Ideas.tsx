import '../../styles/VerticalScroll.css'

import { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded'
import { ideas } from '@/lib/utils/dummyData/ideas'
import IdeaCard from './IdeaCard'

interface IdeasProps {
  setOpenAddDialog: Dispatch<SetStateAction<boolean>>
}

export default function Ideas({ setOpenAddDialog }: IdeasProps) {
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
      <div>
        {ideas.map((idea) => {
          return <IdeaCard idea={idea} key={idea.id} />
        })}
      </div>
    </>
  )
}
