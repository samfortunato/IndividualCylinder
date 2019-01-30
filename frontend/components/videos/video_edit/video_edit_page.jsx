import React from 'react';

import NavHeader from '../../header/nav_header';
import VideoEditFormContainer from './video_edit_form_container';

class VideoEditPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const videoId = this.props.match.params.id;
    
    this.props.fetchVideo(videoId);
  }
  
  render() {
    const { id, title, description, videoURL, videoThumbnailURL } = this.props;
    
    return (
      <>
        <NavHeader />

        <main className="video-editor">
          <aside className="video-edit-sidebar">
            <img src={videoThumbnailURL} alt={`${title} thumbnail`} />
          </aside>

          <VideoEditFormContainer
            videoId={id}
            title={title}
            description={description}
            videoURL={videoURL}
            videoThumbnailURL={videoThumbnailURL}
          />
        </main>
      </>
    );
  }
}

export default VideoEditPage;
