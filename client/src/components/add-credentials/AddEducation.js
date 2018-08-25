import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			degree: '',
			fieldofstudy: '',
			from: '',
			to: '',
			description: '',
			errors: {},
			disabled: false
		};
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onCheck = (e) => {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onSubmit= (e) => {
		e.preventDefault();

		const educationData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};

		this.props.addEducation(educationData, this.props.history);
	}

    render() {
    	const { errors } = this.state;

        return (
            <div className="add-education">
				<Link to="/dashboard" title="Go Back" className="inline-block text-indigo-dark text-center font-medium text-sm md:text-base leading-inherit m-0 mb-4 cursor-pointer focus:outline-none"><span className="mr-1">←</span> Go back</Link>
				<h1 className="my-4">Add Education</h1>
				<p className="text-grey-darker">Add a school or university that you have attended.</p>
				<form onSubmit={this.onSubmit}>
					<TextFieldGroup
						placeholder="* School"
						name="school"
						value={this.state.school}
						onChange={this.onChange}
						error={errors.school}
					/>
					<TextFieldGroup
						placeholder="* Degree or Certification"
						name="degree"
						value={this.state.degree}
						onChange={this.onChange}
						error={errors.degree}
					/>
					<TextFieldGroup
						placeholder="* Field of study"
						name="fieldofstudy"
						value={this.state.fieldofstudy}
						onChange={this.onChange}
						error={errors.fieldofstudy}
					/>
					<h6>From Date</h6>
					<TextFieldGroup
						placeholder="* From"
						name="from"
						type="date"
						value={this.state.from}
						onChange={this.onChange}
						error={errors.from}
					/>
					<h6>To Date</h6>
					<TextFieldGroup
						placeholder="* To"
						name="to"
						type="Date"
						value={this.state.to}
						onChange={this.onChange}
						error={errors.to}
						disabled={this.state.disabled ? 'disabled' : ''}
					/>
					<div className="flex items-center justify-between my-8">
						<label
							htmlFor="current"
							className="md:w-2/3 block text-grey-darker hover:text-black font-medium"
							>
							<input
								id="current"
								className="mr-2 leading-tight"
								type="checkbox"
								name="current"
								value={this.state.current}
								checked={this.state.current}
								onChange={this.onCheck}
							/>
							<span className="text-sm">Current</span>
						</label>
					</div>
					<TextAreaFieldGroup
						placeholder="Program Description"
						name="description"
						value={this.state.description}
						onChange={this.onChange}
						error={errors.description}
						info="Tell us about the program you were in."
					/>
					<input
						className="bg-indigo-dark text-grey-lightest bg-transparent rounded font-medium text-center leading-tight h-12 m-0 px-4 py-2 cursor-pointer focus:outline-none"
						value="Submit"
						type="submit"
					/>
				</form>
            </div>
        );
    }
}

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
