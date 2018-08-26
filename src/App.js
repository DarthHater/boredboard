import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThreadList from './components/ThreadList/ThreadList';
import MessageList from './components/MessageList/MessageList';
import Thread from './components/Thread/Thread';
import Message from './components/Message/Message';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfile'
import { isLoggedIn } from './auth/authentication';
import { ConnectedRouter } from 'connected-react-router'

const theme = createMuiTheme();

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <ConnectedRouter history={this.props.history}>
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
                                    path="/messages"
                                    render={() =>
                                        isLoggedIn() ? <MessageList messages={this.props.messages} /> : <Login />
                                    }
                                />
                                <Route
                                    path="/message/:id"
                                    render={props => (isLoggedIn() ? <Message {...props} /> : <Login />)}
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
                </ConnectedRouter>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        messages: state.messages,
        threads: state.threads,
        user: state.user
    };
};

export default connect(mapStateToProps)(App);
