import { userConstants } from '../constants/user-types';
import { authService } from '../services/AuthService';
import { push } from 'connected-react-router'

export const userActions = {
    login,
    logout,
    register
};

function login(data) {
    return function (dispatch) {
        return authService
            .login(data)
            .then(user => {
                if (!user || !user.response) {
                    return dispatch(loginFailure());
                }

                if (user.response.status == 200) {
                    return dispatch(loginSuccess(user));
                }

                return dispatch(loginFailure(user.response));
            })
            .catch(error => {
                throw error;
            });
    };
}

function register(data) {
    return function (dispatch) {
        return authService
            .register(data)
            .then(user => {
                dispatch(registerSuccess(user));
                dispatch(push("/"))
            })
            .catch(error => {
                throw error;
            });
    };
}

function logout() {
    return function (dispatch) {
        authService.logout();
        dispatch(logoutSuccess());
    };
}

function logoutSuccess() {
    return { type: userConstants.LOGOUT };
}

function loginSuccess(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
}

function loginFailure(response) {
    return { type: userConstants.LOGIN_FAILURE, response };
}

function registerSuccess(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
}
