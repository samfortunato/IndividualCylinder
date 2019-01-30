import React from 'react';
// import { Link } from 'react-router-dom';

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
    
    debugger;
    
    return (
      <>
        <NavHeader />

        <main className="video-editor">
          <aside className="video-edit-sidebar">
            <div className="video-thumbnail-frame">
              <img src={videoThumbnailURL} alt={`${title} thumbnail`} />
              {/* <span className="view-video-link">
                <Link to={`/watch/${id}`}>View on IndividualCylinder</Link>
              </span> */}
            </div>
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
