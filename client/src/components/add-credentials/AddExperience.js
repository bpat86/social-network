import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: '',
			title: '',
			location: '',
			from: '',
			to: '',
			current: false,
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

		const experienceData = {
			company: this.state.company,
			title: this.state.title,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};

		this.props.addExperience(experienceData, this.props.history);
	}

    render() {
    	const { errors } = this.state;

        return (
            <div className="add-experience">
				<Link to="/dashboard" title="Go Back" className="inline-block text-indigo-dark text-center font-medium text-sm md:text-base leading-inherit m-0 mb-4 cursor-pointer focus:outline-none"><span className="mr-1">←</span> Go back</Link>
				<h1 className="my-4">Add Experience</h1>
				<p className="text-grey-darker">Add any job or position you have had in the past or current.</p>
				<form onSubmit={this.onSubmit}>
					<TextFieldGroup
						placeholder="* Company"
						name="company"
						value={this.state.company}
						onChange={this.onChange}
						error={errors.company}
					/>
					<TextFieldGroup
						placeholder="* Job Title"
						name="title"
						value={this.state.title}
						onChange={this.onChange}
						error={errors.title}
					/>
					<TextFieldGroup
						placeholder="* Location"
						name="location"
						value={this.state.location}
						onChange={this.onChange}
						error={errors.location}
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
						placeholder="Job Description"
						name="description"
						value={this.state.description}
						onChange={this.onChange}
						error={errors.description}
						info="Tell us about your role in the company"
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

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));
