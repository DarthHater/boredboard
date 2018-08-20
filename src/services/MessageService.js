import config from 'react-global-configuration';
import axios from 'axios';
import { getRequestHeaders } from '../auth/authentication';

class ThreadService {

    getAllMessages(userId) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.get(`${baseUrl}/messages/${userId}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    getMessage(messageId) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.get(`${baseUrl}/message/${messageId}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    postMessage(data) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.post(`${baseUrl}/newmessage`, JSON.stringify(data), {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    getMessagePosts(messageId) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.get(`${baseUrl}/messageposts/${messageId}`, {
            headers: headers
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        });
    }

    postMessagePost(messageId, userId, body) {
        let baseUrl = config.get('API_ROOT');
        const headers = getRequestHeaders();

        return axios.post(`${baseUrl}/message`, JSON.stringify({
            MessageId: messageId,
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
}

export default new ThreadService();
