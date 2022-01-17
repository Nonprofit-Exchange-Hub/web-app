import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import SignupNonProfit from './SignupNonProfit';
import SignupCitizen from './SignupCitizen';
import Signup from './Signup';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import HowItWorks from './HowItWorks';
import TrustAndSafety from './TrustAndSafety';
import OurStory from './OurStory';
import Help from './Help';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import Assets from './Assets';
import Asset from './Asset';
import MessageInboxView from './MessageInboxView';
import NeedForm from './NeedForm';
import NeedFormGoods from './NeedFormGoods';
import NeedFormVolunteers from './NeedFormVolunteers';
import OfferForm from './OfferForm';
import OfferFormGoods from './OfferFormGoods';
import OfferFormVolunteers from './OfferFormVolunteers';
import ActionForm from './ActionForm';
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
      <Route exact path="/assets">
        <Assets />
      </Route>
      <Route exact path="/inbox">
        <MessageInboxView />
      </Route>
      <Route exact path="/asset/:assetId">
        <Asset />
      </Route>
      <Route exact path="/need">
        <NeedForm />
      </Route>
      <Route exact path="/need/goods/">
        <NeedFormGoods />
      </Route>
      <Route exact path="/need/volunteers/">
        <NeedFormVolunteers />
      </Route>
      <Route exact path="/offer">
        <OfferForm />
      </Route>
      <Route exact path="/offer/goods">
        <OfferFormGoods />
      </Route>
      <Route exact path="/offer/skills">
        <OfferFormVolunteers />
      </Route>
      <Route exact path="/action">
        <ActionForm />
      </Route>
      <Route exact path="/users/:userId">
        <UserProfile />
      </Route>
    </Switch>
  );
}

export default Routes;
