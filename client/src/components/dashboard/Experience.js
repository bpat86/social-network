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
    	const { experience } = this.props;
    	const workHistory = experience.map(exp => (
			<div key={exp._id} className="mb-4 py-3 border-t border-grey-lighter">
				<h3 className="text-lg font-bold text-grey-darkest py-1">{exp.title}</h3>
				<span className="inline-block w-full text-md font-medium text-grey-darkest py-1">{exp.company}</span>
				<span className="inline-block w-full text-sm font-normal text-grey-darker py-1">
					<Moment format="MMM YYYY">{exp.from}</Moment> –{' '}
					{exp.to === null ? (' Present') : (<Moment format="MMM YYYY">{exp.to}</Moment>)}
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
    	const noContentToDisplay = (<p>You haven't filled out this section yet.</p>);

        return (
            <div className="experience">
				<h2 className="my-4 mt-6">Experience</h2>
				<div className="text-grey-darker">
					{experience.length ? workHistory : noContentToDisplay}
				</div>
            </div>
        );
    }
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
