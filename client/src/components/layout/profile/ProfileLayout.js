import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import Profile from '../../profile/Profile';
import ProfileAbout from '../../profile/ProfileAbout';
import Footer from '../../layout/Footer';

class ProfileLayout extends Component {
    render() {
        return (
            <div className="profile-layout">
            	<NavBar {...this.props} />
				<div className="container-xl">
					<Profile {...this.props} />
				</div>
				<Footer {...this.props} />
            </div>
        );
    }
}

export default ProfileLayout;
