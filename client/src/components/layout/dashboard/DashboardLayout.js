import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import Dashboard from '../../dashboard/Dashboard';
import Footer from '../../layout/Footer';

class DashboardLayout extends Component {
    render() {
        return (
            <div className="dashboard-layout">
            	<NavBar {...this.props} />
				<div className="container">
					<Dashboard {...this.props} />
				</div>
				<Footer {...this.props} />
            </div>
        );
    }
}

export default DashboardLayout;
