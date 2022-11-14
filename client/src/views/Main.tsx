import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import routes from '../routes';

function Main() {
  return (
    <main>
      <Routes>
        <Route path={routes.Home.path}>
          <Route index element={routes.Home.component} />

          {/* static */}
          {/* static: about */}
          <Route path={routes.AboutUs.path} element={routes.AboutUs.component} />
          <Route path={routes.HowItWorks.path} element={routes.HowItWorks.component} />
          <Route path={routes.OurStory.path} element={routes.OurStory.component} />

          {/* static: policy */}
          <Route path={routes.TrustAndSafety.path} element={routes.TrustAndSafety.component} />
          <Route path={routes.TermsOfService.path} element={routes.TermsOfService.component} />
          <Route path={routes.PrivacyPolicy.path} element={routes.PrivacyPolicy.component} />
          <Route path={routes.CookiePolicy.path} element={routes.CookiePolicy.component} />

          {/* users */}
          <Route path={routes.Login.path} element={routes.Login.component} />
          <Route path={routes.ForgotPassword.path} element={routes.ForgotPassword.component} />
          <Route path={routes.SetNewPassword.path} element={routes.SetNewPassword.component} />
          <Route path={routes.Signup.path} element={routes.Signup.component} />
          <Route path={routes.SignupCitizen.path} element={routes.SignupCitizen.component} />
          <Route path={routes.SignupNonProfit.path} element={routes.SignupNonProfit.component} />
          <Route path={routes.Inbox.path} element={routes.Inbox.component} />
          <Route path={routes.User.path} element={routes.User.component} />

          {/* action */}
          <Route path={routes.ActionForm.path} element={routes.ActionForm.component} />

          {/* action: assets */}
          <Route path={routes.Assets.path} element={routes.Assets.component} />
          <Route path={routes.Asset.path} element={routes.Asset.component} />

          {/* action: needs */}
          <Route path={routes.NeedForm.path}>
            <Route index element={routes.NeedForm.component} />
            <Route path={routes.NeedFormGoods.path} element={routes.NeedFormGoods.component} />
            <Route
              path={routes.NeedFormVolunteers.path}
              element={routes.NeedFormVolunteers.component}
            />
          </Route>

          {/* action: offers */}
          <Route path={routes.OfferForm.path}>
            <Route index element={routes.OfferForm.component} />
            <Route path={routes.OfferFormGoods.path} element={routes.OfferFormGoods.component} />
            <Route path={routes.OfferFormSkills.path} element={routes.OfferFormSkills.component} />
          </Route>

          {/* support */}
          <Route path={routes.ContactUs.path} element={routes.ContactUs.component} />
          <Route path={routes.Help.path} element={routes.Help.component} />
          <Route path={routes.TempChat.path} element={routes.TempChat.component} />
        </Route>
      </Routes>
    </main>
  );
}

export default Main;
