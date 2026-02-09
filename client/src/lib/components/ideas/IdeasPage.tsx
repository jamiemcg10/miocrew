import Ideas from '@/lib/components/ideas/Ideas'
import { useState } from 'react'
import IdeaDialog from './IdeaDialog'
import { Idea } from '@/lib/types'

export default function IdeasPage() {
  const [addDialogOpen, setAddDialogOpen] = useState<boolean | Idea>(false)

  return (
    <>
      <Ideas setOpenAddDialog={setAddDialogOpen} />
      <IdeaDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
