import HomePage from "./Pages/Home";
import Login from "./Pages/Accounts/Login";
import EmailSignup from "./Pages/Accounts/Signup";
import PersonalPost from "./Pages/PersonalPage/PersonalPosts";
import PersonalSaved from "./Pages/PersonalPage/PersonalSaved";
import ForgotPassword from "Template/Pages/Accounts/Password/Forgot";
import ResetPassword from "Template/Pages/Accounts/Password/Reset";
import EditProfile from "Template/Pages/Accounts/EditProfile";
import ChangePassword from "Template/Pages/Accounts/Password/Change";
import Followers from "Template/Pages/Follower";
import Following from "Template/Pages/Following";
import GoToPost from "Template/Pages/GoToPost";
import Notifications from "Template/Pages/Notifications";
import Suggested from "Template/Pages/Explore/Suggestion/Suggested";
import Search from "Template/Pages/Search";
import PricacyAndSecurity from "Template/Pages/Accounts/PrivacyAndSecurity";
import TemporaryDisableAccount from "Template/Pages/Accounts/Remove";
import About from "Template/Pages/About/Home";
import AboutMe from "Template/Pages/About/AboutMe";

const pageConfigs = [
  {
    path: "/",
    component: HomePage,
    exact: true,
    private: true
  },
  {
    path: "/notifications/",
    component: Notifications,
    exact: true,
    private: true
  },
  {
    path: "/accounts/login/",
    component: Login,
    exact: true
  },
  {
    path: "/accounts/emailsignup/",
    component: EmailSignup,
    exact: true
  },
  {
    path: "/accounts/password/change/",
    component: ChangePassword,
    exact: true
  },
  {
    path: "/accounts/password/reset/",
    component: ForgotPassword,
    exact: true
  },
  {
    path: "/accounts/password/reset/:token",
    component: ResetPassword,
    exact: true
  },
  {
    path: "/accounts/edit/",
    component: EditProfile,
    exact: true,
    private: true
  },
  {
    path: "/accounts/privacy_and_security/",
    component: PricacyAndSecurity,
    exact: true,
    private: true
  },
  {
    path: "/accounts/remove/request/temporary/",
    component: TemporaryDisableAccount,
    exact: true,
    private: true
  },
  {
    path: "/explore/people/suggested/",
    component: Suggested,
    exact: true,
    private: true
  },
  {
    path: "/explore/people/search/",
    component: Search,
    exact: true
  },
  {
    path: "/the-wind-blows/about",
    component: About,
    exact: true
  },
  {
    path: "/the-wind-blows/about-me",
    component: AboutMe,
    exact: true
  },
  {
    path: "/p/:id/",
    component: GoToPost,
    exact: false
  },
  {
    path: "/:username/",
    component: PersonalPost,
    exact: true,
    private: true
  },
  {
    path: "/:username/saved",
    component: PersonalSaved,
    exact: true,
    private: true
  },
  {
    path: "/:username/followers/",
    component: Followers,
    exact: true,
    private: true
  },
  {
    path: "/:username/following/",
    component: Following,
    exact: true,
    private: true
  }
];

export default pageConfigs;
