import { threadConstants } from '../constants/action-types';
import initialState from './initialState';

export default function postsReducer(state = initialState.posts, action) {
    switch(action.type) {
        case threadConstants.LOAD_POSTS_SUCCESS:
            return action.posts
        case threadConstants.ADD_POST:
            let newAddPost = insertItem(state, action.post);
            return newAddPost;
        case threadConstants.EDIT_POST:
            let newEditPost = editItem(state, action.post);
            return newEditPost;
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

function editItem(array, action) {
    let newArray = array.slice();
    var foundIndex = newArray.findIndex(x => x.Id == action.Id);
    newArray[foundIndex].Body = action.Body;

    return newArray;
}

function insertItem(array, action) {
    if (typeof action.Id == "undefined") {
        // Short circuit function in case we don't have the right info to add a post
        return array;
    }

    let newArray = array.slice();
    let index = -1;

    for(var i = 0; i < newArray.length; i++) {
      if(newArray[i].Id === action.Id) {
        index = i;
      }
    }

    if(index > -1) {
        // noop
    } 
    else {
        newArray.push(action)
    }
    return newArray;
}
