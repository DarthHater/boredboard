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
import { debounce } from '../../helpers/debounce';

class ThreadList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: auth.getUserId(),
            canDeleteThreads: auth.userHasPermission(permissions.deleteThread),
            loading: false,
            scrollPosition: 0
        }
    }

    componentDidMount() {
        this.props.dispatch(threadActions.enterThreadList(false));
        window.addEventListener('scroll', debounce(this.handleScroll, 250));
        if (this.props.threads.length == 0) {
            this.props.dispatch(threadActions.loadThreads(new Date().valueOf()));
        }
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
        this.props.dispatch(threadActions.exitThreadList());
    }

    deleteThread = id => {
        this.props.dispatch(threadActions.deleteThread(id));
    }

    handleScroll = (e) => {
        this.state.scrollPosition = document.getElementsByTagName('html')[0].scrollTop;
        let scrollBottom = document.body.clientHeight;
        let height = (this.state.scrollPosition + window.innerHeight);

        if (
            scrollBottom - height < 300 
            && !this.state.loading
            && this.props.threads.length >= 20
            && !this.props.threadsNull
        ) {
            this.state.loading = true;
            this.props.dispatch(
                threadActions.loadThreads(
                    new Date(
                        this.props.threads[0].PostedAt
                    )
                    .valueOf()
                )
            );
            this.state.loading = false;
        }
    }

    componentDidUpdate(prevProps) {
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
        threadsNull: state.threadsNull,
        posts: state.posts
    };
}

export default connect(mapStateToProps)(ThreadList);
