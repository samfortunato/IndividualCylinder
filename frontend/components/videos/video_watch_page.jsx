import React from 'react';

import NavHeader from '../header/nav_header';
import VideoPlayerContainer from './video_player_container';

const VideoWatchPage = (props) => {
  const videoId = props.match.params.id;
  
  return (
    <>
      <NavHeader />
      <VideoPlayerContainer videoId={videoId} />
    </>
  );
};

export default VideoWatchPage;
