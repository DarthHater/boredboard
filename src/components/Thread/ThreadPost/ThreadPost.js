import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import WebSocket from 'react-websocket';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import config from 'react-global-configuration';
import { debounce } from '../../../helpers/debounce';
import directions from '../../../constants/directions';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';

class ThreadPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            baseUrl: config.get('WS_ROOT')
        }
    }

    postsElem = null;
    loading = false;

    async componentDidMount() {
        var res = await this.props.actions.loadPosts(this.props.threadId);
        if (res && res.posts) {
            document.getElementById(res.posts[0].Id).scrollIntoView();
        }
        this.postsElem = document.getElementsByClassName("posts")[0];
        this.postsElem.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    componentWillUnmount() {
        this.postsElem.removeEventListener('scroll', this.handleScroll);
    }

    handleSocket(data) {
        let result = JSON.parse(data);
        if (result.ThreadId == this.props.threadId) {
            this.props.recievePost(data);
        }
    }

    handleScroll = debounce((e) => {
        let height = this.postsElem.scrollHeight;
        let currentPosition = this.postsElem.scrollTop;

        const { posts } = this.props;

        if (
            height - currentPosition < 500
            && !this.loading
            && posts.length >= 20
        ) {
            let post = posts[posts.length - 1];
            this.getThreads(new Date(post.PostedAt), directions.DOWN);
        } else if (
            currentPosition < 300
            && !this.loading
            && posts.length >= 20
        ) {
            let post = posts[0];
            this.getThreads(new Date(post.PostedAt), directions.UP);
        }
    }, 250)

    async getThreads(date, direction) {
        this.loading = true;
        let res = await this.props.actions.loadPosts(
            this.props.threadId,
            date.valueOf(),
            direction
        );
        this.loading = false;
        if (direction === directions.UP) {
            let post = res.posts[res.posts.length - 1];
            document.getElementById(post.Id).scrollIntoView();
        }
    }

    render() {
        const { posts } = this.props;

        return (
            <Fragment>
                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.getThreads(new Date(posts[0].PostedAt), directions.UP)}
                >
                    Load Last 20
                </Button> */}
                <div className="posts">
                    <ul className="postsListUl">
                        {this.props.posts.map(post => {
                            return (
                                <li key={post.Id} className="post" id={post.Id}>
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
            </Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions.threadActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadPost);
