import React from 'react';
import { Link } from 'react-router-dom';

import VideoActionsInterface from './video_actions_interface';

class VideoInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubscription = this.handleSubscription.bind(this);
  }

  handleSubscription() {
    const {
      currentUserIsSubscribed,
      uploader,
      currentUserId,
      createSubscription,
      deleteSubscription
    } = this.props;

    const subscription = {
      channel_id: uploader.channel_id,
      user_id: currentUserId
    };

    if (currentUserIsSubscribed) {
      deleteSubscription({ subscription });
    } else if (currentUserId !== null) {
      createSubscription({ subscription });
    } else {
      this.props.history.push('/signin');
    }
  }

  render() {
    const {
      video, uploader, currentUserId, currentUserIsSubscribed
    } = this.props;

    const editVideoButtonClasses = (
      uploader.id === currentUserId ? 'video-info-button edit-video-button' : 'video-info-button edit-video-button hidden'
    );
    
    let subscribeButtonClasses;

    if (uploader.id === currentUserId) {
      subscribeButtonClasses = 'video-info-button subscribe-button hidden';
    } else if (currentUserIsSubscribed) {
      subscribeButtonClasses = 'video-info-button subscribe-button subscribed';
    } else {
      subscribeButtonClasses = 'video-info-button subscribe-button';
    }
    
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
          <button
            className={subscribeButtonClasses}
            type="button"
            onClick={this.handleSubscription}
          >
            {`${
              (currentUserIsSubscribed ? 'Subscribed' : 'Subscribe')
            } ${
              (uploader.subscriber_amount !== 0 ? uploader.subscriber_amount : '')
            }`}
          </button>
        </section>

        <p className="video-description">{video.description}</p>
      </article>
    );
  }
}

export default VideoInfo;
