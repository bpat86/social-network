import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import EditProfile from '../../edit-profile/EditProfile';
import Footer from '../../layout/Footer';

class EditProfileLayout extends Component {
    render() {
        return (
            <div className="edit-profile-layout">
            	<NavBar {...this.props} />
				<div className="container">
					<EditProfile {...this.props} />
				</div>
				<Footer {...this.props} />
            </div>
        );
    }
}

export default EditProfileLayout;
