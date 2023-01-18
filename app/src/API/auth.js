import axios from 'axios'

export const login = (email, password) => {
    return axios
        .post('/auth/login', {
            email,
            password,
        })
        .then(response => {
            console.log(response)

            return Promise.resolve(response.data)
        })
}
