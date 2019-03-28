import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePostComment, likePostComment, unlikePostComment } from '../../actions/postActions';

class PostCommentPartial extends Component {
	onDelete = (postId, id) => {
		this.props.deletePostComment(postId, id);
	}

	likePostComment = (postId, id) => {
		const { comment, auth } = this.props;

		// Toggle "like" / "unlike" on click
		if (comment.likes.some(() => auth.user.id)) {
			this.props.unlikePostComment(postId, id);
		} else {
			this.props.likePostComment(postId, id);
		}
	}
	unlikePostComment = () => {

	}

	userHasLiked(likes) {
		const { auth } = this.props;

		if (likes.filter(like => like.user === auth.user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	}

    render() {
    	const { comment, postId, auth, showActions } = this.props;

        return (
			<div className="post-comment-partial rounded-sm overflow-hidden border-2 border-grey-lighter bg-white my-8">
				<div className="w-full flex p-4">
					<div className="flex items-start w-16 h-16">
						<img className="max-w-full h-auto rounded-full" src={comment.avatar} alt={comment.name} />
					</div>
					<div className="flex flex-col w-full justify-between leading-normal pl-4">
						<div className="mb-4">
							<div className="text-black font-bold text-xl mb-2">{comment.name}</div>
							<p className="text-grey-darker text-base">{comment.text}</p>
							{showActions ? <div className="text-grey-darker text-sm mt-6"><span className="leading-none mr-1">{comment.likes.length}</span>like this</div> : null}
						</div>
						{showActions ? <span><div className="flex items-center justify-around pt-4 border-t border-grey-lighter">
							<button
								type="button"
								className="text-grey-dark hover:text-indigo-dark focus:outline-none"
								onClick={() => this.likePostComment(postId, comment._id)}
								>
								<i className={`${this.userHasLiked(postId, comment.likes) ? 'fas fa-thumbs-up text-indigo-dark mr-1' : 'far fa-thumbs-up mr-1'}`} /> Likes
							</button>
							<Link
								to={`/posts/comments/${comment._id}`}
								className="text-grey-dark hover:text-indigo-dark focus:outline-none"
								>
								<i className="far fa-comment-alt mr-1" /> Comments
							</Link>
						</div>
						<div className="flex items-center justify-center text-grey-dark">
							{comment.user === auth.user.id ? (
								<button
									type="button"
									onClick={() => this.onDelete(postId, comment._id)}
									className="hover:text-red"
									>
									<i className="fas fa-times mr-1" /> Delete
								</button>
							) : null}
						</div></span> : null}
						<div className="flex items-center justify-center text-grey-dark">
							{comment.user === auth.user.id ? (
								<button
									type="button"
									onClick={() => this.onDelete(postId, comment._id)}
									className="hover:text-red"
									>
									<i className="fas fa-times mr-1" /> Delete
								</button>
							) : null}
						</div>
					</div>
				</div>
            </div>
        );
    }
}

PostCommentPartial.defaultProps = {
	showActions: false
}

PostCommentPartial.propTypes = {
	deletePostComment: PropTypes.func.isRequired,
	likePostComment: PropTypes.func,
	unlikePostComment: PropTypes.func,
	comment: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deletePostComment })(PostCommentPartial);
