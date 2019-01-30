import React from 'react';

import NavHeader from '../../header/nav_header';
import VideoPlayer from './video_player';
import VideoInfoContainer from './video_info_container';

class VideoWatchPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const { id: videoId } = this.props.match.params;
    const { fetchVideo } = this.props;

    fetchVideo(videoId);
  }
  
  render() {
    const {
      id, title, description, videoURL,
      uploadDate, views, videoThumbnailURL,
      uploader
    } = this.props.video;
    
    return (
      <>
        <NavHeader />

        <main className="video-watch-page">
          <VideoPlayer
            videoURL={videoURL}
            videoThumbnailURL={videoThumbnailURL}
          />
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
