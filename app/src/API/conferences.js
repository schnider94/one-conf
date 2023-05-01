import axios from "axios"


export const getById = function(id) {
    return axios
        .get(`/conference/${id}`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const getCurrent = function() {
    return axios
        .get(`/conference/current`)
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


export const update = function(props) {
    return axios
        .post(`/conference/${props.id}`, props)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const remove = function(id) {
    return axios
        .delete(`/conference/${id}`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const attend = function(id) {
    return axios
        .put(`/conference/${id}/attendance`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const unattend = function(id) {
    return axios
        .delete(`/conference/${id}/attendance`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}
