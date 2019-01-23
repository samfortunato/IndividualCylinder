import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './App';

export default (props) => {
  return (
    <Provider store={props.store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  );
};
