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
      <Route exact path="/" component={Home} />

      {/* static */}
      {/* static: about */}
      <Route exact path="/about-us" component={AboutUs} />
      <Route exact path="/how-it-works" component={HowItWorks} />
      <Route exact path="/our-story" component={OurStory} />

      {/* static: policy */}
      <Route exact path="/trust-and-safety" component={TrustAndSafety} />
      <Route exact path="/terms-of-service" component={TermsOfService} />
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />

      {/* users */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signup-citizen" component={SignupCitizen} />
      <Route exact path="/signup-nonprofit" component={SignupNonProfit} />
      <Route exact path="/inbox" component={MessageInboxView} />
      <Route exact path="/users/:userId" component={UserProfile} />

      {/* action */}
      <Route exact path="/action" component={ActionForm} />

      {/* action: assets */}
      <Route exact path="/assets" component={Assets} />
      <Route exact path="/asset/:assetId" component={Asset} />

      {/* action: needs */}
      <Route exact path="/need" component={NeedForm} />
      <Route exact path="/need/goods/" component={NeedFormGoods} />
      <Route exact path="/need/volunteers/" component={NeedFormVolunteers} />

      {/* action: offers */}
      <Route exact path="/offer" component={OfferForm} />
      <Route exact path="/offer/goods" component={OfferFormGoods} />
      <Route exact path="/offer/skills" component={OfferFormVolunteers} />

      {/* support */}
      <Route exact path="/contact-us" component={ContactUs} />
      <Route exact path="/help" component={Help} />
    </Switch>
  );
}

export default Routes;
