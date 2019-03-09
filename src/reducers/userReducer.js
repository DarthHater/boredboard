import { userConstants } from '../constants/user-types';

let user = JSON.parse(localStorage.getItem('jwt'));
const initialState = user ? { loggedIn: true, user } : {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            if (!action.response) {
                return {
                    error: 'error logging in'
                };
            }

            return {
                error: action.response.data && action.response.data.err
            }
        case userConstants.LOGOUT:
            return {};
        case userConstants.REGISTER_SUCCESS:
            return {};
        default:
            return state;
    }
}
