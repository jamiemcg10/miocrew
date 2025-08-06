import Ideas from '@/lib/components/ideas/Ideas'
import { useContext, useEffect, useState } from 'react'
import AddIdeaDialog from './AddIdeaDialog'
import axios from 'axios'
import { UserContext } from '@/lib/utils/UserContext'
import { TripContext } from '@/lib/utils/TripContext'

export default function IdeasPage() {
  function getIdeas() {
    axios
      .get(`http://localhost:8000/user/${user!.id}/trip/${trip!.id}/ideas/`)
      .then((response) => {
        if (response.data.ideas?.length) {
          setIdeas(response.data.ideas)
        }
      })
      .catch(console.error)
  }

  const user = useContext(UserContext)
  const trip = useContext(TripContext)

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [ideas, setIdeas] = useState([])

  useEffect(getIdeas, [])

  return (
    <>
      <Ideas ideas={ideas} setOpenAddDialog={setAddDialogOpen} />
      <AddIdeaDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
    </>
  )
}
