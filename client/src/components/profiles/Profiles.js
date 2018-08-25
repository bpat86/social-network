import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';

class Profile extends Component {
	componentDidMount() {
		this.props.getProfiles();
	}

    render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;

		if (profiles === null || loading) {
			profileItems = <Spinner />;
		} else {
			if (profiles.length > 0) {
				profileItems = <h1 className="mt-16">Profiles Here</h1>
			} else {
				profileItems = <p>No profiles found...</p>
			}
		}

        return (
            <div className="profiles">
				<h1 className="my-4">Profiles</h1>
				<p class="text-grey-darker">Browse and connect with people.</p>
				{profileItems}
            </div>
        );
    }
}

Profile.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profile);
