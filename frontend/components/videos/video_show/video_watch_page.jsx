import React from 'react';

import NavHeader from '../../header/nav_header';
import VideoPlayer from './video_player';
import VideoInfoContainer from './video_info_container';

class VideoWatchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      video: this.props.video,
      uploader: {
        id: null,
        firstName: '',
        lastName: ''
      }
    };
  }
  
  componentDidMount() {
    const { id: videoId } = this.props.match.params;
    const { fetchVideo } = this.props;

    fetchVideo(videoId)
      .then(() => this.setState(this.props.video));
  }
  
  render() {
    const {
      id, title, description, videoURL, uploadDate, views
    } = this.state;
    const { uploader } = this.state;
    
    return (
      <>
        <NavHeader />

        <main className="video-watch-page">
          <VideoPlayer videoURL={videoURL} />
          <VideoInfoContainer
            videoId={id}
            title={title}
            description={description}
            uploader={uploader}
            uploadDate={uploadDate}
            views={views}
          />
        </main>
      </>
    );
  }
};

export default VideoWatchPage;
