import axios from 'axios'

export const me = () => {
    return axios
        .get('/user/me')
        .then(({ data }) => {
            console.log(data)

            return Promise.resolve(data.data)
        })
}
