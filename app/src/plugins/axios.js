import axios from "axios"

export default () => {
    axios.defaults.baseURL = 'http://www.schnider.io/api';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}
