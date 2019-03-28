import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import Moment from 'react-moment';

class ProfileHeader extends Component {
    render() {
    	const { profile, avatar } = this.props;

        return (
            <div className="profile-header">
                <div className="flex items-center p-4">
                    <img src={avatar} alt="Avatar of Jonathan Reinink" className="w-24 h-24 rounded border-3 border-white shadow-inner shadow mr-4" />
                    <div className="text-lg">
                        <h1 className="text-white text-3xl font-medium leading-none mb-2">{profile.user.name}</h1>
                        <div className="text-grey-lightest text-sm font-normal leading-none">
                            <i className="far fa-calendar-alt"></i> Joined <Moment format="MMMM YYYY">{profile.date}</Moment>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;
