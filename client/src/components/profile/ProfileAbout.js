import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
	render() {
		const { profile } = this.props;

		// Get first name
		const firstName = profile.user.name.trim().split(' ')[0];

		// Skills
		const skills = profile.skills.map((skill, index) => (
			<span key={index} className="inline-block bg-indigo text-white rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mb-1 mr-1">{skill}</span>
		));

		return (
			<div className="profile-about">
				<div className="w-full mb-6 rounded-sm overflow-hidden border-2 border-grey-lighter bg-grey-lightest">
					<div className="p-4">
						<div className="font-bold text-xl mb-2">Intro</div>
						<p className="text-grey-darker text-sm mb-6">{isEmpty(profile.bio) ? (<span>{firstName} does not have a bio.</span>) : (<span>{profile.bio}</span>)}</p>
						<p className="text-grey-darker text-sm mb-6">{profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}</p>
		                {isEmpty(profile.location) ? null : (<p className="text-grey-darker text-sm mb-1">Lives in {profile.location}</p>)}
		                {isEmpty(profile.website) ? null : (<p className="text-grey-darker text-sm mb-1">{profile.website}</p>)}
		                {isEmpty(profile.social && profile.social.twitter) ? null : (<p className="text-grey-darker text-sm mb-1">{profile.social.twitter}</p>)}
		                {isEmpty(profile.social && profile.social.facebook) ? null : (<p className="text-grey-darker text-sm mb-1">{profile.social.facebook}</p>)}
		                {isEmpty(profile.social && profile.social.linkedin) ? null : (<p className="text-grey-darker text-sm mb-1">{profile.social.linkedin}</p>)}
		                {isEmpty(profile.social && profile.social.youtube) ? null : (<p className="text-grey-darker text-sm mb-1">{profile.social.youtube}</p>)}
		                {isEmpty(profile.social && profile.social.instagram) ? null : (<p className="text-grey-darker text-sm mb-1">{profile.social.instagram}</p>)}
					</div>
					<div className="p-4">
						{skills}
					</div>
				</div>
			</div>
		);
	}
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
}

export default ProfileAbout;
