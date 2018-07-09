import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {userActions} from '../../actions';

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
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        id="username"
                        label="Username"
                        className={classes.textField}
                        value={this.state.username}
                        margin="normal"
                        onChange={this.handleUserNameChange} 
                    />
                    <TextField 
                        id="emailaddress"
                        label="Email Address"
                        className={classes.textField}
                        value={this.state.emailaddress}
                        margin="normal"
                        onChange={this.handleEmailChange} 
                    />
                    <br />
                    <TextField
                        type="password"
                        id="password"
                        label="Password"
                        className={classes.textField}
                        value={this.state.password}
                        margin="normal"
                        onChange={this.handlePasswordChange}
                    />
                    <br />
                    <Button type="submit">Register</Button>
                </form>
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
