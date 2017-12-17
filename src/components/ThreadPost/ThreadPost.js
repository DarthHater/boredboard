import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import WebSocket from 'react-websocket';
import ThreadReply from './ThreadReply/ThreadReply';

class ThreadPost extends Component {

    constructor(props) {
        super(props);
        this.state = { thread: {}, posts: [] };
        this.getPost = this.getPost.bind(this)
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

    handleSocket(data) {
        let result = JSON.parse(data);
        this.setState({posts: this.state.posts.concat([result.Post])});
    }

    getPost(postId) {
        // There has got to be a better way of doing this
        // Ideally we want all posts to show up as they are posted
        // Sockets? I dunno
        fetch(`http://localhost:8000/post/${postId}`)
            .then(result => result.json())
            .then(post => this.setState({
                posts: this.state.posts.concat([post])
            }));  
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

                <WebSocket url='ws://localhost:8000/ws'
                    onMessage={this.handleSocket.bind(this)} />
            </div>
        );
    }
}

export default ThreadPost;
