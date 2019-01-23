import { messageConstants } from '../constants/message-types';
import initialState from './initialState';

export default function messageReducer(state = initialState.message, action) {
    switch(action.type) {
        case messageConstants.LOAD_MESSAGE_SUCCESS:
            return action.message;
        default:
            return state;
    }
}