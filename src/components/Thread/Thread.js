import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import { connect } from 'react-redux';

import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';

import ThreadReply from './ThreadReply/ThreadReply';
import ThreadPost from './ThreadPost/ThreadPost';

import { threadActions } from '../../actions/index';
import * as auth from '../../auth/authentication';

const styles = {
    fab: {
      margin: '10px',
      width: 'auto',
      borderRadius: '30px',
      paddingLeft: '0px',
      paddingRight: '16px',
      height: '48px',
      position: 'fixed',
      top: 'auto',
      right: '20px',
      bottom: '20px',
      left: 'auto',
      zIndex: '100'
    },
    extendedIcon: {
      marginRight: '8px',
      marginLeft: '8px'
    },
};

class Thread extends Component {

    constructor(props) {
        super(props);

        let { id } = props.match.params;
        this.state = {
            threadId: id,
            userId: auth.getUserId(),
            postBody: "",
        }

        this.props.dispatch(threadActions.loadThread(id));
    }

    componentWillUnmount() {
        this.props.dispatch(threadActions.exitThreadView());
        this.props.dispatch(threadActions.exitPostsView());
    }

    quotePostSendToThreadReply = (body) => {
        this.setState({postBody: body});
    }

    render() {
        const { classes } = this.props;
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
                    <Fab 
                        color="secondary" 
                        aria-label="Back to it" 
                        className={classes.fab}
                        onClick={() => this.props.history.go(-1)}
                    >
                    <NavigationIcon className={classes.extendedIcon}/>
                        Back to it
                    </Fab>
                    <h1>
                        {this.props.thread.Title }
                    </h1>
                    <h4>Created by <Link to={`/user/${this.props.thread.UserId}`}>{this.props.thread.UserName }</Link> on <Timestamp time={this.props.thread.PostedAt} format="full" /></h4>
                </header>
                <ThreadPost
                    threadId={ this.state.threadId }
                    quotePostCallback={this.quotePostSendToThreadReply}
                    >
                </ThreadPost>
                <ThreadReply 
                    userId={this.state.userId} 
                    threadId={this.props.thread.Id}
                    value={this.state.postBody}
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

export default connect(mapStateToProps)(withStyles(styles)(Thread));
