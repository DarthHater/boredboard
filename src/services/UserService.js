import config from 'react-global-configuration';
import axios from 'axios';

class UserService {

    requestHeaders() {
        return { 'AUTHORIZATION': `Bearer ${sessionStorage.jwt}` }
    }

    getUserInfo(threadId) {
        let baseUrl = config.get('API_ROOT');
        const headers = this.requestHeaders();

        return axios.get(`${baseUrl}/user/${threadId}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }
}

export default new UserService();
