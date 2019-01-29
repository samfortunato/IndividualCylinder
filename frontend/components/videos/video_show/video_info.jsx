import React from 'react';

class VideoInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title, description, uploader, uploadDate,
      views, currentUserId
    } = this.props;

    const editVideoButtonClasses = (
      uploader.id === currentUserId ? 'video-info-button edit-video-button' : 'video-info-button edit-video-button hidden'
    );
    
    return (
      <article className="video-info">
        <header className="video-title">
          <h1>{title}</h1>
          <h4>{(
            views === 1 ? `${views} view` : `${views} views`
          )}</h4>
        </header>

        <section className="video-details">
          <img
            className="uploader-profile-picture"
            src="https://placeimg.com/48/48/people"
            alt="User's profile picture"
          />

          <section className="upload-info">
            <h2>{`${uploader.firstName} ${uploader.lastName}`}</h2>
            <h3>{`Published on ${uploadDate}`}</h3>
          </section>

          <button className={editVideoButtonClasses} type="button">Edit Video</button>
          <button className="video-info-button subscribe-button" type="button">Subscribe</button>
        </section>

        <p className="video-description">{description}</p>
      </article>
    );
  }
}

export default VideoInfo;
