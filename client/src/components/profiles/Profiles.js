import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfilePartial from './ProfilePartial';

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
				profileItems = profiles.map(profile => (
					<ProfilePartial key={profile._id} profile={profile} />
				))
			} else {
				profileItems = <p>No profiles yet.</p>
			}
		}

        return (
            <div className="profiles">
            	<h1 className="my-4">Profiles</h1>
                <p className="text-grey-darker">Browse and connect with people.</p>
                <div className="my-8 text-grey-darker">
					{profileItems}
				</div>
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
