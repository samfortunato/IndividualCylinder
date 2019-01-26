import React from 'react';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { videoUrl } = this.props
    
    let videoPlayer;
    
    if (videoUrl) {
      videoPlayer = (
        <video controls>
          <source
            src={videoUrl}
            type="video/mp4"
          />

          Your browser does not support video playback. Upgrade to a browser that supports video playback to view this video.
        </video>
      );
    } else {
      videoPlayer = null;
    }
    
    return (
      <>
        {videoPlayer}
      </>
    );
  }
}

export default VideoPlayer;
