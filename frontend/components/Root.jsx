import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

export default (props) => {
  return (
    <Provider store={props.store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};
