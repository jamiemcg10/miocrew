import Ideas from '@/lib/components/ideas/Ideas'
import { useState } from 'react'
import AddIdeaDialog from './AddIdeaDialog'
import { Idea } from '@/lib/types'

export default function IdeasPage() {
  const [addDialogOpen, setAddDialogOpen] = useState<boolean | Idea>(false)

  return (
    <>
      <Ideas setOpenAddDialog={setAddDialogOpen} />
      <AddIdeaDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
