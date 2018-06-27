import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import ThreadReply from './ThreadReply/ThreadReply';
import ThreadService from '../../services/ThreadService';
import config from 'react-global-configuration';

class ThreadPost extends Component {

    constructor(props) {
        super(props);
        this.state = { thread: {}, posts: [] };
    }

    componentDidMount() {
        let baseUrl = config.get('API_ROOT');
        let threadId = this.props.match.params.id;
        fetch(`${baseUrl}/thread/${threadId}`)
            .then(result => result.json())
            .then(thread => this.setState({thread}));
        fetch(`${baseUrl}/posts/${threadId}`)
            .then(result => result.json())
            .then(posts => this.setState({posts}));    
    }

    handleSocket(data) {
        let result = JSON.parse(data);
        if (result.ThreadId == this.props.match.params.id) {
            this.setState({posts: this.state.posts.concat([result])});
        }
    }

    render() {
        return (
            <div className='container'>
                <header>
                    <h1>
                        {this.state.thread.Title }
                    </h1>
                </header>
                <div>
                {this.state.posts.map(post => {
                        return (
                            <li key={post.Id} className="post">
                                <p>
                                    <Link to={`/user/${post.UserId}`}>
                                        
                                    </Link>
                                    on <Timestamp time={post.PostedAt} format="full" />
                                </p>
                                <p>
                                    {post.Body}
                                </p>
                            </li>
                        )
                    })}
                </div>
                <ThreadReply 
                    userId={this.state.thread.UserId} 
                    threadId={this.state.thread.Id}
                >
                </ThreadReply>

                <WebSocket url='ws://localhost:8000/ws' 
                    onMessage={this.handleSocket.bind(this)} />
            </div>
        );
    }
}

export default ThreadPost;
