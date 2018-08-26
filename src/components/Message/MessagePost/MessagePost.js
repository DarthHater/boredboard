import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import { connect } from 'react-redux';
import { messageActions } from '../../../actions/index';
import config from 'react-global-configuration';

var ulStyle = {
    listStyleType: 'none',
    paddingLeft: 5
}

class MessagePost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            baseUrl: config.get('WS_ROOT')
        }
        this.props.dispatch(messageActions.loadMessagePosts(this.props.messageId));
    }

    handleSocket(data) {
        let result = JSON.parse(data);
        if (result.MessageId == this.props.messageId) {
            this.props.dispatch(messageActions.recieveMessagePost(data));
        }
    }

    render() {
        return (
            <div className="posts">
                <ul className="postsListUl" style={ulStyle}>
                {this.props.message_posts.map(post => {
                        return (
                            <li key={post.Id} className="post">
                                <p>
                                    by: <Link to={`/user/${post.UserId}`}>
                                        {post.UserName}
                                    </Link>
                                    &nbsp;on <Timestamp time={post.PostedAt} format="full" />
                                </p>
                                <p>
                                    {post.Body}
                                </p>
                            </li>
                        )
                    })}
                </ul>

                <WebSocket url={this.state.baseUrl}
                    onMessage={this.handleSocket.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        message_posts: state.message_posts
    };
}

export default connect(mapStateToProps)(MessagePost);
