import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import CreateProfile from '../../create-profile/CreateProfile';
import Footer from '../../layout/Footer';

class CreateProfileLayout extends Component {
    render() {
        return (
            <div className="create-profile-layout">
            	<NavBar {...this.props} />
				<div className="container">
					<CreateProfile {...this.props} />
				</div>
				<Footer {...this.props} />
            </div>
        );
    }
}

export default CreateProfileLayout;
