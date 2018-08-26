import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import { connect } from 'react-redux';
import { messageActions } from '../../../actions/index';
import config from 'react-global-configuration';
import * as auth from '../../../auth/authentication';
import lightBlue from '@material-ui/core/colors/lightBlue';
import grey from '@material-ui/core/colors/grey';

var style = {
    messages: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        flexGrow: 1,
        padding: '20px',
        message: {
            display: 'flex',
            marginBottom: '20px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            fromMe: {
                username: {
                    display: 'none'
                },
                body: {
                    backgroundColor: lightBlue[300],
                    color: 'white',
                    maxWidth: '80%',
                    display: 'inline-block',
                    padding: '20px',
                    border: '1px',
                    borderRadius: '5px',
                    paddingRight: '50px'
                },
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '5px'
            },
            username: {
                fontWeight: 'bold',
                fontSize: '0.9rem',
                color: '#999',
                marginBottom: '5px'
            },
            body: {
                maxWidth: '80%',
                display: 'inline-block',
                padding: '20px',
                backgroundColor: grey[200],
                border: '1px',
                borderRadius: '5px',
                paddingRight: '50px'
            }
        }
    }
}

class MessagePost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            baseUrl: config.get('WS_ROOT'),
            userId: auth.getUserId()
        }
        this.props.dispatch(messageActions.loadMessagePosts(this.props.messageId));
    }

    handleSocket(data) {
        let result = JSON.parse(data);
        if (result.MessageId == this.props.messageId) {
            this.props.dispatch(messageActions.recieveMessagePost(data));
        }
    }

    messageFromMe(userId) {
        if (userId == this.state.userId) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div style={style.messages}>
                {this.props.message_posts.map(post => {
                        let fromMe = this.messageFromMe(post.UserId);
                        return (
                            <div style={(fromMe ? style.messages.message.fromMe : style.messages.message)}>
                                    <div style={
                                        (
                                            fromMe ? style.messages.message.fromMe.username : style.messages.message.username
                                        )}>
                                        {/* <Link to={`/user/${post.UserId}`}> */}
                                        {post.UserName}
                                        {/* </Link> */}
                                    </div>
                                    <div style={
                                        (
                                            fromMe ? style.messages.message.fromMe.body : style.messages.message.body
                                        )}>
                                        {post.Body}
                                    </div>
                            </div>
                        )
                    })}

                <WebSocket url={this.state.baseUrl}
                    onMessage={this.handleSocket.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message_posts: state.message_posts
    };
}

export default connect(mapStateToProps)(MessagePost);
