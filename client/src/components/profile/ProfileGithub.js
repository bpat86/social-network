import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
			clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
			count: 4,
			sort: 'sorted asc',
			repos: []
		};
	}

	componentDidMount() {
		const { username } = this.props;
		const { count, sort, clientId, clientSecret } = this.state;

		fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
			.then(res => res.json())
			.then(data => {
				if (this.refs.github) {
					this.setState({ repos: data });
				}
			})
			.catch(err => console.log(err));
	}

    render() {
    	const { username } = this.props;
    	const { repos } = this.state;
    	const repoItems = repos.map(repo => (
			<div key={repo.id} className="w-full py-1">
				<div className="flex flex-col">
					<Link to={repo.html_url} className="text-sm text-indigo" target="_blank">{repo.name}</Link>
					<p className="text-grey-dark text-sm mt-1 mb-2">{repo.description ? repo.description : 'No description'}</p>
				</div>
			</div>
    	));

        return (
            <div className="profile-github">
				<div className="w-full mb-6 rounded-sm overflow-hidden border-2 border-grey-lighter bg-grey-lightest">
					<div className="p-4">
						<div className="font-bold text-xl mb-2">Github Activity</div>
						<div ref="github">
							{repoItems}
						</div>
					</div>
				</div>
            </div>
        );
    }
}

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired
}

export default ProfileGithub;
