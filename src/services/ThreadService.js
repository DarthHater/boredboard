import config from 'react-global-configuration';
import axios from 'axios';
import { getRequestHeaders } from '../auth/authentication';

class ThreadService {

    getAllThreads(since) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.get(`${baseUrl}/threads/${since}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    getThread(threadId) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.get(`${baseUrl}/thread/${threadId}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    postThread(data) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.post(`${baseUrl}/thread`, JSON.stringify(data), {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    getPosts(threadId) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.get(`${baseUrl}/posts/${threadId}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    postPost(threadId, userId, body) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.post(`${baseUrl}/post`, JSON.stringify({
            ThreadId: threadId,
            UserId: userId,
            Body: body,
        }), {
                headers: headers
            }).then(response => {
                return response.data;
            }).catch(error => {
                return error;
            });
    }

    editPost(text, postId) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.patch(`${baseUrl}/posts/${postId}`, JSON.stringify({
                Body: text
            }), {
                headers: headers
            }).then(response => {
                return response.data;
            }).catch(error => {
                return error;
            });
    }

    deleteThread(threadId) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.delete(`${baseUrl}/thread/${threadId}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }
}

export default new ThreadService();
