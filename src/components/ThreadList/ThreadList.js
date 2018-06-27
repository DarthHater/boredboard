import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Timestamp from 'react-timestamp';
import ThreadService from '../../services/ThreadService';
import config from 'react-global-configuration';

class ThreadList extends Component {

    constructor() {
        super();
        this.state = { threads: [] };
    }

    componentDidMount() {
        let baseUrl = config.get('API_ROOT');
        fetch(`${baseUrl}/threads`)
            .then(result => result.json())
            .then(threads => this.setState({threads}));
    }

    render() {
        return (
            <div className='container'>
                <ul>
                    {this.state.threads.map(thread => {
                        return (
                            <li key={thread.Id}>
                                <h3>
                                    <Link to={`/thread/${thread.Id}`}>
                                        {thread.Title}
                                    </Link>
                                </h3>

                                <p>
                                    <Link to={`/user/${thread.UserId}`}>
                                        
                                    </Link>
                                    on <Timestamp time={thread.PostedAt} format="full" />
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default ThreadList;
