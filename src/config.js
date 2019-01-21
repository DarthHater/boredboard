import config from 'react-global-configuration';

const hostname = window && window.location && window.location.hostname;

let backendHost;
let wsHost;

if (hostname == 'vivalavinyl-webapp.herokuapp.com') {
    backendHost = 'https://vivalavinyl-service.herokuapp.com';
    wsHost = 'wss://vivalavinyl-service.herokuapp.com/ws';
} else {
    // backendHost = 'http://localhost:8000';
    backendHost = 'https://vivalavinyl-service.herokuapp.com';
    wsHost = 'ws://localhost:8000/ws';
}

config.set({ API_ROOT: backendHost, WS_ROOT: wsHost });
