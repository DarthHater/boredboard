import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Grid } from '@material-ui/core';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    container: {
        alignContent: 'center'
    },
    item: {
        textAlign: 'right'
    },
    santaDog: {
        textAlign: 'center'
    }
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            username: '',
            password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({ submitted: true });

        let body = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        });

        this.props.actions.login(body);
    };

    handleEmailChange = event => {
        this.setState({ username: event.target.value });
    };

    handlePasswordChange = event => {
        this.setState({ password: event.target.value });
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12} style={{textAlign: 'center'}}>
                    <h2>Welcome to VLV!</h2>
                </Grid>
                <Grid item xs={12} sm={12} style={{textAlign: 'center'}}>
                    <img src="http://i.imgur.com/yTLWX.jpg" />
                </Grid>
                <Grid item xs={12} sm={6} style={{textAlign: 'center'}}>
                    <h4>Enter your credentials to login and start shit posting</h4>
                    {this.props.user.error &&
                        <FormHelperText error style={{textAlign: 'center'}}>{this.props.user.error}</FormHelperText>
                    }
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                        error
                    >
                        <TextValidator
                            label="Username"
                            onChange={this.handleEmailChange}
                            name="username"
                            margin="normal"
                            value={this.state.username}
                            className={classes.textField}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <br />
                        <TextValidator
                            label="Password"
                            onChange={this.handlePasswordChange}
                            name="password"
                            type="password"
                            margin="normal"
                            value={this.state.password}
                            className={classes.textField}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <br />
                        <Button variant="contained" color="primary" type="submit">Login</Button>
                    </ValidatorForm>
                </Grid>
                <Grid item xs={12} sm={6} style={{textAlign: 'center'}}>
                    <h4>Don't have an account?</h4>
                    <p>
                        Go <Link to="/register">here</Link> to register.
                    </p>
                </Grid>
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
