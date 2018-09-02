import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { getUsername, isLoggedIn, getUserId } from '../../auth/authentication';
import { connect } from 'react-redux';
import { userActions } from '../../actions/index';
import { withRouter } from 'react-router-dom';

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
    navButton: {
        marginRight: 20
    }
};

class NavigationBar extends Component {

    logOut = () => {
        this.props.dispatch(userActions.logout());
    };

    navToRoute = (route) => () => {
        this.props.history.push(route);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            VLV
                        </Typography>
                        {isLoggedIn() ? (
                            <Fragment>
                                <Button onClick={this.navToRoute("/")} className={classes.navButton} color="inherit">
                                    Threads
                                </Button>
                                <Button onClick={this.navToRoute("/")} className={classes.navButton} color="inherit">
                                    Message
                                </Button>
                                <Button onClick={this.navToRoute(`/user/${getUserId()}`)} className={classes.navButton} color="inherit">
                                    Profile
                                </Button>
                                <Button onClick={this.logOut} variant="outlined" color="inherit">Logout {getUsername()}</Button>
                            </Fragment>
                            ) :
                            (<Button variant="outlined" color="inherit">Login</Button>)
                        }
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(NavigationBar)));
