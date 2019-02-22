import * as SearchAPIUtil from '../util/search_api_util';

export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const RECEIVE_SEARCH_ERRORS = 'RECEIVE_SEARCH_ERRORS';

export const searchVideos = (searchTerms) => (dispatch) => {
  return SearchAPIUtil.searchVideos(searchTerms)
    .then(
      results => dispatch(receiveSearchResults(results)),
      errors => dispatch(receiveSearchErrors(errors))
    );
};

export const receiveSearchResults = (results) => {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    results
  };
};

export const receiveSearchErrors = (errors) => {
  return {
    type: RECEIVE_SEARCH_ERRORS,
    errors
  };
};
