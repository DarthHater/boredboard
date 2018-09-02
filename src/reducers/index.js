import { combineReducers } from 'redux';
import threads from './threadsReducer';
import thread from './threadReducer';
import posts from './postsReducer';
import user from './userReducer';
import threadsNull from './threadNullReducer';

const rootReducer = combineReducers({
    threads,
    threadsNull,
    thread,
    posts,
    user
})

export default rootReducer;