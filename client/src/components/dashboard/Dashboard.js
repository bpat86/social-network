import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
    componentDidMount() {
    	this.props.getCurrentProfile();
    }

    onDeleteClick = (e) => {
		this.props.deleteAccount();
    }

    render() {
    	const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		console.log(user);

		let dashboardContent;

		if (profile === null || loading) {
			dashboardContent = <Spinner />
		} else {
			// Check if logged user has profile data
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div className="mt-12">
						<ProfileActions />
						<Experience experience={profile.experience} />
						{ profile.education ? (<Education education={profile.education} />) : (<p>You haven't added any of your educational history yet.</p>) }
						<button
							className="bg-red-dark text-grey-lightest bg-transparent rounded font-medium text-center leading-tight h-12 m-0 px-4 py-2 cursor-pointer focus:outline-none mt-16"
							onClick={this.onDeleteClick}
							>
							Delete My Account
						</button>
    				</div>
				);
			} else {
				// User is logged in, but has no profile
				dashboardContent = (
					<div>
						<h1 className="my-4">Hello {user.name},</h1>
						<p className="text-grey-darker">Looks like you haven't set up a profile yet. Click the button below to do that now.</p>
        				<Link
        					to="/create-profile"
        					title="Create Profile"
        					className="inline-block bg-indigo-dark text-grey-lightest bg-transparent rounded font-medium text-center leading-tight m-0 mt-12 px-4 py-2 cursor-pointer focus:outline-none"
        					>
        					<span className="font-medium text-sm md:text-base mx-1">Create Profile <span className="ml-1">→</span></span>
        				</Link>
    				</div>
				);
			}
		}

        return (
            <div className="dashboard">
				{dashboardContent}
            </div>
        );
    }
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
