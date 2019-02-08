import React from 'react';

import VideoCard from '../videos/video_card/video_card';

class ChannelVideosTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { videos, owner } = this.props;
    
    const videoCards = videos.map((video) => {
      return (
        <VideoCard
          key={video.id}
          video={video}
          uploader={owner}
        />
      )
    });
    
    return (
      <>
        {videoCards}
      </>
    );
  }
}

export default ChannelVideosTab;
