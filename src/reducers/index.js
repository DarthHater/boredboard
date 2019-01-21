import { combineReducers } from 'redux';
import threads from './threadsReducer';
import thread from './threadReducer';
import posts from './postsReducer';
import user from './userReducer';
import message from './messageReducer';
import messages from './messagesReducer';
import message_posts from './messagePostsReducer';
import message_users from './messageUsersReducer';
import threadsNull from './threadNullReducer';

const rootReducer = combineReducers({
    threads,
    threadsNull,
    thread,
    posts,
    message,
    messages,
    message_posts,
    user,
    message_users
})

export default rootReducer;
