import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile, getProfileById } from '../../actions/profileActions';

class NavBar extends Component {
	onLogout = e => {
		e.preventDefault();

		this.props.clearCurrentProfile();
		this.props.logoutUser(this.props.history);
	}

	componentDidMount() {
        const { user } = this.props.auth;

        if (user.id) {
            this.props.getProfileById(user.id);
        }
    }

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		const authLinks = (
			<div className="inline-flex">
				<Link to="/profiles" className="navigation-item inline-flex h-12 leading-12 px-4">Profiles</Link>
				<Link to="/newsfeed" className="navigation-item inline-flex h-12 leading-12 px-4">News Feed</Link>
				<Link to="/dashboard" className="navigation-item inline-flex h-12 leading-12 px-4">Dashboard</Link>
				{ profile !== null && profile.handle !== undefined && isAuthenticated ? (
					<Link to={`/profile/${profile.handle}`} className="navigation-item inline-flex h-12 leading-12 px-4">
						<div className="flex items-center pl-4">
							<img
								className="w-6 h-6 rounded-full mr-3"
								src={user.avatar}
								alt={user.name}
								title="You must have a gravatar connected to your email to display an image"
							/>
							{user.name}
						</div>
					</Link>
					) : null }
				<a
					href=""
					onClick={this.onLogout}
					className="navigation-item flex items-center h-12 leading-12 px-4 pr-0"
					>
					Logout
				</a>
			</div>
		);
		const guestLinks = (
			<div className="inline-flex">
				<Link to="/register" className="navigation-item inline-flex h-12 leading-12 px-4">Create Account</Link>
				<Link to="/login" className="navigation-item inline-flex h-12 leading-12 px-4 pr-0">Login</Link>
			</div>
		);

		return (
			<nav className="navigation flex bg-white fixed pin-t pin-x h-12 items-center z-50">
				<div className="w-full max-w-screen-xl relative mx-auto px-4">
					<div className="flex items-center">
						<Link to="/" className="flex items-center w-full font-bold text-indigo-dark tracking-tight md:w-1/2">
							<i className="fas fa-user-astronaut text-sm mr-1"></i> Social Network
						</Link>
						<div className="hidden md:flex w-full leading-12">
							<div className="navigation flex w-full justify-end items-center font-medium text-grey-darker">
								{ isAuthenticated ? authLinks : guestLinks }
							</div>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

NavBar.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile, getProfileById })(NavBar);
