import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
	onDelete = id => {
		this.props.deleteExperience(id);
	}

    render() {
    	const experience = this.props.experience.map(exp => (
			<div key={exp._id}>
				<h3 className="text-xl font-bold text-grey-darkest py-1">{exp.title}</h3>
				<span className="inline-block w-full text-lg font-medium text-grey-darkest py-1">{exp.company}</span>
				<span className="inline-block w-full text-sm font-normal text-grey-darker py-1">
					<Moment format="MMM YYYY">{exp.from}</Moment> –{' '}
					{exp.to === null ? (' Present') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
				</span>
				<span className="inline-block w-full text-sm font-normal text-grey-darker whitespace-pre-line leading-normal py-1">{exp.description}</span>
				<button
					className="text-grey-darker text-sm font-medium leading-tight cursor-pointer mt-4"
					onClick={() => this.onDelete(exp._id)}
					>
					<i className="fas fa-trash text-xs mr-1"></i> Delete
				</button>
			</div>
    	));

        return (
            <div className="experience">
				<h1 className="my-4 mt-6">Experience</h1>
				{experience}
            </div>
        );
    }
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
