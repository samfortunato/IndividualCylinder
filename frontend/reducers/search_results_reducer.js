import merge from 'lodash/merge';

import { RECEIVE_SEARCH_RESULTS } from '../actions/search_actions';

const searchResultsReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return action.results.search_results;
  
    default:
      return currentState;
  }
};

export default searchResultsReducer;
