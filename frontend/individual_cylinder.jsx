import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store';
import Root from './components/Root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');
  let store;

  if (window.currentUser) {
    const preloadedState = {
      users: {
        [window.currentUser.id]: window.currentUser
      },
      session: {
        id: window.currentUser.id
      }
    };

    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // TEST -- REMOVE LATER
  window.getState = store.getState;
  // TEST -- REMOVE LATER

  ReactDOM.render(<Root store={store}/>, root);
});
