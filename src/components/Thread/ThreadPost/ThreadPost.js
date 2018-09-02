import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import EditableLabel from 'react-inline-editing';
import { connect } from 'react-redux';
import { threadActions } from '../../../actions/index';
import config from 'react-global-configuration';
import * as auth from '../../../auth/authentication';
import { canEditPost } from '../../../helpers/PostHelper';

class ThreadPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            baseUrl: config.get('WS_ROOT'),
            postId: ''
        }

        this._handleFocusOut = this._handleFocusOut.bind(this);
        this.handleFocus = this.handleFocus.bind(this);

        this.props.dispatch(threadActions.loadPosts(this.props.threadId));
    }

    handleSocket(data) {
        let result = JSON.parse(data);
        if (result.ThreadId == this.props.threadId) {
            this.props.dispatch(threadActions.recievePost(data));
        }
    }

    handleFocus(postId, e) {
        this.state.postId = postId;
    }

    _handleFocusOut(text) {
        this.props.dispatch(threadActions.editPost(text, this.state.postId));
    }

    handleKeyPress = ({ key }) => {
        if (key === 'Enter') {

        }
    }

    render() {
        return (
            <div className="posts">
                <ul className="postsListUl">
                    {this.props.posts.map(post => {
                        return (
                            <li key={post.Id} className="post">
                                <p>
                                    by: <Link to={`/user/${post.UserId}`}>
                                        {post.UserName}
                                    </Link>
                                    &nbsp;on <Timestamp time={post.PostedAt} format="full" />
                                </p>
                                <p>
                                    {auth.checkUser(post.UserId) && canEditPost(post) ? (
                                        <EditableLabel text={post.Body}
                                            labelClassName='editPostLabel'
                                            inputClassName='editPostInput'
                                            inputWidth='200px'
                                            inputHeight='25px'
                                            inputFontWeight='bold'
                                            onFocus={(evt) => this.handleFocus(post.Id, evt)}
                                            onFocusOut={this._handleFocusOut}
                                            onKeyPress={this.handleKeyPress}
                                        />
                                    ) : (
                                            post.Body
                                        )}
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
        posts: state.posts
    };
}

export default connect(mapStateToProps)(ThreadPost);
