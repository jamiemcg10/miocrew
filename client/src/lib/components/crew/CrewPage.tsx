import Crew from '@/lib/components/crew/Crew'
import { useState } from 'react'
import CrewDialog from './CrewDialog'

export default function CrewPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  return (
    <>
      <Crew setOpenAddDialog={setAddDialogOpen} />
      <CrewDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
