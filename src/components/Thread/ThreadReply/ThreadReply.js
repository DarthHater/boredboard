import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import orange from '@material-ui/core/colors/orange';
import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux';
import { threadActions } from '../../../actions/index';

const styles = {
    floatingLabelStyle: {
      color: orange[500],
    },
    floatingLabelFocusStyle: {
      color: blue[500],
    },
  };

class ThreadReply extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.dispatch(threadActions.addPost(this.props.threadId, this.props.userId, this.state.value));

        this.setState({value: ''});

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField 
                    id="multiline-static"
                    label="Type something"
                    multiline
                    rows="5"
                    defaultValue=""
                    margin="normal"
                    value={this.state.value} 
                    onChange={this.handleChange} 
                />
                <Button 
                    variant="contained" 
                    color="primary"
                    type="submit" 
                >say it!</Button>
            </form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        post: state.post
    };
}

export default connect(mapStateToProps)(ThreadReply);
