import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home/Home';
import AboutUs from './static/about/AboutUs';
import HowItWorks from './static/about/HowItWorks';
import OurStory from './static/about/OurStory';
import TrustAndSafety from './static/policy/TrustAndSafety';
import TermsOfService from './static/policy/TermsOfService';
import PrivacyPolicy from './static/policy/PrivacyPolicy';
import Login from './users/Auth/Login';
import Signup from './users/Auth/Signup';
import SignupCitizen from './users/Auth/SignupCitizen';
import SignupNonProfit from './users/Auth/SignupNonProfit';
import Inbox from './users/Inbox/Inbox';
import User from './users/User';
import ActionForm from './action/ActionForm';
import Assets from './action/assets/Assets';
import Asset from './action/assets/Asset';
import NeedForm from './action/needs/NeedForm';
import NeedFormGoods from './action/needs/NeedFormGoods';
import NeedFormVolunteers from './action/needs/NeedFormVolunteers';
import OfferForm from './action/offers/OfferForm';
import OfferFormGoods from './action/offers/OfferFormGoods';
import OfferFormSkills from './action/offers/OfferFormSkills';
import ContactUs from './support/ContactUs';
import Help from './support/Help';

function Routes() {
  return (
    <main>
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
        <Route exact path="/inbox" component={Inbox} />
        <Route exact path="/users/:userId" component={User} />

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
        <Route exact path="/offer/skills" component={OfferFormSkills} />

        {/* support */}
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/help" component={Help} />
      </Switch>
    </main>
  );
}

export default Routes;
