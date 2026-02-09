import axios from 'axios'

export async function getUsers() {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/`, { withCredentials: true })
}

export async function getUser(id: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/${id}`, {
    withCredentials: true
  })
}
