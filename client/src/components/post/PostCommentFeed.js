import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostCommentPartial from './PostCommentPartial';

class PostCommentFeed extends Component {
    render() {
    	const { comments, postId } = this.props;

        return comments.map(comment => (
        	<PostCommentPartial key={comment._id} comment={comment} postId={postId} />
        ));
    }
}

PostCommentFeed.propTypes = {
	comments: PropTypes.array.isRequired,
	postId: PropTypes.string.isRequired
};

export default PostCommentFeed;
