import axios from "axios"

export default () => {
    axios.defaults.baseURL = 'http://192.168.178.30/api'; // 'http://www.schnider.io/api';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}
