import axios from 'axios'

export const login = (email, password) => {
    return axios
        .post('/auth/login', {
            email,
            password,
        })
}
