import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(rootReducer),
    composeWithDevTools(
        applyMiddleware(thunk, routerMiddleware(history))
    )
)

export default store;
