import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import { loadThreads } from './actions/threadActions';

import App from './App';

window.store = store;

store.dispatch(loadThreads());

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app')
);
