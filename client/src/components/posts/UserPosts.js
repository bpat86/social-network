import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import UserPostForm from './UserPostForm';
import UserPostFeed from './UserPostFeed';
import { getPosts } from '../../actions/postActions';

class UserPosts extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

    render() {
    	const { match } = this.props;
    	const { posts, loading } = this.props.post;
    	const { profile } = this.props.profile;
    	let postContent;

    	console.log(profile);

		if (posts === null || loading) {
			postContent = <Spinner />;
		} else {
			postContent = <UserPostFeed posts={posts} profile={profile} loading={loading} match={match} />
		}

		const noContentToDisplay = (<p>There are no posts to display.</p>)

        return (
            <div className="posts">
				<UserPostForm profile={profile} />
				<div className="text-grey-darker">
					{posts.length ? postContent : noContentToDisplay}
				</div>
            </div>
        );
    }
}

UserPosts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post,
	profile: state.profile
});

export default connect(mapStateToProps, { getPosts })(UserPosts);
