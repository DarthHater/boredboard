import { threadConstants } from '../constants/action-types';
import initialState from './initialState';

export default function threadsReducer(state = initialState.noMasThreads, action) {
    switch (action.type) {
        case threadConstants.NO_MORE_THREADS:
            return action.noMasThreads;
        default:
            return state;
    }
}
