// import Page404 from './Pages/404'
import HomePage from "./Pages/Home";
import PersonalPage from "./Pages/PersonalPage";
import Explore from "./Pages/Explore";
import Activity from "./Pages/Activity";
import Messenger from "./Pages/Messenger";

const pageConfigs = [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    path: "/explore",
    component: Explore,
    exact: true
  },
  {
    path: "/messenger",
    component: Messenger,
    exact: true
  },
  {
    path: "/activity",
    component: Activity,
    exact: true
  },
  {
    path: "/:username",
    component: PersonalPage,
    exact: true
  }
];

export default pageConfigs;
