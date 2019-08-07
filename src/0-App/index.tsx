import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '4-store';
import RootLayout from '5-components/RootLayout';
import ProtectedRoute from './ProtectedRoute';
import RegisterScreen from '1-screens/RegisterScreen';
import LoginScreen from '1-screens/LoginScreen';
import Header from '1-screens/Header';
import WelcomeConnected from '1-screens/WelcomeConnected';
import TransactionFormConnected from '1-screens/TransactionFormConnected';
import HistoryConnected from '1-screens/HistoryConnected';

import './styles.css';

const Content: React.FC = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/transaction" component={TransactionFormConnected} />
        <Route path="/history" component={HistoryConnected} />
        <Route path="/welcome" component={WelcomeConnected} />
        <Redirect to="/history" />
      </Switch>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RootLayout>
        <Router>
          <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <ProtectedRoute path="/" component={Content} />
          </Switch>
        </Router>
      </RootLayout>
    </Provider>
  );
};

export default App;
