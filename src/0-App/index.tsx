import React from 'react';
import { Provider } from 'react-redux';

import store from '4-store'
import MainScreen from "1-screens/MainScreen";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}

export default App;
