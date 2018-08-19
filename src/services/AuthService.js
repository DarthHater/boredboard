import * as auth from '../auth/authentication';
import config from 'react-global-configuration';
import axios from 'axios';

export const authService = {
    login,
    logout,
    getUserInfo,
    register
};

function requestHeaders() {
    return { 'AUTHORIZATION': `Bearer ${sessionStorage.jwt}` }
}

function login(data) {
    let baseUrl = config.get('API_ROOT');

    return axios.post(`${baseUrl}/login`, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        })
        .then(function(response) {
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    location.reload(true);
                } else {
                    if (response.data.token) {
                        sessionStorage.setItem('jwt', response.data.token);
                    }
                }
            }
        })
        .catch(error => {
            return error;
        });
}

function register(data) {
    let baseUrl = config.get('API_ROOT');

    return axios.post(`${baseUrl}/register`, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        })
        .then(function(response) {
            if (!response.ok) {
                return response.data;
            }
            return response.data;
        })
        .catch(error => {
            return error;
        });
}

function logout() {
    auth.logOut();
}
