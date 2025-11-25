import axios from 'axios'

export async function getUsers() {
  return axios.get(`http://localhost:8000/users/`, { withCredentials: true })
}
