import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfilePartial extends Component {
    render() {
    	const { profile } = this.props;
        return (
            <div className="profile-partial rounded-sm overflow-hidden border-2 border-grey-lighter bg-white mb-8">
				<div className="max-w-md w-full lg:flex">
					<div className="flex items-start">
						<img className="w-16 h-16 rounded-full m-4" src={profile.user.avatar} alt="Avatar of Jonathan Reinink" />
					</div>
					<div className="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col w-full justify-between leading-normal">
						<div className="mb-8">
							<div className="text-black font-bold text-xl mb-2">{profile.user.name}</div>
							<p className="text-grey-darker text-base">{profile.status} { isEmpty(profile.company) ? null : (<span>at {profile.company}</span>) }</p>
						</div>
						<Link to={`/profile/${profile.handle}`}>View Profile</Link>
					</div>
				</div>
            </div>
        );
    }
}

ProfilePartial.propTypes = {
	profile: PropTypes.object.isRequired
}

export default ProfilePartial;
