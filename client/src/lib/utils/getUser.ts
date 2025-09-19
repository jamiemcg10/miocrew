import axios from 'axios'

// TODO: rename this file
export async function getUsers(responseFn: Function) {
  axios
    .get(`http://localhost:8000/users/`, { withCredentials: true })
    .then((response) => {
      if (response.data.users) {
        const users = response.data.users

        responseFn(users)
      }
    })
    .catch((e) => console.error('Error fetching users', e))
}
