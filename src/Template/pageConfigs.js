import HomePage from "./Pages/Home";
import Explore from "./Pages/Explore";
import Activity from "./Pages/Activity";
import Messenger from "./Pages/Messenger";
import Login from "./Pages/Accounts/Login";
import EmailSignup from "./Pages/Accounts/EmailSignup";
import PersonalPost from "./Pages/PersonalPage/PersonalPosts";
import PersonalSaved from "./Pages/PersonalPage/PersonalSaved";
import ResetPassword from "Template/Pages/Accounts/Password/Reset";
import EditProfile from "Template/Pages/Accounts/EditProfile";
import ChangePassword from "Template/Pages/Accounts/Password/Change";
import Followers from "Template/Pages/PersonalPage/WrapperPersonalPage/Profile/Follows/Followers";
import Following from "Template/Pages/PersonalPage/WrapperPersonalPage/Profile/Follows/Following";
import GoToPost from "Containers/GoToPost";

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
    path: "/p/:id/",
    component: GoToPost,
    exact: true
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
