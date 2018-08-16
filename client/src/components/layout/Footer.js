import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer className="flex bg-grey-lightest pin-x z-100 h-12 items-center">
				<div className="w-full max-w-screen-xl relative mx-auto px-4">
					<div className="flex justify-center">Copyright &copy; { new Date().getFullYear() } Bobby Patterson</div>
				</div>
			</footer>
		);
	}
}

export default Footer;
