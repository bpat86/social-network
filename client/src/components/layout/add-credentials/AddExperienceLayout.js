import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import Footer from '../../layout/Footer';
import AddExperience from '../../add-credentials/AddExperience';

class AddExperienceLayout extends Component {
    render() {
        return (
            <div>
            	<NavBar />
            	<div className="flex-1 w-full max-w-lg relative text-left mx-auto mt-24 px-4">
            		<AddExperience {...this.props} />
            	</div>
            	<Footer />
            </div>
        );
    }
}

export default AddExperienceLayout;
