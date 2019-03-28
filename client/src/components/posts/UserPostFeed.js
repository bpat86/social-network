import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostPartial from './PostPartial';

class UserPostFeed extends Component {
    render() {
    	const { posts, profile, loading, match } = this.props;

    	const userPosts = posts.map(post => {
    		if (! loading && post.name === profile.user.name) {
    			return <PostPartial key={post._id} post={post} />
    		}
    	});

        return userPosts;
    }
}

UserPostFeed.propTypes = {
	posts: PropTypes.array.isRequired
};

export default UserPostFeed;
