import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import { connect } from 'react-redux';
import { threadActions } from '../../../actions/index';
import config from 'react-global-configuration';
import parser from 'bbcode-to-react';
import { Grid, Button } from '@material-ui/core';

class ThreadPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            baseUrl: config.get('WS_ROOT')
        }

        this.props.dispatch(threadActions.loadPosts(this.props.threadId));
    }

    handleSocket(data) {
        let result = JSON.parse(data);
        if (result.ThreadId == this.props.threadId) {
            this.props.dispatch(threadActions.recievePost(data));
        }
    }

    handleQuote = id => {
        const body = document.getElementById(`post_body_${id}`).innerText;
        const header = document.getElementById(`post_info_${id}`).innerText;
        const post = `[quote]${header}${body}[/quote]`;
        this.props.quotePostCallback(post);
    }

    render() {
        return (
        <div className="posts">
                {this.props.posts.map(post => {
                    return (
                        <Grid container spacing={0} key={post.Id}>
                            <Grid item xs={12} sm={6} className="post header info" id={`post_info_${post.Id}`}>
                                <h4>
                                    Posted by <Link to={`/user/${post.UserId}`}>
                                        {post.UserName}
                                    </Link>
                                    &nbsp;on <Timestamp time={post.PostedAt} format="full" />
                                </h4>
                            </Grid>
                            <Grid item xs={12} sm={6} className="post header controls">
                                <Button 
                                    onClick={() => this.handleQuote(post.Id)}
                                >
                                    » Quote
                                </Button>
                            </Grid> 
                            <Grid item xs={12} className="post body" id={`post_body_${post.Id}`}>
                                {parser.toReact(post.Body)}
                            </Grid>
                        </Grid>
                        
                    )
                })}

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
