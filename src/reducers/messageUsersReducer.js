import { userConstants } from '../constants/user-types';
import initialState from './initialState';

export default function messageUsersReducer(state = initialState.message_users, action) {
    switch (action.type) {
        case userConstants.UPDATE_MESSAGE_USERS:
            return [...action.users];
        default:
            return state;
    }
}