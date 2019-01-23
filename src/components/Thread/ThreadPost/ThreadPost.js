import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import { connect } from 'react-redux';
import config from 'react-global-configuration';
import parser from 'bbcode-to-react';
import { Grid, Button, TextField } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { canEditPost } from '../../../helpers/PostHelper';
import { bindActionCreators } from 'redux';
import { threadActions } from '../../../actions/index';
import * as auth from '../../../auth/authentication';
import * as permissions from '../../../constants/permissions';

const styles = {
    button: {
        background: grey[400],
        marginTop: "15px",
        marginBottom: "15px",
        marginRight: "15px"
    },
    full: {
        width: "100%"
    }
};

class ThreadPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            baseUrl: config.get('WS_ROOT'),
            postId: '',
            userCanEditPost: auth.userHasPermission(permissions.canEditPost),
            currentPostEditingId: null
        }
        this.props.actions.loadPosts(this.props.threadId);
    }

    handleSocket(data) {
        let result = JSON.parse(data);
        if (result.ThreadId == this.props.threadId) {
            this.props.actions.recievePost(data);
        }
    }

    handleQuote = id => {
        const body = document.getElementById(`post_body_input_${id}`).value;
        const header = document.getElementById(`post_info_${id}`).innerText;
        const post = `[quote]${header}${body}[/quote]`;
        this.props.quotePostCallback(post);
    }

    handleKeyPress = ev => {
        if (ev.key === 'Enter' && ev.shiftKey) {
            return;
        }

        if (ev.key === 'Enter' && this.state.currentPostEditingId !== null) {
            this.editPost(null);
        }
    }

    editPost = id => {
        if (id === null) {
            const { currentPostEditingId } = this.state;
            let editedBody = document.getElementById(`post_body_edit_input_${currentPostEditingId}`).value;
            this.props.actions.editPost(editedBody, currentPostEditingId);
        }

        this.setState({
            currentPostEditingId: id
        });
    };

    render() {
        return (
            <div className="posts">
                {this.props.posts.map(post => {
                    const { currentPostEditingId } = this.state;

                    const editIsOpen = currentPostEditingId === post.Id;

                    return (
                        <Grid container spacing={0} key={post.Id}>
                            <Grid item xs={12} sm={8} className="post header info" id={`post_info_${post.Id}`}>
                                <h4>
                                    Posted by <Link to={`/user/${post.UserId}`}>
                                        {post.UserName}
                                    </Link>
                                    &nbsp;on <Timestamp time={post.PostedAt} format="full" />
                                </h4>
                            </Grid>
                            <Grid item xs={12} sm={4} className="post header controls" >
                                <Button
                                    style={styles.button}
                                    size="small"
                                    onClick={() => this.handleQuote(post.Id)}
                                >
                                    » Quote
                                </Button>
                                {(this.state.userCanEditPost || (auth.checkUser(post.UserId) && canEditPost(post))) &&
                                    <Button
                                        style={styles.button}
                                        size="small"
                                        onClick={() => {
                                            editIsOpen ? this.editPost(null) : this.editPost(post.Id)
                                        }}
                                    >
                                        » {editIsOpen ? "Done" : "Edit Post"}
                                    </Button>
                                }
                            </Grid>
                            <Grid item xs={12} className="post body">
                                {editIsOpen ? (
                                    <TextField
                                        id={`post_body_edit_input_${post.Id}`}
                                        style={styles.full}
                                        defaultValue={post.Body}
                                        margin="normal"
                                        variant="outlined"
                                        onKeyPress={this.handleKeyPress}
                                        multiline={true}
                                        rows={4}
                                        rowsMax={24}
                                    />
                                ) :
                                    parser.toReact(post.Body)
                                }
                            </Grid>
                            <input type="hidden" value={post.Body} id={`post_body_input_${post.Id}`} />
                        </Grid>
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
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(threadActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadPost);
