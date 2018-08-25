import React, { Component } from 'react';
import NavBar from '../layout/NavBar';
import Dashboard from '../../components/dashboard/Dashboard';
import Footer from '../layout/Footer';

class LoginLayout extends Component {
    render() {
        return (
        	<div className="main">
    			<NavBar />
				<div className="content flex items-center mt-12">
					<div className="w-full max-w-screen-xl relative mx-auto px-4">
						<Dashboard />
					</div>
				</div>
				<Footer />
			</div>
        );
    }
}

export default LoginLayout;
