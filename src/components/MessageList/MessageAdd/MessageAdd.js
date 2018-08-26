import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { messageActions } from '../../../actions';
import * as auth from '../../../auth/authentication';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class MessageAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            title: '',
            body: ''
        };

        this.handlePostChange = this.handlePostChange.bind(this);
        // this.handleThreadChange = this.handleThreadChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleMessageChange(event) {
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
        this.props.dispatch(messageActions.addMessage(data));

        this.setState({title: '', body: ''});

        event.preventDefault();
    }

    render() {
        return (
            <div className='container'>
                <h3>Submit a new message</h3>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        label="Title"
                        onChange={this.handleMessageChange}
                        name="title"
                        value={this.state.title}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <p></p>
                    <TextValidator
                        label="Say something"
                        onChange={this.handlePostChange}
                        name="multiline-static"
                        value={this.state.body}
                        multiline
                        rows="5"
                        margin="normal"
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <p></p>
                    <Button
                        type="submit" >
                        say it!
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        messages: state.messages,
        message: state.message,
        message_posts: state.message_posts
    };
}

export default connect(mapStateToProps)(MessageAdd);
