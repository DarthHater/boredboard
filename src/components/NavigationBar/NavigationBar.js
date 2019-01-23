import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextSms from '@material-ui/icons/TextSms';
import Person from '@material-ui/icons/Person';
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import { getUsername, isLoggedIn, getUserId } from '../../auth/authentication';
import { connect } from 'react-redux';
import { userActions } from '../../actions/index';
import { withRouter } from 'react-router-dom';
import { Hidden, Drawer, Link, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

const drawerWidth = 240;

const styles = theme => ({
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
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
          },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
          position: 'relative',
        },
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
});

class NavigationBar extends Component {

    state = {
        mobileOpen: false
    };

    logOut = () => {
        this.props.dispatch(userActions.logout());
    };

    navToRoute = (route) => () => {
        this.props.history.push(route);
    }

    handleDrawerOpen = () => {
        this.setState({ mobileOpen: true });
      };

    handleDrawerClose = () => {
        this.setState({ mobileOpen: false });
    };

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon></ChevronLeftIcon>
                    </IconButton>
                </div>
                <Divider />
                {isLoggedIn() && (
                <div>
                    <List>
                        <ListItem component={Link} onClick={this.navToRoute("/")}>
                            <ListItemIcon>
                                <SentimentDissatisfied></SentimentDissatisfied>
                            </ListItemIcon>
                            <ListItemText primary="Threads" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem component={Link} onClick={this.navToRoute("/messages")}>
                            <ListItemIcon>
                                <TextSms></TextSms>
                            </ListItemIcon>
                            <ListItemText primary="Messages" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem component={Link} onClick={this.navToRoute(`/user/${getUserId()}`)}>
                            <ListItemIcon>
                                <Person></Person>
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem component={Link} onClick={this.logOut} >
                            <ListItemIcon>
                                <DirectionsRun></DirectionsRun>
                            </ListItemIcon>
                            <ListItemText>
                                Logout {getUsername()}
                            </ListItemText>
                        </ListItem>
                    </List>
                </div>
                )}
            </div>
        )

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon 
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classes.navIconHide}
                            />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            VLV
                        </Typography>
                        {isLoggedIn() ? (
                                <Hidden smDown implementation="css">
                                    <Button onClick={this.navToRoute("/")} className={classes.navButton} color="inherit">
                                        Threads
                                    </Button>
                                    <Button onClick={this.navToRoute("/messages")} className={classes.navButton} color="inherit">
                                        Message
                                    </Button>
                                    <Button onClick={this.navToRoute(`/user/${getUserId()}`)} className={classes.navButton} color="inherit">
                                        Profile
                                    </Button>
                                    <Button onClick={this.logOut} variant="outlined" color="inherit">
                                        Logout {getUsername()}
                                    </Button>
                                </Hidden>
                            ) :
                            (
                                <Button onClick={this.navToRoute(`/login`)} variant="outlined" color="inherit">
                                    Login
                                </Button>
                            )
                        }
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClick={this.handleDrawerClose}
                        classes={{
                          paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                          keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
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

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(withRouter(NavigationBar)));
