import React from 'react';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.video;
  }

  componentDidMount() {
    const { videoId, fetchVideo } = this.props;
    
    fetchVideo(videoId)
      .then(() => this.setState(this.props.video));
  }
  
  render() {
    let videoPlayer;
    
    if (this.state.videoUrl) {
      videoPlayer = (
        <video controls>
          <source
            src={this.state.videoUrl}
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
