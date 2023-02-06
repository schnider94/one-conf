import axios from "axios"


export const getById = function(id) {
    return axios
        .get(`/keynote/${id}`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const byConferenceId = function(id) {
    return axios
        .get(`/keynote/conference/${id}`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const all = function() {
    return axios
        .get('/keynote/all')
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const search = function({ page, search }) {
    return axios
        .get('/keynote/search', {
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
        .post('/keynote', props)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const update = function(props) {
    return axios
        .post(`/keynote/${props.id}`, props)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const remove = function(id) {
    return axios
        .delete(`/keynote/${id}`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const attend = function(id) {
    return axios
        .put(`/keynote/${id}/attendance`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const unattend = function(id) {
    return axios
        .delete(`/keynote/${id}/attendance`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}
