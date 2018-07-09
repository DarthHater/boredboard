import jwt_decode from 'jwt-decode';

export function isLoggedIn() {
    if (!sessionStorage.getItem('jwt')) {
        return false;
    }
    return true;
}

export function checkUser(userId) {
    if (userId == getUserId()) {
        return true;
    }
    return false;
}

export function getUsername() {
    let decoded = jwt_decode(sessionStorage.getItem('jwt'));

    return decoded.user;
}

export function getUserId() {
    let decoded = jwt_decode(sessionStorage.getItem('jwt'));

    return decoded.id;
}

export function logOut() {
    sessionStorage.removeItem('jwt');
}
