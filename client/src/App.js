import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Landing from './components/layout/Landing';
import RegisterLayout from './components/layout/auth/RegisterLayout';
import LoginLayout from './components/layout/auth/LoginLayout';
import DashboardLayout from './components/layout/dashboard/DashboardLayout';
import CreateProfileLayout from './components/layout/create-profile/CreateProfileLayout';
import EditProfileLayout from './components/layout/edit-profile/EditProfileLayout';
import AddExperienceLayout from './components/layout/add-credentials/AddExperienceLayout';
import AddEducationLayout from './components/layout/add-credentials/AddEducationLayout';
import ProfilesLayout from './components/layout/profiles/ProfilesLayout';
import ProfileLayout from './components/layout/profile/ProfileLayout';
import PostsLayout from './components/layout/posts/PostsLayout';
import PostLayout from './components/layout/post/PostLayout';
import NotFoundLayout from './components/layout/not-found/NotFoundLayout';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout User
		store.dispatch(logoutUser());
		// Clear current profile
		store.dispatch(clearCurrentProfile());
		// Redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App page">
						<Route exact path="/" component={Landing} />
						<Route exact path="/register" component={RegisterLayout} />
						<Route exact path="/login" component={LoginLayout} />
						<Route exact path="/profiles" component={ProfilesLayout} />
						<Route exact path="/profile/:handle" component={ProfileLayout} />
						<Switch>
							<PrivateRoute
								exact
								path="/dashboard"
								component={DashboardLayout}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/create-profile"
								component={CreateProfileLayout}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/edit-profile"
								component={EditProfileLayout}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/add-experience"
								component={AddExperienceLayout}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/add-education"
								component={AddEducationLayout}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/newsfeed"
								component={PostsLayout}
							/>
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/posts/:id"
								component={PostLayout}
							/>
						</Switch>
						<Route exact path="/not-found" component={NotFoundLayout} />
					</div>
				</Router>
			</Provider>
		);
	}
}
export default App;
