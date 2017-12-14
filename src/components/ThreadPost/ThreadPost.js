import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ThreadReply from '../ThreadReply/ThreadReply';

class ThreadPost extends Component {

    constructor(props) {
        super(props);
        this.state = { thread: {}, posts: [] };
    }

    componentDidMount() {
        let threadId = this.props.match.params.id;
        fetch(`http://localhost:8000/thread/${threadId}`)
            .then(result => result.json())
            .then(thread => this.setState({thread}));
        fetch(`http://localhost:8000/posts/${threadId}`)
            .then(result => result.json())
            .then(posts => this.setState({posts}));    
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
                            <li key={post.Id}>
                                <p>
                                    <Link to={`/user/${post.UserId}`}>
                                        
                                    </Link>
                                    on {post.PostedAt}
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
            </div>
        );
    }
}

export default ThreadPost;
