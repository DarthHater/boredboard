import { threadConstants } from '../constants/action-types';
import initialState from './initialState';

export default function threadsReducer(state = initialState.thread, action) {
    switch(action.type) {
        case threadConstants.LOAD_THREAD_SUCCESS:
            return action.thread
        case threadConstants.EXIT_THREAD_VIEW:
            return {};
        default:
            return state;
    }
}
