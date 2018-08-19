import React, {Component} from 'react';

class UserProfile extends Component {
    

    render() {
        return (
            <div className='container'>
                <header>
                    <h1>
                        {this.props.name}
                    </h1>
                </header>

                <div>
                    {this.props.bio}
                </div>
            </div>
        );
    }
}

export default UserProfile;
