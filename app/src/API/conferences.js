import axios from "axios"


export const getById = function(id) {
    return axios
        .get(`/conference/${id}`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const mine = function() {
    return axios
        .get('/conference/mine')
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


export const create = function(props) {
    return axios
        .post('/conference', props)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const attend = function(props) {
    return axios
        .put(`/conference/${props.id}/attendance`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const unattend = function(props) {
    return axios
        .delete(`/conference/${props.id}/attendance`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}
