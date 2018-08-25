import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {}
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit = (e) => {
		e.preventDefault();

		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		}

		this.props.createProfile(profileData, this.props.history);
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

    render() {
    	const { errors, displaySocialInputs } = this.state;

    	let socialInputs;

    	if (displaySocialInputs) {
			socialInputs = (
				<div className="mb-8">
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder="Facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="LinkedIn Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
					<InputGroup
						placeholder="YouTube Channel URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					<InputGroup
						placeholder="Instagram Profile URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			);
    	}

    	// Select options for status
		const options = [
			{label: 'Select Professional Status', value: 0 },
			{label: 'Developer', value: 'Developer' },
			{label: 'Junior Developer', value: 'Junior Developer' },
			{label: 'Senior Developer', value: 'Senior Developer' },
			{label: 'Student or Learning', value: 'Student or Learning' },
			{label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{label: 'Intern', value: 'Intern' },
			{label: 'Other', value: 'Other' }
		];

        return (
			<div className="create-profile">
				<Link to="/dashboard" title="Go Back" className="inline-block text-indigo-dark text-center font-medium text-sm md:text-base leading-inherit m-0 mb-4 cursor-pointer focus:outline-none"><span className="mr-1">←</span> Go back</Link>
				<h1 className="my-4">Create your profile</h1>
				<p className="text-grey-darker">Lets get your information for your profile.</p>
				<form onSubmit={this.onSubmit}>
					<TextFieldGroup
						placeholder="Profile Handle"
						name="handle"
						value={this.state.handle}
						onChange={this.onChange}
						error={errors.handle}
						info="A unique handle for your profile URL"
					/>
					<SelectListGroup
						placeholder="Status"
						name="status"
						value={this.state.status}
						onChange={this.onChange}
						options={options}
						error={errors.status}
						info="Where are you professionally?"
					/>
					<TextFieldGroup
						placeholder="Company"
						name="company"
						value={this.state.company}
						onChange={this.onChange}
						error={errors.company}
						info="Could be your own company or one you work for"
					/>
					<TextFieldGroup
						placeholder="Website"
						name="website"
						value={this.state.website}
						onChange={this.onChange}
						error={errors.website}
						info="Could be your own website or a company website"
					/>
					<TextFieldGroup
						placeholder="Location"
						name="location"
						value={this.state.location}
						onChange={this.onChange}
						error={errors.location}
						info="City and state suggested (eg: Phoenix, AZ)"
					/>
					<TextFieldGroup
						placeholder="Skills"
						name="skills"
						value={this.state.skills}
						onChange={this.onChange}
						error={errors.skills}
						info="Please use comma separated values (eg: HTML,CSS,Javascript,PHP,etc...)"
					/>
					<TextFieldGroup
						placeholder="Github Username"
						name="githubusername"
						value={this.state.githubusername}
						onChange={this.onChange}
						error={errors.githubusername}
						info="If you want your latest Repos and Github link,include your username"
					/>
					<TextAreaFieldGroup
						placeholder="Short Bio"
						name="bio"
						value={this.state.bio}
						onChange={this.onChange}
						error={errors.bio}
						info="Tell us a little about yourself"
					/>
					<div className="my-6">
						<button
							type="button"
							onClick={() => {
								this.setState(prevState => ({
									displaySocialInputs: !prevState.displaySocialInputs
								}))
							}}
							className="text-grey-darkest font-medium focus:outline-none"
							>
							Add Social Network Links
							<span className="ml-1">→</span>
						</button>
						<span className="ml-4 text-grey text-sm">Optional</span>
					</div>
					{socialInputs}
					<input type="submit" value="Submit" className="bg-indigo-dark text-grey-lightest bg-transparent rounded font-medium text-center leading-tight h-12 m-0 px-4 py-2 cursor-pointer focus:outline-none"/>
				</form>
			</div>
        );
    }
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
