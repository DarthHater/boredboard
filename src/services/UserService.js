import config from 'react-global-configuration';
import axios from 'axios';
import { getRequestHeaders } from '../auth/authentication';

class UserService {

    getUserInfo(userId) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.get(`${baseUrl}/user/${userId}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    getUsers(searchTerm) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.get(`${baseUrl}/users?search=${searchTerm}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }
}

export default new UserService();
