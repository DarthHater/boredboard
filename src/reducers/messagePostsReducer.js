import { messageConstants } from '../constants/message-types';
import initialState from './initialState';

export default function messagePostsReducer(state = initialState.message_posts, action) {
    switch(action.type) {
        case messageConstants.LOAD_MESSAGE_POSTS_SUCCESS:
            return action.message_posts
        case messageConstants.ADD_MESSAGE_POST:
            let newAddMessagePost = insertItem(state, action.message_post);
            return newAddMessagePost;
        case messageConstants.RECIEVE_MESSAGE_POST:
            let obj = JSON.parse(action.message_post);
            let newRecieveMessagePost = insertItem(state, obj);
            return newRecieveMessagePost;
        default:
            return state;
    }
}

function insertItem(array, action) {
    let newArray = array.slice();
    let index = -1;
    
    for(var i = 0; i < newArray.length; i++) {
      if(newArray[i].Id === action.Id) {
        index = i;
      }
    }

    if(index > -1) {
        // noop
    } else {
        newArray.push(action)
    }
    return newArray;
}
