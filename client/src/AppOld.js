import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';

import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

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
						<NavBar />
						<div className="content flex items-center mt-12">
							<Route exact path="/" component={Landing} />
							<div className="w-full max-w-screen-xl relative mx-auto px-4">
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								<Switch>
									<PrivateRoute
										exact
										path="/dashboard"
										component={Dashboard}
									/>
								</Switch>
								<Switch>
									<PrivateRoute
										exact
										path="/create-profile"
										component={CreateProfile}
									/>
								</Switch>
								<Switch>
									<PrivateRoute
										exact
										path="/edit-profile"
										component={EditProfile}
									/>
								</Switch>
							</div>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}
export default App;
