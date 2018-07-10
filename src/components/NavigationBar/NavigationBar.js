import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {getUsername, isLoggedIn} from '../../auth/authentication';
import {connect} from 'react-redux';
import {userActions} from '../../actions/index';

const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

class NavigationBar extends Component {

    logOut = () => {
        this.props.dispatch(userActions.logout());
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            VLV
                        </Typography>
                        { isLoggedIn() ? (
                            <Button onClick={this.logOut} variant="outlined" color="inherit">Logout {getUsername()}</Button>
                                ) : (
                            <Button variant="outlined" color="inherit">Login</Button>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

NavigationBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(withStyles(styles)(NavigationBar));
