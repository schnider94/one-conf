import axios from "axios"


export const all = function() {
    return axios
        .get('/conference/all')
        .then(data => {
            console.log(data);
        });
}


export const search = function({ page, search }) {
    return axios
        .get('/conference/search', {
            page,
            search,
            limit: 20,
        })
        .then(data => {
            console.log(data);

            return data.data
        });
}
