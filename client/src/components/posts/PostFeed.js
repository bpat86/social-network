import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostPartial from './PostPartial';

class PostFeed extends Component {
    render() {
    	const { posts } = this.props;

        return posts.map(post => <PostPartial key={post._id} post={post} />);
    }
}

PostFeed.propTypes = {
	posts: PropTypes.array.isRequired
};

export default PostFeed;
