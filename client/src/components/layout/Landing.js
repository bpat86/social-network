import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';

class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	render() {
		return (
			<div className="landing">
				<NavBar />
				<div className="flex-1">
					<div className="w-full min-h-screen fixed pin-t bg-center bg-white flex items-center justify-center leading-tight p-6 pb-16">
						<div className="w-full xl:mx-auto max-w-screen-xl text-shadow">
							<div className="xl:w-3/4 mx-auto">
								<h1 className="font-black text-black text-3xl md:text-4xl lg:text-5xl text-center mb-8">Remember when social-<br />networks didn't suck?</h1>
								<p className="text-xl lg:text-3xl text-grey-darker font-normal text-center leading-normal w-full m-0 my-6">We do too 😢. That's why we're on a mission to create a better one.</p>
								<div className="flex justify-center items-center py-4 pt-6 mt-4">
									<Link to="/register" title="Create an account" className="bg-indigo-dark text-grey-lightest rounded text-center font-medium text-sm md:text-base leading-inherit m-0 mx-1 px-6 py-4 cursor-pointer focus:outline-none">Create an Account <span className="ml-1">→</span></Link>
		            				<Link to="/login" title="Login" className="border-2 border-indigo-dark text-indigo-dark rounded text-center font-medium text-sm md:text-base leading-inherit m-0 mx-1 px-6 py-4 cursor-pointer focus:outline-none ml-4">Login <span className="ml-1">→</span></Link>
	            				</div>
	            			</div>
	            		</div>
	            	</div>
	            </div>
				<Footer />
			</div>
		);
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Landing);
