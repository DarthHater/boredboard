import React from 'react';
import ThreadList from './ThreadList';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

describe("A test", () => {
    let props;
    let mountedThreadList;
    const threadList = () => {
        if (!mountedThreadList) {
            mountedThreadList = mount(
                <ThreadList {...props} />
            );
        }
        return mountedThreadList;
    }

    beforeEach(() => {
        props = {
            store: mockStore({
                threads: []
            })
        };

        mountedThreadList = undefined;
    });

    it("Always renders a div", () => {
        fetch.mockResponse(JSON.stringify({ test: 'test' }));
        const divs = threadList().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });
});
