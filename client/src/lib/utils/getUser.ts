import axios from 'axios'

export async function getUsers(responseFn: Function) {
  axios
    .get(`http://localhost:8000/users/`)
    .then((response) => {
      if (response.data.users) {
        const users = response.data.users

        responseFn(users)
      }
    })
    .catch(console.error)
}
