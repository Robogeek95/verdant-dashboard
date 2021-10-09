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
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}

        <Router>
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
