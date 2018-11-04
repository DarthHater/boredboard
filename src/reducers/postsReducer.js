import { threadConstants } from '../constants/action-types';
import initialState from './initialState';

export default function postsReducer(state = initialState.posts, action) {
    switch(action.type) {
        case threadConstants.LOAD_POSTS_SUCCESS:
            return action.posts;
        case threadConstants.LOAD_POSTS_AFTER_SUCCESS:
            return [...state, ...action.posts];
        case threadConstants.LOAD_POSTS_BEFORE_SUCCESS:
            return [...action.posts, ...state];
        case threadConstants.ADD_POST:
            let newAddPost = insertItem(state, action.post);
            return newAddPost;
        case threadConstants.RECIEVE_POST:
            let obj = JSON.parse(action.post);
            let newRecievePost = insertItem(state, obj);
            return newRecievePost;
        case threadConstants.EXIT_POST_VIEW:
            return [];
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
