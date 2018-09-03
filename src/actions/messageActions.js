import MessageService from '../services/MessageService';
import { messageConstants } from '../constants/message-types';

export const messageActions = {
    addMessagePost,
    addMessage,
    loadMessagePosts,
    loadMessage,
    loadMessages,
    recieveMessagePost,
    updateMessageUsers,
    clearMessageUsers
};

function loadMessages(userId) {
    return function (dispatch) {
        return MessageService.getAllMessages(userId)
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
            .then(message_posts => {
                dispatch(loadMessagePostsSuccess(message_posts));
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
                dispatch(clearMessageUsers());
            }).catch(error => {
                throw (error);
            });
    }
}

function updateMessageUsers(users) {
    return dispatch => {
        return dispatch({ type: messageConstants.UPDATE_MESSAGE_USERS, users });
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
        UserId: message.Message.UserId,
        Title: message.Message.Title,
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

function loadMessagePostsSuccess(message_posts) {
    return { type: messageConstants.LOAD_MESSAGE_POSTS_SUCCESS, message_posts };
}

function addMessagePostSuccess(message_post) {
    return { type: messageConstants.ADD_MESSAGE_POST, message_post };
}

function addMessageSuccess(message) {
    return { type: messageConstants.ADD_MESSAGE, message };
}

function clearMessageUsers() {
    return { type: messageConstants.CLEAR_MESSAGE_USERS };
}

function recieveMessagePostSuccess(message_post) {
    return { type: messageConstants.RECIEVE_MESSAGE_POST, message_post };
}
