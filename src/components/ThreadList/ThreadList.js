import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ThreadAdd from './ThreadAdd/ThreadAdd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import { connect } from 'react-redux';
import * as auth from '../../auth/authentication';
import { threadActions } from '../../actions';
import * as permissions from '../../constants/permissions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class ThreadList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: auth.getUserId(),
            canDeleteThreads: auth.userHasPermission(permissions.deleteThread),
            loading: false,
            scrollPosition: 0,
            rendered: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.throttle(this.handleScroll, 250));
        if (this.props.threads.length == 0) {
            this.props.dispatch(threadActions.loadThreads(new Date().valueOf()));
        }
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }

    deleteThread = id => {
        this.props.dispatch(threadActions.deleteThread(id));
    }

    throttle(fn, wait) {
        var time = Date.now();
        return function() {
            if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
            }
        }
    }

    handleScroll = (e) => {
        this.state.scrollPosition = window.scrollY;
        let scrollBottom = window.innerHeight;
        let loading = this.state.loading;

        if (
            scrollBottom - this.state.scrollPosition < 100 
            && !loading
            && this.props.threads.length >= 20
        ) {
            this.state.loading = true;
            let thread = this.props.threads[0];
            let date = new Date(thread.PostedAt).valueOf();
            this.props.dispatch(threadActions.loadThreads(date));
            this.state.loading = false;
        }
    }

    componentDidUpdate(prevProps) {
        this.state.rendered = true;
        window.scrollTo(0, this.state.scrollPosition);
    }

    render() {
        if (!this.props.thread) {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            )
        } else {
            return (
                <div
                    style= {{
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        marginTop: 64,
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        overflowY: 'auto',
                    }}
                >
                    <ThreadAdd
                        userId={this.state.userId} >
                    </ThreadAdd>
                    {this.props.threads.map(thread => {
                        return (
                            <Card 
                                style= {{
                                    display: 'flex',
                                    flexDirection: 'column-reverse',
                                }}
                                key={thread.Id}
                            >
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
                                                <Link to={{ pathname: `/thread/${thread.Id}` }}>
                                                    {thread.Title}
                                                </Link>
                                            </Typography>
                                            <Typography component="p">
                                                by: <Link to={`/user/${thread.UserId}`}>
                                                    {thread.UserName}
                                                </Link> on <Timestamp time={thread.PostedAt} format="full" />
                                            </Typography>
                                        </Grid>
                                        {this.state.canDeleteThreads && (
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => this.deleteThread(thread.Id)}
                                                >
                                                    Delete Thread
                                                </Button>
                                            </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        threads: state.threads,
        thread: state.thread,
        posts: state.posts
    };
}

export default connect(mapStateToProps)(ThreadList);
