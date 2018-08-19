import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThreadList from './components/ThreadList/ThreadList';
import Thread from './components/Thread/Thread';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfile'
import { isLoggedIn } from './auth/authentication';

const theme = createMuiTheme();

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <div>
                        <NavigationBar />
                        <main>
                            <Switch>
                                <Route
                                    exact={true}
                                    path="/"
                                    render={() =>
                                        isLoggedIn() ? <ThreadList threads={this.props.threads} /> : <Login />
                                    }
                                />

                                <Route
                                    path="/login"
                                    render={() => (isLoggedIn() ? <Redirect to={'/'} /> : <Login />)}
                                />

                                <Route
                                    path="/register"
                                    render={() => (isLoggedIn() ? <Redirect to={'/'} /> : <Register />)}
                                />

                                <Route
                                    path="/thread/:id"
                                    render={props => (isLoggedIn() ? <Thread {...props} /> : <Login />)}
                                />

                                <Route
                                    exact
                                    path="/user/:userid"
                                    render={props => (isLoggedIn() ? <UserProfile {...props} /> : <Login />)}
                                />
                            </Switch>
                        </main>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        threads: state.threads
    };
};

export default connect(mapStateToProps)(App);
