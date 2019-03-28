import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';
import PostPartial from '../posts/PostPartial';
import PostCommentForm from './PostCommentForm';
import PostCommentFeed from './PostCommentFeed';
import Spinner from '../common/Spinner';

class Post extends Component {
	componentDidMount() {
		this.props.getPost(false, this.props.match.params.id);
	}

    render() {
    	const { post, loading } = this.props.post;
    	let postContent;

		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner />
		} else {
			postContent = <PostPartial post={post} showActions={false} />
		}

        return (
            <div className="post">
            	{postContent}
            	<PostCommentForm postId={post._id} />
            	{post.comments ? <PostCommentFeed postId={post._id} comments={post.comments} /> : null}
            </div>
        );
    }
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
