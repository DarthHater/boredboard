import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MessageAdd from './MessageAdd/MessageAdd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import { connect } from 'react-redux';
import * as auth from '../../auth/authentication';
import { messageActions } from '../../actions';
import * as permissions from '../../constants/permissions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';

class MessageList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: auth.getUserId()
        }
    }

    componentDidMount() {
        this.props.dispatch(messageActions.loadMessages(this.state.userId));
    }

    render() {
        let toUserId, toUserName;
        const { state } = this.props.location;

        if (state) {
            toUserId = state.toUserId;
            toUserName = state.toUserName;
        }

        let inner;
        if (!this.props.messages) {
            inner = <div>No Messages</div>;
        } else {
            inner = (this.props.messages.map(message => {
                return (
                    <Card key={message.Id}>
                        <CardContent>
                            <Grid
                                container
                                spacing={16}
                                alignItems={'center'}
                                direction={'row'}
                                justify={'space-between'}
                            >
                                <Grid item>
                                    <Typography variant="headline" component="h3">
                                        <Link to={{ pathname: `/message/${message.Id}` }}>
                                            {message.Title}
                                        </Link>
                                    </Typography>
                                    <Typography component="p">
                                        by: <Link to={`/user/${message.UserId}`}>
                                            {message.UserName}
                                        </Link> on <Timestamp time={message.PostedAt} format="full" />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )
            }))
        }
        return (
            <div className='container'>
                {inner}
                <MessageAdd
                    toUserId={toUserId}
                    toUserName={toUserName}
                    userId={this.state.userId} >
                </MessageAdd>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages,
        message: state.message,
        message_posts: state.message_posts
    };
}

export default connect(mapStateToProps)(withRouter(MessageList));
