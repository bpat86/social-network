import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
	onDelete = id => {
		this.props.deleteEducation(id);
	}

    render() {
    	const { education } = this.props;
    	const educationHistory = education.map(edu => (
			<div key={edu._id}>
				<h3 className="text-lg font-bold text-grey-darkest py-1">{edu.degree}</h3>
				<span className="inline-block w-full text-md font-medium text-grey-darkest py-1">{edu.school}</span>
				<span className="inline-block w-full text-sm font-normal text-grey-darker py-1">
					<Moment format="MMM YYYY">{edu.from}</Moment> –{' '}
					{edu.to === null ? (' Present') : (<Moment format="MMM YYYY">{edu.to}</Moment>)}
				</span>
				<span className="inline-block w-full text-sm font-normal text-grey-darker whitespace-pre-line leading-normal py-1">{edu.description}</span>
				<button
					className="text-grey-darker text-sm font-medium leading-tight cursor-pointer mt-4"
					onClick={() => this.onDelete(edu._id)}
					>
					<i className="fas fa-trash text-xs mr-1"></i> Delete
				</button>
			</div>
    	));
    	const noContentToDisplay = (<p>You haven't filled out this section yet.</p>);

        return (
            <div className="education">
				<h2 className="my-4 mt-8">Education</h2>
				<div className="text-grey-darker">
					{education.length ? educationHistory : noContentToDisplay}
				</div>
            </div>
        );
    }
}

Education.propTypes = {
	deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
