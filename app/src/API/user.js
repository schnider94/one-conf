import axios from 'axios'

export const me = () => {
    return axios
        .get('/user/me')
        .then(({ data }) => {
            console.log(data)

            return Promise.resolve(data.data)
        });
}


export const byIds = ids => {
    return axios
        .post('/user/byIds', { ids })
        .then(({ data }) => {
            console.log(data)

            return Promise.resolve(data.data)
        });
}


export const search = search => {
    return axios
        .get('/user/search', {
            params: {
                page: 0,
                limit: 20,
                search,
            }
        })
        .then(({ data }) => {
            console.log(data)

            return Promise.resolve(data.data)
        });
}
