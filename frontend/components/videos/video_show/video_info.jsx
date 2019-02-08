import React from 'react';
import { Link } from 'react-router-dom';

import VideoActionsInterface from './video_actions_interface';

class VideoInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { video, uploader, currentUserId } = this.props;

    const editVideoButtonClasses = (
      uploader.id === currentUserId ? 'video-info-button edit-video-button' : 'video-info-button edit-video-button hidden'
    );
    
    const subscribeButtonClasses = (
      uploader.id === currentUserId ? 'video-info-button subscribe-button hidden' : 'video-info-button subscribe-button'
    );
    
    return (
      <article className="video-info">
        <header className="video-header">
          <h1>{video.title}</h1>
          
          <div className="video-subheader">
            <h4>{(
              video.views === 1 ? `${video.views} view` : `${video.views} views`
            )}</h4>

            <VideoActionsInterface
              likes={video.likes}
              dislikes={video.dislikes}
            />
          </div>
        </header>

        <section className="video-details">
          <Link to={`/channels/${uploader.channel_id}`}>
            <img
              className="uploader-profile-picture"
              src={uploader.avatar_url || ''}
              alt="User's profile picture"
            />
          </Link>

          <section className="upload-info">
            <Link to={`/channels/${uploader.channel_id}`}>
              <h2>{`${uploader.first_name} ${uploader.last_name}`}</h2>
            </Link>

            <h3>{`Published on ${video.upload_date}`}</h3>
          </section>

          <Link className={editVideoButtonClasses} to={`/video/${video.id}/edit`}>Edit Video</Link>
          <button className={subscribeButtonClasses} type="button">Subscribe</button>
        </section>

        <p className="video-description">{video.description}</p>
      </article>
    );
  }
}

export default VideoInfo;
