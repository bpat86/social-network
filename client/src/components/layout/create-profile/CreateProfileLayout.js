import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import CreateProfile from '../../create-profile/CreateProfile';
import Footer from '../../layout/Footer';

class CreateProfileLayout extends Component {
    render() {
        return (
            <div className="create-profile-layout">
            	<NavBar />
				<div className="container">
					<CreateProfile {...this.props} />
				</div>
				<Footer />
            </div>
        );
    }
}

export default CreateProfileLayout;
