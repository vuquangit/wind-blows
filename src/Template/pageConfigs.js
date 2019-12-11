// import Page404 from './Pages/404'
import HomePage from "./Pages/Home";
import PersonalPage from "./Pages/PersonalPage";
import Explore from "./Pages/Explore";
import Activity from "./Pages/Activity";
import Messenger from "./Pages/Messenger";
import Login from "./Pages/Accounts/Login";
import EmailSignup from "./Pages/Accounts/EmailSignup";
import ResetPassword from "Template/Pages/Accounts/Password/Reset";
import EditProfile from "Template/Pages/Accounts/EditProfile";
import ChangePassword from "Template/Pages/Accounts/Password/Change";

const pageConfigs = [
  {
    path: "/",
    component: HomePage,
    exact: true,
    private: true
  },
  {
    path: "/explore",
    component: Explore,
    exact: true,
    private: true
  },
  {
    path: "/messenger",
    component: Messenger,
    exact: true,
    private: true
  },
  {
    path: "/activity/",
    component: Activity,
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
    component: ResetPassword,
    exact: true
  },
  {
    path: "/accounts/edit/",
    component: EditProfile,
    exact: true
  },
  {
    path: "/:username",
    component: PersonalPage,
    exact: true,
    private: true
  }
];

export default pageConfigs;
