import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
    return (
		<div className="profile-actions">
			<ul className="list-reset flex justify-between">
				<li className="mr-3">
					<Link
						to="/edit-profile"
						className="inline-block py-2 text-grey-darker"
						>
						<i className="fas fa-user-circle mr-1"/> Edit Profile
					</Link>
				</li>
				<li className="mr-3">
					<Link
						to="/add-experience"
						className="inline-block py-2 text-grey-darker"
						>
						<i className="fab fa-black-tie mr-1"/> Add Experience
					</Link>
				</li>
				<li className="mr-3">
					<Link
						to="/add-education"
						className="inline-block py-2 text-grey-darker"
						>
						<i className="fas fa-graduation-cap mr-1"/> Add Education
					</Link>
				</li>
			</ul>
		</div>
    );
};

export default ProfileActions;
