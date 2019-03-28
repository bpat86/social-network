import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import Profiles from '../../profiles/Profiles';
import Footer from '../../layout/Footer';

class ProfilesLayout extends Component {
    render() {
        return (
            <div className="profiles-layout">
            	<NavBar {...this.props} />
				<div className="container">
					<Profiles {...this.props} />
				</div>
				<Footer {...this.props} />
            </div>
        );
    }
}

export default ProfilesLayout;
