'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/hello')
      .then((response) => setMessage(response.data.message))
      .catch(console.error)
  }, [])
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">MioCrew</h1>
      <p>Backend says: {message}</p>
    </div>
  )
}
