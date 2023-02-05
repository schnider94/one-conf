import axios from "axios"


export const getById = function(id) {
    return axios
        .get(`/conference/${id}`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const all = function() {
    return axios
        .get('/conference/all')
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const search = function({ page, search }) {
    return axios
        .get('/conference/search', {
            params: {
                page,
                search,
                limit: 20,
            }
        })
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}
