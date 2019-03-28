import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
			<div>
				<h1 className="text-3xl text-grey-darkest">Page Not Found.</h1>
				<p className="text-base text-grey-dark">Sorry, this page doesn't exist.</p>
			</div>
	    );
    }
};

export default NotFound;
