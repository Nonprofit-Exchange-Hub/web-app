import Home from './views/Home';
import AboutUs from './views/AboutUs';
import HowItWorks from './views/HowItWorks';
import OurStory from './views/OurStory';
import TrustAndSafety from './views/TrustAndSafety';
import TermsOfService from './views/TermsOfService';
import PrivacyPolicy from './views/PrivacyPolicy';
import Login from './components/Users/Auth/Login';
import Signup from './components/Users/Auth/Signup';
import SignupCitizen from './components/Users/Auth/SignupCitizen';
import SignupNonProfit from './components/Users/Auth/SignupNonProfit';
import Inbox from './components/Users/Inbox/Inbox';
import User from './components/Users/User';
import ActionForm from './views/ActionForm';
import AssetsView from './views/AssetsView';
import Asset from './views/Asset';
import NeedForm from './views/NeedForm';
import NeedFormGoods from './views/NeedFormGoods';
import NeedFormVolunteers from './views/NeedFormVolunteers';
import OfferForm from './views/OfferForm';
import OfferFormGoods from './views/OfferFormGoods';
import OfferFormSkills from './views/OfferFormSkills';
import ContactUs from './views/ContactUs';
import Help from './views/Help';
import ForgotPassword from './components/Users/Auth/ForgotPassword';
import SetNewPassword from './components/Users/Auth/SetNewPassword';

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
  ForgotPassword: {
    component: ForgotPassword,
    path: '/forgot-password',
  },
  SetNewPassword: {
    component: SetNewPassword,
    path: '/set-new-password',
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
    component: AssetsView,
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
