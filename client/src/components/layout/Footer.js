import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer>
				<div className="flex justify-center items-center w-full max-w-screen-xl relative font-medium text-sm text-grey-dark mx-auto px-4 pin-x h-12">Copyright &copy; { new Date().getFullYear() } Bobby Patterson</div>
			</footer>
		);
	}
}

export default Footer;
