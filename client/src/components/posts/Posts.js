import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

    render() {
    	const { posts, loading } = this.props.post;
    	let postContent;

		if (posts === null || loading) {
			postContent = <Spinner />;
		} else {
			postContent = <PostFeed posts={posts} />
		}

		const noContentToDisplay = (<p>There are no posts to display.</p>)

        return (
            <div className="posts">
				<PostForm />
				<div className="text-grey-darker">
					{posts.length ? postContent : noContentToDisplay}
				</div>
            </div>
        );
    }
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
