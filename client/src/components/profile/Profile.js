import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getProfileByHandle, getProfileById } from '../../actions/profileActions';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCredentials from './ProfileCredentials';
import ProfileGithub from './ProfileGithub';

import UserPosts from '../posts/UserPosts';

class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.profile.profile === null && this.props.profile.loading) {
			this.props.history.push('/not-found');
		}
	}

    render() {
		const { profile, loading } = this.props.profile;
		const { user } = this.props.auth;

		console.log(user, profile);

        return (
            <div className="profile">
            	{ profile === null || loading ? <Spinner /> :
            		<div>
            			<div className="header mb-8">
            				<div className="block w-full h-64 mb-8 relative rounded-b overflow-hidden">
            					<div className="absolute pin-b pin-l z-10">
									<ProfileHeader avatar={user.avatar} profile={profile} />
								</div>
            					<img className="absolute pin-t pin-l w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
            				</div>
            			</div>
		            	<div className="content-wrapper lg:flex">
			                <div className="sidebar lg:max-w-xs lg:block lg:relative lg:sticky lg:mr-8">
			     				<ProfileAbout profile={profile} />
			     				<ProfileCredentials
				            		education={profile.education}
				            		experience={profile.experience}
				            	/>
				            	{ profile.githubusername ? (<ProfileGithub username={profile.githubusername} />) : null }
			                </div>
			                <div className="min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5">

								<UserPosts {...this.props} />

			            	</div>
		            	</div>
		            </div>
            	}
            </div>
        );
    }
}

Profile.propTypes = {
	getProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
