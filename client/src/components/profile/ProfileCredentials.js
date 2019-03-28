import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCredentials extends Component {
	render() {
		const { education, experience } = this.props;
		const experienceItems = experience.map(exp => (
			<div key={exp._id} className="py-1">
				<h3 className="text-base font-bold text-grey-darkest py-1">{exp.company}</h3>
				<span className="inline-block w-full text-sm font-medium text-grey-darkest py-1">{exp.title}</span>
				<span className="inline-block w-full text-sm font-medium text-grey-darkest py-1">
					<Moment format="MMM YYYY">{exp.from}</Moment> –{' '}
					{exp.to === null ? (' Present') : (<Moment format="MMM YYYY">{exp.to}</Moment>)}
				</span>
				<span className="inline-block w-full text-sm font-medium text-grey-darkest py-1">
					{exp.location === '' ? null : `${exp.location}`}
				</span>
				<span className="inline-block w-full text-sm font-normal text-grey-darker whitespace-pre-line leading-normal py-1">{exp.description === '' ? null : exp.description}</span>
			</div>
		));

		const educationItems = education.map(edu => (
			<div key={edu._id} className="py-1">
				<h3 className="text-base font-bold text-grey-darkest py-1">{edu.school}</h3>
				<span className="inline-block w-full text-sm font-medium text-grey-darkest py-1">{edu.degree}</span>
				<span className="inline-block w-full text-sm font-medium text-grey-darkest py-1">
					<Moment format="MMM YYYY">{edu.from}</Moment> –{' '}
					{edu.to === null ? (' Present') : (<Moment format="MMM YYYY">{edu.to}</Moment>)}
				</span>
				<span className="inline-block w-full text-sm font-medium text-grey-darkest py-1">
					{edu.fieldofstudy}
				</span>
				<span className="inline-block w-full text-sm font-normal text-grey-darker whitespace-pre-line leading-normal py-1">{edu.description === '' ? null : edu.description}</span>
			</div>
		));

		return (
			<div className="profile-credentials">
				<div className="w-full mb-6 rounded-sm overflow-hidden border-2 bg-grey-lightest border-grey-lighter">
					<div className="p-4">
						<h2 className="font-bold text-xl mb-2">Experience</h2>
						<div>
							{experienceItems.length > 0 ? (
								<div className="experience-credentials text-sm text-grey-darker">
									{experienceItems}
								</div>
							) : (
								<div className="experience-credentials text-sm text-grey-darker">
									You haven't filled out this section yet.
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="w-full mb-6 rounded-sm overflow-hidden border-2 border-grey-lighter bg-grey-lightest">
					<div className="p-4">
						<h2 className="font-bold text-xl mb-2">Education</h2>
						<div>
							{educationItems.length > 0 ? (
								<div className="education-credentials text-sm text-grey-darker">
									{educationItems}
								</div>
							) : (
								<div className="education-credentials text-sm text-grey-darker">
									You haven't filled out this section yet.
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileCredentials;
