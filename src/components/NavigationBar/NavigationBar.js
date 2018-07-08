import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {getUsername, isLoggedIn} from '../../auth/authentication';
import {connect} from 'react-redux';
import {userActions} from '../../actions/index';

class NavigationBar extends Component {
    logOut = () => {
        this.props.dispatch(userActions.logout());
    };

    render() {
        return (
            <AppBar
                title="VLV"
                showMenuIconButton={false}
                iconElementRight={
                    isLoggedIn() ? (
                        <FlatButton label={'Logout ' + getUsername()} onClick={this.logOut} />
                    ) : (
                        <FlatButton label="Login" containerElement={<Link to="/login" />} />
                    )
                }
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(NavigationBar);
