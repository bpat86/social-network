import axios from 'axios';
import {
	ADD_POST,
	GET_ERRORS,
	CLEAR_ERRORS,
	POST_LOADING,
	GET_POSTS,
	GET_POST,
	DELETE_POST
} from './types';

// Add Post
export const addPost = commentData => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/posts', commentData)
		.then(res =>
			dispatch({
				type: ADD_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// Get Posts
export const getPosts = (load = true) => dispatch => {
	if (load) dispatch(setPostLoading());
	axios
		.get('/api/posts')
		.then(res =>
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		);
}

// Get Post
export const getPost = (load = true, id) => dispatch => {
	if (load) dispatch(setPostLoading());
	axios
		.get(`/api/posts/${id}`)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POST,
				payload: null
			})
		);
}

// Delete post
export const deletePost = id => dispatch => {
	axios
		.delete(`/api/posts/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_POST,
				payload: id
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// Like a post
export const likePost = id => dispatch => {
	axios
		.post(`/api/posts/like/${id}`)
		.then(res => dispatch(getPosts(false)))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// Unlike a post
export const unlikePost = id => dispatch => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then(res => dispatch(getPosts(false)))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// Add Comment
export const addPostComment = (postId, commentData) => dispatch => {
	dispatch(clearErrors());
	axios
		.post(`/api/posts/comment/${postId}`, commentData)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// Delete Comment
export const deletePostComment = (postId, commentId) => dispatch => {
	axios
		.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// Set loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING
	}
}

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	}
}
