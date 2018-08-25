import { combineReducers } from 'redux';
import threads from './threadsReducer';
import thread from './threadReducer';
import posts from './postsReducer';
import user from './userReducer';
import message from './messageReducer';
import messages from './messagesReducer';
import message_posts from './messagePostsReducer';

const rootReducer = combineReducers({
    threads,
    thread,
    posts,
    message,
    messages,
    message_posts,
    user
})

export default rootReducer;