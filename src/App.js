import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import theme from './utilities/theme';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}

        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
            <PrivateRoute path="/">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

function PrivateRoute({ children, ...rest }) {
  const userState = useSelector(state => state.user);
  const { userInfo } = userState;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
