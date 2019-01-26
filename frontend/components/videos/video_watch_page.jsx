import React from 'react';

import NavHeader from '../header/nav_header';
import VideoPlayer from './video_player';
import VideoInfo from './video_info';

class VideoWatchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.video;
  }
  
  componentDidMount() {
    debugger;

    const { id: videoId } = this.props.match.params;
    const { fetchVideo } = this.props;

    fetchVideo(videoId)
      .then(() => this.setState(this.props.video));
  }
  
  render() {
    const { title, description, videoUrl } = this.state;
    
    return (
      <>
        <NavHeader />

        <main class="video-watch-page">
          <VideoPlayer videoUrl={videoUrl} />
          <VideoInfo title={title} description={description} />
        </main>
      </>
    );
  }
};

export default VideoWatchPage;
