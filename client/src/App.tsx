import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/hello')
      .then((response: any) => setMessage(response.data.message)) // any is okay here because this is just for testing
      .catch((e: any) => console.error(e))
  }, [])

  return (
    <div className="p-4">
      <span className="text-2xl font-bold">Mio</span>
      <span>Crew</span>
      <p>Backend says: {message}</p>
    </div>
  )
}

export default App
