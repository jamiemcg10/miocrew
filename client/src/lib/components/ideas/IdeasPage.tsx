import Ideas from '@/lib/components/ideas/Ideas'
import { useState } from 'react'
import AddIdeaDialog from './AddIdeaDialog'

export default function IdeasPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  return (
    <>
      <Ideas setOpenAddDialog={setAddDialogOpen} />
      <AddIdeaDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
