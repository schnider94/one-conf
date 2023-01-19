import axios from "axios"


export const all = function() {
    axios
        .get('/conference/all')
        .then(data => {
            console.log(data);
        });
}
