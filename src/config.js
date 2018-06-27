import config from 'react-global-configuration';

const hostname = window && window.location && window.location.hostname;

let backendHost;

if (hostname == 'vivalavinyl-webapp.herokuapp.com') {
    backendHost = 'https://vivalavinyl-service.herokuapp.com';
} else {
    backendHost = 'http://localhost:8000';
}

config.set({ API_ROOT: backendHost});
