import ThreadService from '../services/ThreadService';
import { threadConstants } from '../constants/action-types';

export const threadActions = {
    addPost,
    addThread,
    deleteThread,
    loadPosts,
    loadThread,
    loadThreads,
    recievePost
};

function loadThreads(since) {
    return function (dispatch) {
        return ThreadService.getAllThreads(since)
            .then(threads => {
                dispatch(loadThreadsSuccess(threads));
            }).catch(error => {
                throw (error);
            });
    };
}

function loadThread(threadId) {
    return function (dispatch) {
        return ThreadService.getThread(threadId)
            .then(thread => {
                dispatch(loadThreadSuccess(thread));
            }).catch(error => {
                throw (error);
            });
    };
}

function loadPosts(threadId) {
    return function (dispatch) {
        return ThreadService.getPosts(threadId)
            .then(posts => {
                dispatch(loadPostsSuccess(posts));
            }).catch(error => {
                throw (error);
            });
    };
}

function addPost(threadId, userId, post) {
    return function (dispatch) {
        return ThreadService.postPost(threadId, userId, post)
            .then(response => {
                dispatch(addPostSuccess(stubPost(response, threadId, userId, post)));
            }).catch(error => {
                throw (error);
            });
    }
}

function addThread(thread) {
    return function (dispatch) {
        return ThreadService.postThread(thread)
            .then(response => {
                dispatch(addThreadSuccess(stubThread(response, thread)));
            }).catch(error => {
                throw (error);
            });
    }
}

function recievePost(post) {
    return function (dispatch) {
        dispatch(recievePostSuccess(post));
    }
}

function deleteThread(threadId) {
    return function (dispatch) {
        return ThreadService.deleteThread(threadId)
            .then(response => {
                dispatch(deleteThreadSuccess(threadId));
            }).catch(error => {
                throw (error);
            });
    }
}

function stubPost(response, threadId, userId, post) {
    return {
        Id: response.id,
        ThreadId: threadId,
        UserId: userId,
        Body: post,
        PostedAt: new Date(Date.now()),
        UserName: response.username
    };
}

function stubThread(response, thread) {
    return {
        Id: response.id,
        UserId: thread.Thread.UserId,
        Title: thread.Thread.Title,
        PostedAt: new Date(Date.now()),
        UserName: response.username
    };
}

function loadThreadsSuccess(threads) {
    return { type: threadConstants.LOAD_THREADS_SUCCESS, threads };
}

function loadThreadSuccess(thread) {
    return { type: threadConstants.LOAD_THREAD_SUCCESS, thread };
}

function loadPostsSuccess(posts) {
    return { type: threadConstants.LOAD_POSTS_SUCCESS, posts };
}

function addPostSuccess(post) {
    return { type: threadConstants.ADD_POST, post };
}

function deleteThreadSuccess(threadId) {
    return { type: threadConstants.DELETE_THREAD, threadId };
}

function addThreadSuccess(thread) {
    return { type: threadConstants.ADD_THREAD, thread };
}

function recievePostSuccess(post) {
    return { type: threadConstants.RECIEVE_POST, post };
}
