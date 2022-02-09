import Home from './features/home/Home';
import AboutUs from './features/static/about/AboutUs';
import HowItWorks from './features/static/about/HowItWorks';
import OurStory from './features/static/about/OurStory';
import TrustAndSafety from './features/static/policy/TrustAndSafety';
import TermsOfService from './features/static/policy/TermsOfService';
import PrivacyPolicy from './features/static/policy/PrivacyPolicy';
import Login from './features/users/Auth/Login';
import Signup from './features/users/Auth/Signup';
import SignupCitizen from './features/users/Auth/SignupCitizen';
import SignupNonProfit from './features/users/Auth/SignupNonProfit';
import Inbox from './features/users/Inbox/Inbox';
import User from './features/users/User';
import ActionForm from './features/action/ActionForm';
import Assets from './features/action/assets/Assets';
import Asset from './features/action/assets/Asset';
import NeedForm from './features/action/needs/NeedForm';
import NeedFormGoods from './features/action/needs/NeedFormGoods';
import NeedFormVolunteers from './features/action/needs/NeedFormVolunteers';
import OfferForm from './features/action/offers/OfferForm';
import OfferFormGoods from './features/action/offers/OfferFormGoods';
import OfferFormSkills from './features/action/offers/OfferFormSkills';
import ContactUs from './features/support/ContactUs';
import Help from './features/support/Help';

const routes = {
  Home: {
    component: Home,
    path: '/',
  },
  AboutUs: {
    component: AboutUs,
    path: '/about-us',
  },
  HowItWorks: {
    component: HowItWorks,
    path: '/how-it-works',
  },
  OurStory: {
    component: OurStory,
    path: '/our-story',
  },
  TrustAndSafety: {
    component: TrustAndSafety,
    path: '/trust-and-safety',
  },
  TermsOfService: {
    component: TermsOfService,
    path: '/terms-of-service',
  },
  PrivacyPolicy: {
    component: PrivacyPolicy,
    path: '/privacy-policy',
  },
  Login: {
    component: Login,
    path: '/login',
  },
  Signup: {
    component: Signup,
    path: '/signup',
  },
  SignupCitizen: {
    component: SignupCitizen,
    path: '/signup-citizen',
  },
  SignupNonProfit: {
    component: SignupNonProfit,
    path: '/signup-nonprofit',
  },
  Inbox: {
    component: Inbox,
    path: '/inbox',
  },
  User: {
    component: User,
    path: '/users/:userId',
  },
  ActionForm: {
    component: ActionForm,
    path: '/action',
  },
  Assets: {
    component: Assets,
    path: '/assets',
  },
  Asset: {
    component: Asset,
    path: '/asset/:assetId',
  },
  NeedForm: {
    component: NeedForm,
    path: '/need',
  },
  NeedFormGoods: {
    component: NeedFormGoods,
    path: '/need/goods',
  },
  NeedFormVolunteers: {
    component: NeedFormVolunteers,
    path: '/need/volunteers',
  },
  OfferForm: {
    component: OfferForm,
    path: '/offer',
  },
  OfferFormGoods: {
    component: OfferFormGoods,
    path: '/offer/goods',
  },
  OfferFormSkills: {
    component: OfferFormSkills,
    path: '/offer/skills',
  },
  ContactUs: {
    component: ContactUs,
    path: '/contact-us',
  },
  Help: {
    component: Help,
    path: '/help',
  },
};

export default routes;
