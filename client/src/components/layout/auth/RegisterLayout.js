import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import Register from '../../../components/auth/Register';
import Footer from '../../layout/Footer';

class RegisterLayout extends Component {
    render() {
        return (
        	<div className="register-layout">
    			<NavBar {...this.props} />
				<div className="flex-1 flex items-center mt-12">
					<div className="w-full max-w-screen-xl relative mx-auto px-4">
						<Register {...this.props} />
					</div>
				</div>
				<Footer {...this.props} />
			</div>
        );
    }
}

export default RegisterLayout;
