import React from 'react';
import { Provider } from 'react-redux';

import store from '4-store'
import SwitchScreen from "1-screens/SwitchScreen";
import RootLayout from "5-components/RootLayout";

import './styles.css'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RootLayout>
        <SwitchScreen />
      </RootLayout>
    </Provider>
  );
}

export default App;
