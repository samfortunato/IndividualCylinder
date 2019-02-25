import React from 'react';

import NavHeader from '../../header/nav_header';
import VideoCard from '../video_card/video_card';

class VideosIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllVideos();
  }

  render() {
    const _nullUploader = {
      id: '',
      first_name: '',
      last_name: '',
      channel_id: null
    };
    
    const { allVideos, uploaders } = this.props;
    
    const videoCards = allVideos.map((video) => {
      return (
        <li key={video.id}>
          <VideoCard
            video={video}
            uploader={uploaders[video.uploader_id] || _nullUploader}
          />
        </li>
      );
    });
    
    return (
      <>
        <NavHeader />

        <main className="video-homepage">
          <ul className="videos-list">
            {videoCards}
          </ul>
        </main>
      </>
    );
  }
}

export default VideosIndex;
