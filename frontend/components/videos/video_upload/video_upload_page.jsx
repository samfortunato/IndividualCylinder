import React from 'react';

import NavHeader from '../../header/nav_header';
import VideoUploadFormContainer from './video_upload_form_container';

class VideoUploadPage extends React.Component {
  render() {
    return (
      <>
        <NavHeader />

        <VideoUploadFormContainer />
      </>
    );
  }
}

export default VideoUploadPage;
