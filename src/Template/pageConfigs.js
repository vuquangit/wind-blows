// import Page404 from './Pages/404'
import HomePage from './Pages/Home';
import PersonalPage from './Pages/PersonalPage';
import Explore from './Pages/Explore';
import Activity from './Pages/Activity';
import Messenger from './Pages/Messenger';
import Login from './Pages/Login';

const pageConfigs = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    private: true
  },
  {
    path: '/explore',
    component: Explore,
    exact: true,
    private: true
  },
  {
    path: '/messenger',
    component: Messenger,
    exact: true,
    private: true
  },
  {
    path: '/activity',
    component: Activity,
    exact: true,
    private: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/:username',
    component: PersonalPage,
    exact: true,
    private: true
  }
]

export default pageConfigs
