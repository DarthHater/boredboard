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
            canDeleteThreads: auth.userHasPermission(permissions.deleteThread)
        }
    }

    componentDidMount() {
        this.props.dispatch(threadActions.loadThreads());
    }

    deleteThread = id => {
        this.props.dispatch(threadActions.deleteThread(id));
    }

    render() {
        return (
            <div className='container'>
                {this.props.threads.map(thread => {
                    return (
                        <Card key={thread.Id}>
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
                <ThreadAdd
                    userId={this.state.userId} >
                </ThreadAdd>
            </div>
        );
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
