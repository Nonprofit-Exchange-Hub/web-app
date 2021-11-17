import * as React from 'react';
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
import TrustAndSafety from './TrustAndSafety';
import OurStory from './OurStory';
import Help from './Help';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import CookiePolicy from './CookiePolicy';
import Assets from './Assets';
import Asset from './Asset';
import MessageInboxView from './MessageInboxView';
import NeedForm from './NeedForm';
import NeedFormGoods from './NeedFormGoods';
import UserProfile from './UserProfile';


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
            <Route exact path="/contact_us">
                <ContactUs />
            </Route>
            <Route exact path="/our_story">
                <OurStory />
            </Route>
            <Route exact path="/trust_and_safety">
                <TrustAndSafety />
            </Route>
            <Route exact path="/help">
                <Help />
            </Route>
            <Route exact path="/terms_of_service">
                <TermsOfService />
            </Route>
            <Route exact path="/privacy_policy">
                <PrivacyPolicy />
            </Route>
            <Route exact path="/cookie_policy">
                <CookiePolicy />
            </Route>
            <Route exact path="/assets">
                <Assets />
            </Route>
            <Route exact path="/inbox">
                <MessageInboxView />
            </Route>
            <Route exact path="/asset/:assetId">
                <Asset />
            </Route>
            <Route exact path="/needs">
                <NeedForm />
            </Route>
            <Route exact path="/needs/goods/">
                <NeedFormGoods />
            </Route>
            <Route exact path="/users/:userId">
                <UserProfile />
            </Route>
        </Switch>
    );
}

export default Routes;
