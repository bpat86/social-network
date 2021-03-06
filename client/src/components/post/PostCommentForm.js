import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPostComment } from '../../actions/postActions';

class PostCommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errors: {}
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit = (e) => {
		e.preventDefault();

		const { user } = this.props.auth;
		const { postId } = this.props;
		const newPostComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};

		this.props.addPostComment(postId, newPostComment);
		this.setState({ text: '', errors: {} });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors })
		}
	}

    render() {
    	const { errors } = this.state;

        return (
			<div>
				<form onSubmit={this.onSubmit}>
					<TextAreaFieldGroup
						placeholder="Add a Comment"
						name="text"
						value={this.state.text}
						onChange={this.onChange}
						error={errors.text}
					/>
					<div className="flex items-center justify-between mt-8">
						<button
							className="bg-indigo-dark text-grey-lightest bg-transparent rounded font-medium text-center leading-tight h-12 m-0 px-4 py-2 cursor-pointer focus:outline-none"
							type="submit"
							>
							Submit <span className="ml-1">→</span>
						</button>
					</div>
				</form>
			</div>
        );
    }
}

PostCommentForm.propTypes = {
	addPostComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { addPostComment })(PostCommentForm);
