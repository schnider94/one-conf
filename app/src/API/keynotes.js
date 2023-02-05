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


export const attend = function(props) {
    return axios
        .put(`/keynote/${props.id}/attendance`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}


export const unattend = function(props) {
    return axios
        .delete(`/keynote/${props.id}/attendance`)
        .then(({ data }) => {
            console.log(data);

            return data.data;
        });
}
