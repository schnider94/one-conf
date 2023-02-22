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

export const register = ({ email, password, name }) => {
    return axios
        .post('/auth/signup', {
            email,
            password,
            name,
        })
        .then(response => {
            console.log(response)

            return Promise.resolve(response.data)
        })
}
