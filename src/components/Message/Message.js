import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import MessageReply from './MessageReply/MessageReply';
import MessagePost from './MessagePost/MessagePost';
import { connect } from 'react-redux';
import config from 'react-global-configuration';
import { messageActions } from '../../actions/index';
import * as auth from '../../auth/authentication';

class Message extends Component {

    constructor(props) {
        super(props);

        let { id } = props.match.params;
        this.state = {
            messageId: id,
            userId: auth.getUserId()
        }

        this.props.dispatch(messageActions.loadMessage(id));
    }

    render() {
        return (
            <div className='container'>
                <header>
                    <h3 className="backToIt">
                        <Link to={`/`}>Back to it</Link>
                    </h3>
                    <h1>
                        {this.props.message.Title }
                    </h1>
                    by: <Link to={`/user/${this.props.message.UserId}`}>{this.props.message.UserName }</Link> on <Timestamp time={this.props.message.PostedAt} format="full" />
                </header>
                <MessagePost
                    messageId={ this.state.messageId }
                    >
                </MessagePost>
                <MessageReply 
                    userId={this.state.userId} 
                    messageId={this.props.message.Id}
                    value=''
                    >
                </MessageReply>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        message: state.message,
        message_posts: state.message_posts
    };
}

export default connect(mapStateToProps)(Message);
