import { threadConstants } from '../constants/action-types';
import initialState from './initialState';

export default function threadsReducer(state = initialState.threads, action) {
    switch (action.type) {
        case threadConstants.LOAD_THREADS_SUCCESS:
            return action.threads
        case threadConstants.DELETE_THREAD:
            return state.filter(thread => thread.Id !== action.threadId);
        case threadConstants.ADD_THREAD:
            let newAddThread = insertItem(state, action.thread);
            return newAddThread;
        default:
            return state;
    }
}

function insertItem(array, action) {
    let newArray = array.slice();
    let index = -1;

    for (var i = 0; i < newArray.length; i++) {
        if (newArray[i].Id === action.Id) {
            index = i;
        }
    }

    if (index > -1) {
        // noop
    } else {
        newArray.push(action)
    }
    return newArray;
}
