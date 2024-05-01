import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '4-store';
import RootLayout from './RootLayout';
import ProtectedContentLayout from './ProtectedContentLayout';
import RequireAuth from './RequireAuth';
import ErrorPage from './ErrorPage';
import RegisterScreen from '1-screens/RegisterScreen';
import LoginScreen from '1-screens/LoginScreen';
import WelcomeConnected from '1-screens/WelcomeConnected';
import { TransactionFormRoute } from '1-screens/TransactionFormConnected';
import HistoryConnected from '1-screens/HistoryConnected';

import './styles.css';

// check 
// / => login
//    before login
//    after login
// /login
// /register
// /123 => /history => /login => /history
// /123 => /history => /login => /history
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginScreen />,
      },
      {
        path: "register",
        element: <RegisterScreen />,
      },
      {
        // ? try with path="*" and without path
        path: "*",
        element: (
          <RequireAuth>
            <ProtectedContentLayout />
          </RequireAuth>
        ),
        children: [
          {
            path: "transaction",
            // element: <TransactionFormConnected navigateBack={() => navigate(-1)}/>,
            element: <TransactionFormRoute />,
          },
          {
            path: "history",
            element: <HistoryConnected />,
          },
          {
            path: "welcome",
            element: <WelcomeConnected />,
          },
          {
            path: "*",
            element: <Navigate to="/history" replace />,
          },
        ]
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
