import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { threadActions } from '../../../actions'; 
import * as auth from '../../../auth/authentication';

class ThreadAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            title: '',
            body: ''
        };

        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleThreadChange = this.handleThreadChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleThreadChange(event) {
        this.setState({title: event.target.value});
    }

    handlePostChange(event) {
        this.setState({body: event.target.value});
    }

    handleSubmit(event) {
        let date = new Date(Date.now());
        let data = {
            Thread: {
                UserId: this.props.userId,
                Title: this.state.title,
                PostedAt: date
            },
            Post: {
                UserId: this.props.userId,
                Body: this.state.body,
                PostedAt: date
            }
        }
        this.props.dispatch(threadActions.addThread(data));
        
        this.setState({title: '', body: ''});

        event.preventDefault();
    }

    render() {
        return (
            <div className='container'>
                <h3>Submit a new thread</h3>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="title"
                        label="Thread title"
                        value={this.state.title}
                        onChange={this.handleThreadChange}
                    />
                    <p></p>
                    <TextField 
                        id="multiline-static"
                        label="Say something"
                        multiline
                        rows="5"
                        margin="normal"
                        value={this.state.body} 
                        onChange={this.handlePostChange} 
                    />
                    <p></p>
                    <Button 
                        type="submit" >
                        say it!
                    </Button>
            </form>
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

export default connect(mapStateToProps)(ThreadAdd);
