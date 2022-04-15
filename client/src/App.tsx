import 'external-svg-loader';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { Apps } from './components/Apps/Apps';
import { Bookmarks } from './components/Bookmarks/Bookmarks';
import { Home } from './components/Home/Home';
import { NotificationCenter } from './components/NotificationCenter/NotificationCenter';
import { Settings } from './components/Settings/Settings';
import NotFound from './NotFound';
import { actionCreators, store } from './store';
import { autoLogin, getConfig } from './store/action-creators';
import { State } from './store/reducers';
import { checkVersion, decodeToken, parsePABToTheme } from './utility';

// Redux
// Utils
// Routes
// Get config
store.dispatch<any>(getConfig());

// Validate token
if (localStorage.token) {
  store.dispatch<any>(autoLogin());
}

export const App = (): JSX.Element => {
  const { config, loading } = useSelector((state: State) => state.config);

  const dispath = useDispatch();
  const { fetchQueries, setTheme, logout, createNotification, fetchThemes } =
    bindActionCreators(actionCreators, dispath);

  useEffect(() => {
    // check if token is valid
    const tokenIsValid = setInterval(() => {
      if (localStorage.token) {
        const expiresIn = decodeToken(localStorage.token).exp * 1000;
        const now = new Date().getTime();

        if (now > expiresIn) {
          logout();
          createNotification({
            title: 'Info',
            message: 'Session expired. You have been logged out',
          });
        }
      }
    }, 1000);

    // load themes
    fetchThemes();

    // set user theme if present
    if (localStorage.theme) {
      setTheme(parsePABToTheme(localStorage.theme));
    }

    // check for updated
    checkVersion();

    // load custom search queries
    fetchQueries();

    return () => window.clearInterval(tokenIsValid);
  }, []);

  // If there is no user theme, set the default one
  useEffect(() => {
    if (!loading && !localStorage.theme) {
      setTheme(parsePABToTheme(config.defaultTheme), false);
    }
  }, [loading]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/applications" component={Apps} />
          <Route path="/bookmarks" component={Bookmarks} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      <NotificationCenter />
    </>
  );
};
