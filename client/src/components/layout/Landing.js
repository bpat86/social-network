import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	render() {
		return (
			<div className="flex flex-col">
				<div className="w-full min-h-screen fixed pin-t bg-center bg-grey-lightest flex items-center justify-center leading-tight p-6 pb-16">
					<div className="w-full xl:mx-auto max-w-screen-xl text-shadow">
						<div className="xl:w-3/4 mx-auto">
							<h1 className="font-bold text-3xl lg:text-5xl text-center mb-6">Social Network</h1>
							<p className="text-lg lg:text-2xl font-normal text-center leading-normal m-0 my-4">Let's face it, social networks suck. That's why I built another one.
								<br />This one will be different, I promise ;)</p>
							<div className="flex justify-center items-center py-4 pt-6 mt-4">
								<Link to="/register" title="Create an account" className="border-2 border-black rounded-full text-center leading-tight m-0 mb-6 mr-6 px-4 py-2 cursor-pointer"><span className="font-medium text-sm md:text-base mx-1">Sign Up <span className="ml-1">→</span></span></Link>
	            				<Link to="/login" title="Click here to learn more" className="border-2 border-black bg-transparent rounded-full text-center leading-tight m-0 mb-6 px-4 py-2 cursor-pointer"><span className="font-medium text-sm md:text-base mx-1">Login <span className="ml-1">→</span></span></Link>
            				</div>
            			</div>
            		</div>
            	</div>
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

export default connect(null)(Landing);
