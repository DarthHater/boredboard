import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500} from 'material-ui/styles/colors';
import ThreadService from '../../../services/ThreadService';
import config from 'react-global-configuration';

const styles = {
    floatingLabelStyle: {
      color: orange500,
    },
    floatingLabelFocusStyle: {
      color: blue500,
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
        let baseUrl = config.get('API_ROOT');
        fetch(`${baseUrl}/post`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ThreadId: this.props.threadId,
                UserId: this.props.userId,
                Body: this.state.value,
            })});

        this.setState({value: ''});

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField 
                    floatingLabelText="Type something"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    value={this.state.value} 
                    onChange={this.handleChange} 
                    multiLine={true} 
                    rows="5" 
                />
                <RaisedButton 
                    label="say it!" 
                    primary={true} 
                    type="submit" 
                />
            </form>
        );
    }
}

export default ThreadReply;
