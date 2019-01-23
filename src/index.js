import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './store/index';
import './App.scss';
import YoutubeTag from './components/Common/BbCode/YouTubeTag';
import App from './App';
import parser from 'bbcode-to-react';
import config from './config'

window.store = store;

parser.registerTag('youtube', YoutubeTag);

render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('app')
);
