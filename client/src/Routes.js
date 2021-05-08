import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import SignupNonProfit from './SignupNonProfit';
import SignupCitizen from './SignupCitizen';
import Signup from './Signup';

function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/signup">
				<Signup />
			</Route>
			<Route exact path="/signup_citizen">
				<SignupCitizen />
			</Route>
			<Route exact path="/signup_nonprofit">
				<SignupNonProfit />
			</Route>
		</Switch>
	);
}

export default Routes;
