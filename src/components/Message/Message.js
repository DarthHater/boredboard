import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import People from '@material-ui/icons/People'
import MessageReply from './MessageReply/MessageReply';
import MessagePost from './MessagePost/MessagePost';
import { connect } from 'react-redux';
import config from 'react-global-configuration';
import { messageActions } from '../../actions/index';
import * as auth from '../../auth/authentication';

var liStyle = {
    display: 'inline-block',
    marginLeft: 2,
    marginRight: 2
}

var ulStyle = {
    display: 'block'
}

var iconStyle = {
    float: 'left'
}

var style = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    h2: {
        textAlign: 'center',
        padding: '20px 0',
        margin: 0,
        borderBottom: '1px solid #ddd',
        backgroundColor: '#eee'
      }
}

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
        let memberList = this.props.message.Members;
        let output;
        if (memberList) {
            output = memberList.map(
                member => <li style={liStyle}><a href={`/user/${member.UserId}`}>{member.UserName}</a></li>
            );
        }

        return (
            <div style={style.container}>
                <header>
                    <h3 className="backToIt">
                        <Link to={`/messages`}>Back to it</Link>
                    </h3>
                    <h2 style={style.h2}>
                        {this.props.message.Title }
                    </h2>
                    <div className="members">
                        <People style={iconStyle}/> 
                            <ul style={ulStyle}>
                            {output}
                            </ul>
                    </div>
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
