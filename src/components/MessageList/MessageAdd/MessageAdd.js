import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { messageActions } from '../../../actions';
import * as auth from '../../../auth/authentication';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MultiSelect from '../../Common/MultiSelect';

class MessageAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            title: '',
            body: ''
        };

        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('multiSelectNotEmpty', () => {
            if (this.props.message_users.length === 0) {
                return false;
            }
            return true;
        });
    }

    handleMessageChange = (event) => {
        this.setState({title: event.target.value});
    }

    handlePostChange = (event) => {
        this.setState({body: event.target.value});
    }

    handleSubmit(event) {
        let date = new Date(Date.now());
        let data = {
            Message: {
                UserId: this.props.userId,
                Title: this.state.title,
                PostedAt: date
            },
            MessagePost: {
                UserId: this.props.userId,
                Body: this.state.body,
                PostedAt: date
            },
            MessageMember: this.props.message_users.map(user => {
                return {
                    UserId: user.ID
                }
            })
        }
        data.MessageMember.push({
            UserId: this.props.userId
        })
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
                    <MultiSelect />
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
        message_posts: state.message_posts,
        message_users: state.message_users
    };
}

export default connect(mapStateToProps)(MessageAdd);
