import React from 'react';
import ThreadList from './ThreadList';
import { shallow, mount, configure } from 'enzyme';

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
            threads: undefined
        };

        mountedThreadList = undefined;
    });

    it("Always renders a div", () => {
        fetch.mockResponse(JSON.stringify({test: 'test'}));
        const divs = threadList().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });
});
