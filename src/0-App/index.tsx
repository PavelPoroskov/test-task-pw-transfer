import React from 'react';
import { Provider } from 'react-redux';

import store from '4-store'
import SwitchScreen from "1-screens/SwitchScreen";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SwitchScreen />
    </Provider>
  );
}

export default App;
