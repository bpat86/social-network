import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import Dashboard from '../../dashboard/Dashboard';
import Footer from '../../layout/Footer';

class DashboardLayout extends Component {
    render() {
        return (
            <div className="dashboard-layout">
            	<NavBar />
				<div className="container">
					<Dashboard {...this.props} />
				</div>
				<Footer />
            </div>
        );
    }
}

export default DashboardLayout;
