import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import NotFound from '../../not-found/NotFound';
import Footer from '../../layout/Footer';

class NotFoundLayout extends Component {
    render() {
        return (
            <div className="not-found-layout">
            	<NavBar {...this.props} />
				<div className="container">
					<NotFound {...this.props} />
				</div>
				<Footer {...this.props} />
            </div>
        );
    }
}

export default NotFoundLayout;
