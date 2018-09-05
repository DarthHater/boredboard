import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import ThreadReply from './ThreadReply/ThreadReply';
import ThreadPost from './ThreadPost/ThreadPost';
import { connect } from 'react-redux';
import config from 'react-global-configuration';
import { threadActions } from '../../actions/index';
import * as auth from '../../auth/authentication';

class Thread extends Component {

    constructor(props) {
        super(props);

        let { id } = props.match.params;
        this.state = {
            threadId: id,
            userId: auth.getUserId()
        }

        this.props.dispatch(threadActions.loadThread(id));
    }

    componentWillUnmount() {
        this.props.dispatch(threadActions.exitThreadView());
        this.props.dispatch(threadActions.exitPostsView());
    }

    render() {
        return (
            <div
                style= {{
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    marginTop: 64,
                    overflowY: 'auto',
                }}
            >
                <header>
                    <h3 className="backToIt">
                        <Link to={`/`}>Back to it</Link>
                    </h3>
                    <h1>
                        {this.props.thread.Title }
                    </h1>
                    by: <Link to={`/user/${this.props.thread.UserId}`}>{this.props.thread.UserName }</Link> on <Timestamp time={this.props.thread.PostedAt} format="full" />
                </header>
                <ThreadPost
                    threadId={ this.state.threadId }
                    >
                </ThreadPost>
                <ThreadReply 
                    userId={this.state.userId} 
                    threadId={this.props.thread.Id}
                    value=''
                    >
                </ThreadReply>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        thread: state.thread,
        posts: state.posts
    };
}

export default connect(mapStateToProps)(Thread);
