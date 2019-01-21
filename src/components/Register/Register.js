import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {userActions} from '../../actions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    }
  });

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            username: '',
            emailaddress: '',
            password: ''
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({submitted: true});

        let body = JSON.stringify({
            username: this.state.username,
            emailaddress: this.state.emailaddress,
            password: this.state.password
        });

        const {dispatch} = this.props;

        dispatch(userActions.register(body));
    };

    handleUserNameChange = event => {
        this.setState({username: event.target.value});
    };

    handleEmailChange = event => {
        this.setState({emailaddress: event.target.value});
    };

    handlePasswordChange = event => {
        this.setState({password: event.target.value});
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h3>Welcome to VLV!</h3>
                <p>Enter your details to register as a new user</p>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        label="Username"
                        onChange={this.handleUserNameChange}
                        name="username"
                        margin="normal"
                        value={this.state.username}
                        className={classes.textField}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <br />
                    <TextValidator
                        label="Email Address"
                        onChange={this.handleEmailChange}
                        name="emailaddress"
                        margin="normal"
                        value={this.state.emailaddress}
                        className={classes.textField}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                    <br />
                    <TextValidator
                        label="Password"
                        onChange={this.handlePasswordChange}
                        name="password"
                        margin="normal"
                        value={this.state.password}
                        className={classes.textField}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <br />
                    <Button type="submit">Register</Button>
                </ValidatorForm>
                <h4>Have an account already?</h4>
                <p>
                    Go <Link to="/login">here</Link> to login.
                </p>
            </div>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Register));
