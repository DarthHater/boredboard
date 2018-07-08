import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ThreadList from './components/ThreadList/ThreadList';
import Thread from './components/Thread/Thread';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Login from './components/Login/Login';
import {isLoggedIn} from './auth/authentication';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <div>
                        <NavigationBar />

                        <main>
                            <Switch>
                                <Route
                                    exact={true}
                                    path="/"
                                    render={() =>
                                        isLoggedIn() ? (
                                            <ThreadList threads={this.props.threads} />
                                        ) : (
                                            <Redirect to="/login" />
                                        )
                                    }
                                />

                                <Route path="/login" component={Login} />

                                <Route
                                    path="/thread/:id"
                                    render={props => (isLoggedIn() ? <Thread {...props} /> : <Redirect to="/login" />)}
                                />
                            </Switch>
                        </main>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        threads: state.threads
    };
};

export default connect(mapStateToProps)(App);
