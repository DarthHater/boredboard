import { messageConstants } from '../constants/message-types';
import initialState from './initialState';

export default function messagesReducer(state = initialState.messages, action) {
    switch (action.type) {
        case messageConstants.LOAD_MESSAGES_SUCCESS:
            return action ? action.messages : [];
        case messageConstants.ADD_MESSAGE:
            let newAddMessage = insertItem(state, action.message);
            return newAddMessage;
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
