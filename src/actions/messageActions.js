import MessageService from '../services/MessageService';
import { messageConstants } from '../constants/message-types';

export const nessageActions = {
    addMessagePost,
    addMessage,
    loadMessagePosts,
    loadMessage,
    loadMessages,
    recieveMessagePost
};

function loadMessages() {
    return function (dispatch) {
        // TODO: Fill in userId
        return MessageService.getAllMessages()
            .then(messages => {
                dispatch(loadMessagesSuccess(messages));
            }).catch(error => {
                throw (error);
            });
    };
}

function loadMessage(messageId) {
    return function (dispatch) {
        return MessageService.getMessage(messageId)
            .then(message => {
                dispatch(loadMessageSuccess(message));
            }).catch(error => {
                throw (error);
            });
    };
}

function loadMessagePosts(messageId) {
    return function (dispatch) {
        return MessageService.getMessagePosts(messageId)
            .then(posts => {
                dispatch(loadMessagePostsSuccess(posts));
            }).catch(error => {
                throw (error);
            });
    };
}

function addMessagePost(messageId, userId, post) {
    return function (dispatch) {
        return MessageService.postMessagePost(messageId, userId, post)
            .then(response => {
                dispatch(addMessagePostSuccess(stubMessagePost(response, messageId, userId, post)));
            }).catch(error => {
                throw (error);
            });
    }
}

function addMessage(message) {
    return function (dispatch) {
        return MessageService.postMessage(message)
            .then(response => {
                dispatch(addMessageSuccess(stubMessage(response, message)));
            }).catch(error => {
                throw (error);
            });
    }
}

function recieveMessagePost(post) {
    return function (dispatch) {
        dispatch(recieveMessagePostSuccess(post));
    }
}

function stubMessagePost(response, messageId, userId, post) {
    return {
        Id: response.id,
        MessageId: messageId,
        UserId: userId,
        Body: post,
        PostedAt: new Date(Date.now()),
        UserName: response.username
    };
}

function stubMessage(response, message) {
    return {
        Id: response.id,
        UserId: message.Thread.UserId,
        Title: message.Thread.Title,
        PostedAt: new Date(Date.now()),
        UserName: response.username
    };
}

function loadMessagesSuccess(messages) {
    return { type: messageConstants.LOAD_MESSAGES_SUCCESS, messages };
}

function loadMessageSuccess(message) {
    return { type: messageConstants.LOAD_MESSAGE_SUCCESS, message };
}

function loadMessagePostsSuccess(posts) {
    return { type: messageConstants.LOAD_MESSAGE_POSTS_SUCCESS, posts };
}

function addMessagePostSuccess(post) {
    return { type: messageConstants.ADD_MESSAGE_POST, post };
}

function addMessageSuccess(message) {
    return { type: messageConstants.ADD_MESSAGE, message };
}

function recieveMessagePostSuccess(post) {
    return { type: messageConstants.RECIEVE_MESSAGE_POST, post };
}
