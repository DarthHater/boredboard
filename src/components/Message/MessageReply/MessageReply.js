import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import orange from '@material-ui/core/colors/orange';
import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux';
import { messageActions } from '../../../actions/index';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = {
    floatingLabelStyle: {
      color: orange[500],
    },
    floatingLabelFocusStyle: {
      color: blue[500],
    },
  };

class MessageReply extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.dispatch(messageActions.addMessagePost(this.props.messageId, this.props.userId, this.state.value));

        this.setState({value: ''});

        event.preventDefault();
    }

    render() {
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="Type something"
                    onChange={this.handleChange}
                    name="multiline-static"
                    multiline
                    rows="5"
                    defaultValue=""
                    margin="normal"
                    value={this.state.value}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <Button 
                    variant="contained" 
                    color="primary"
                    type="submit" 
                >say it!</Button>
            </ValidatorForm>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        message_post: state.message_post
    };
}

export default connect(mapStateToProps)(MessageReply);
