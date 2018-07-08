import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {getUsername, isLoggedIn} from '../../auth/authentication';
import {connect} from 'react-redux';
import {userActions} from '../../actions/index';

class NavigationBar extends Component {
    logOut = () => {
        this.props.dispatch(userActions.logout());
    };

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        VLV
                    </Typography>
                    { isLoggedIn() ? (
                        <Button label={'Logout ' + getUsername()} onClick={this.logOut} />
                    ) : (
                        <Button label="Login" />
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(NavigationBar);
