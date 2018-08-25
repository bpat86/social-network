import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class NavBar extends Component {
	onLogoutClick = e => {
		e.preventDefault();
		this.props.clearCurrentProfile();
		this.props.logoutUser();
	}
	render() {
		const { isAuthenticated, user } = this.props.auth;
		const authLinks = (
			<div className="hidden md:flex w-full leading-12">
				<div className="navigation flex w-full justify-end items-center font-medium text-grey-darker">
					<Link to="/dashboard" className="navigation-item inline-flex h-12 leading-12 px-4">Dashboard</Link>
					<a
						href=""
						onClick={this.onLogoutClick}
						className="navigation-item flex items-center h-12 leading-12 px-4"
						>
						<img
							className="w-10 h-10 rounded-full mr-4"
							src={user.avatar}
							alt={user.name}
							title="You must have a gravatar connected to your email to display an image"
						/>
						Logout
					</a>
				</div>
			</div>
		);
		const guestLinks = (
			<div className="hidden md:flex w-full leading-12">
				<div className="navigation flex w-full justify-end items-center font-medium text-grey-darker">
					<Link to="/register" className="navigation-item inline-flex h-12 leading-12 px-4">Create Account</Link>
					<Link to="/login" className="navigation-item inline-flex h-12 leading-12 px-4 pr-0">Login</Link>
				</div>
			</div>
		);

		return (
			<nav className="navigation flex bg-white fixed pin-t pin-x z-100 h-12 items-center z-10">
				<div className="w-full max-w-screen-xl relative mx-auto px-4">
					<div className="flex items-center">
						<Link to="/" className="flex items-center w-full font-bold text-indigo-dark tracking-tight md:w-1/2">
							Social Network
						</Link>
						{ isAuthenticated ? authLinks : guestLinks }
					</div>
				</div>
			</nav>
		);
	}
}

NavBar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(NavBar);
