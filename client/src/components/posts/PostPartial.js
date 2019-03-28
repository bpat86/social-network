import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pluralize from 'react-pluralize';
import Moment from 'react-moment';
import { deletePost, likePost, unlikePost } from '../../actions/postActions';

class PostPartial extends Component {
	onDelete = id => {
		this.props.deletePost(id);
	}

	likePost = id => {
		this.props.likePost(id);
	}

	unlikePost = id => {
		this.props.unlikePost(id);
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
    	const { post, auth, showActions } = this.props;

        return (
			<div className="post-partial rounded-sm overflow-hidden border-2 border-grey-lighter bg-white my-8">
				<div className="w-full flex p-4">
					<div className="flex items-start w-16 h-16">
						<img className="max-w-full h-auto rounded-full" src={post.avatar} alt={post.name} />
					</div>
					<div className="flex flex-col w-full justify-between leading-normal pl-4">
						<div className="mb-2">
							<div className="text-black font-bold text-xl">{post.name}</div>
							<Moment className="block text-grey-dark font-medium text-xs mb-4" fromNow>
				                {post.date}
				            </Moment>
							<p className="text-grey-darker text-base">{post.text}</p>
							{showActions ?
								<div
									className="text-grey-dark font-medium text-sm mt-8"
									>
									<Pluralize
										singular="like"
										plural="likes"
										count={post.likes.length}
										zero={"0 likes"}
									/>
								</div> : null}
						</div>
						{showActions ? <span><div className="flex items-center justify-around pt-4 border-t border-grey-lighter">
							{
								this.userHasLiked(post.likes) ?
								(<button
								type="button"
								className="text-grey-dark hover:text-indigo-dark focus:outline-none"
								onClick={() => this.unlikePost(post._id)}
								>
								<i className='fas fa-thumbs-up text-indigo-dark mr-1' /> Likes
							</button>) :
								(<button
								type="button"
								className="text-grey-dark hover:text-indigo-dark focus:outline-none"
								onClick={() => this.likePost(post._id)}
								>
								<i className='far fa-thumbs-up text-indigo-dark mr-1' /> Likes
							</button>)
							}
							<Link
								to={`/posts/${post._id}`}
								className="text-grey-dark hover:text-indigo-dark focus:outline-none"
								>
								<i className="far fa-comment-alt mr-1" /> Comments
							</Link>
						</div>
						<div className="flex items-center justify-center text-grey-dark">
							{post.user === auth.user.id ? (
								<button
									type="button"
									onClick={() => this.onDelete(post._id)}
									className="hover:text-red"
									>
									<i className="fas fa-times mr-1" /> Delete
								</button>
							) : null}
						</div></span> : null}
					</div>
				</div>
            </div>
        );
    }
}

PostPartial.defaultProps = {
	showActions: true
}

PostPartial.propTypes = {
	deletePost: PropTypes.func.isRequired,
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(PostPartial);
