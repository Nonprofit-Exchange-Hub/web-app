import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import SignupNonProfit from './SignupNonProfit';
import SignupCitizen from './SignupCitizen';
import Signup from './Signup';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import LibraryAndForum from './LibraryAndForum';
import HowItWorks from './HowItWorks';


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
			<Route exact path="/about_us">
				<AboutUs />
			</Route>
			<Route exact path="/how_it_works">
				<HowItWorks />
			</Route>
			<Route exact path="/library_and_forum">
				<LibraryAndForum />
			</Route>
			<Route exact path="/contact_us">
				<ContactUs />
			</Route>
		</Switch>
	);
}

export default Routes;
