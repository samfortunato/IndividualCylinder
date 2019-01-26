import React from 'react';
import { Route } from 'react-router-dom';

import { AuthRoute } from '../util/route_util';

import NavHeader from './header/nav_header';
import SignUpFormContainer from './user_forms/sign_up_form_container';
import SignInFormContainer from './user_forms/sign_in_form_container';

import VideoWatchPageContainer from './videos/video_watch_page_container';

// test
// import VideoIndex from './videos/videos_index_test';

export default (props) => {
  return (
    <>
      <Route exact path="/" component={NavHeader} />
      <AuthRoute path="/signup" component={SignUpFormContainer} />
      <AuthRoute path="/signin" component={SignInFormContainer} />
      <Route path="/watch/:id" component={VideoWatchPageContainer} />

      {/* test */}
      {/* <Route path="/videos" component={VideoIndex} /> */}
    </>
  );
};
