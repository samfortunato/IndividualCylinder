import React from 'react';

import NavHeader from '../../header/nav_header';
import VideoPlayer from './video_player';
import VideoInfoContainer from './video_info_container';
import VideoCommentsContainer from './video_comments_container';

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
      video_url,
      video_thumbnail_url
    } = this.props.video;

    return (
      <>
        <NavHeader />

        <main className="video-watch-page">
          <section id="main-video-content">
            <VideoPlayer
              video_url={video_url}
              video_thumbnail_url={video_thumbnail_url}
            />

            <VideoInfoContainer />

            <VideoCommentsContainer comments={this.props.comments} />
          </section>
          
          <aside className="related-videos-sidebar">
            
          </aside>
        </main>
      </>
    );
  }
};

export default VideoWatchPage;
