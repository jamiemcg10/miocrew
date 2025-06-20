'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'

export default function Home() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/hello')
      .then((response) => setMessage(response.data.message))
      .catch(console.error)
  }, [])
  return (
    <div className="p-4 text-center flex flex-col py-24 not-sm:py-36 space-y-8 items-center">
      <div className="flex items-center justify-center h-32 w-32 border border-white">[Goose]</div>
      <div>
        <span className="text-9xl font-bold text-blue-400">Mio</span>
        <span
          className="text-gray-400 text-4xl font-bold
      ">
          Crew
        </span>
      </div>
      <div>Get your plans out of the group chat</div>
      <div className="w-full sm:w-1/2">
        <Button variant="contained" href="/dashboard" sx={{ width: '100%' }}>
          Get started!
        </Button>
      </div>
    </div>
  )
}
