import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import config from 'react-global-configuration';

configure({ adapter: new Adapter() });

global.fetch = require('jest-fetch-mock');

// sessionStorage
jest.spyOn(window.sessionStorage.__proto__, 'getItem');
window.sessionStorage.__proto__.getItem = jest.fn(
    () => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJleHAiOjEzOTMyODY4OTMsImlhdCI6MTM5MzI2ODg5M30.4-iaDojEVl0pJQMjrbM1EzUIfAZgsbK_kgnVyVxFSVo'
);

// react-global-configuration
config.set({ API_ROOT: '', WS_ROOT: '', EDIT_POST_TIME: 0 });
global.config = config;
