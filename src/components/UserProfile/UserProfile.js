import React, {Component} from 'react';
import { getUsername } from '../../auth/authentication';
import UserService from '../../services/UserService';

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    componentWillMount() {
        const userId = this.props.match.params.userid;

        UserService.getUserInfo(userId).then(res => {
            this.setState({
                loading: false,
                 userInfo: res
            });
        });
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        const { userInfo } = this.state;

        return (
            <div className='container'>
                <header>
                    <h1>
                        {getUsername()}
                    </h1>
                </header>

                <div>
                    {this.props.bio}
                </div>

                <div>
                    Total Threads: {userInfo.totalThreads}
                </div>

                <div>
                    Total Posts: {userInfo.totalPosts}
                </div>

                 <div>
                    Last Posted: {new Date(userInfo.lastPosted).toLocaleString()}
                </div>
            </div>
        );
    }
}

export default UserProfile;
