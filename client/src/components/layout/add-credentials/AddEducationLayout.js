import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import Footer from '../../layout/Footer';
import AddEducation from '../../add-credentials/AddEducation';

class AddEducationLayout extends Component {
    render() {
        return (
            <div>
            	<NavBar {...this.props} />
            	<div className="flex-1 w-full max-w-lg relative text-left mx-auto mt-24 px-4">
            		<AddEducation {...this.props} />
            	</div>
            	<Footer {...this.props} />
            </div>
        );
    }
}

export default AddEducationLayout;
