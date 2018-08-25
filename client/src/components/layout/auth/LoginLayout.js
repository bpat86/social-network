import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import Login from '../../../components/auth/Login';
import Footer from '../../layout/Footer';

class LoginLayout extends Component {
    render() {
        return (
        	<div className="login-layout">
    			<NavBar />
				<div className="flex-1 flex items-center mt-12">
					<div className="w-full max-w-screen-xl relative mx-auto px-4">
						<Login {...this.props} />
					</div>
				</div>
				<Footer />
			</div>
        );
    }
}

export default LoginLayout;
