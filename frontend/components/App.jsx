import React from 'react';
import { Route } from 'react-router-dom';

import {
  LoggedInAuthRoute,
  LogInAuthRoute
} from '../util/route_util';

import SignUpFormContainer from './user_forms/sign_up_form_container';
import SignInFormContainer from './user_forms/sign_in_form_container';
import SearchResultsPage from './search/search_results_page';

import VideosIndexContainer from './videos/videos_index/videos_index_container';
import VideoWatchPageContainer from './videos/video_show/video_watch_page_container';
import VideoUploadPage from './videos/video_upload/video_upload_page';
import VideoEditPageContainer from './videos/video_edit/video_edit_page_container';

import Channel from './channels/channel';

export default () => {
  return (
    <>
      <Route exact path="/" component={VideosIndexContainer} />
      <LoggedInAuthRoute path="/signup" component={SignUpFormContainer} />
      <LoggedInAuthRoute path="/signin" component={SignInFormContainer} />

      <Route path="/results" component={SearchResultsPage} />
      
      <Route path="/watch/:id" component={VideoWatchPageContainer} />
      <LogInAuthRoute path="/upload" component={VideoUploadPage} />
      <LogInAuthRoute path="/video/:id/edit" component={VideoEditPageContainer} />

      <Route path="/channels/:id" component={Channel} />
    </>
  );
};
