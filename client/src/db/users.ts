import axios from 'axios'

export async function getUsers() {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/`, { withCredentials: true })
}

export async function getUser() {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/2`, { withCredentials: true }) // user hardcoded for now
}
