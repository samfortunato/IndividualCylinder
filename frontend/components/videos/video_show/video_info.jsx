import React from 'react';

class VideoInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, description } = this.props;
    
    return (
      <article className="video-info">
        <h1>{title}</h1>

        <header className="video-details">
          <img
            className="uploader-profile-picture"
            src="https://placeimg.com/48/48/people"
            alt="User's profile picture"
          />

          <section className="upload-info">
            <h2>Username</h2>
            <h3>Published on May 1, 1364</h3>
          </section>

          <button className="subscribe-button" type="button">Subscribe</button>
        </header>

        <p className="video-description">{description}</p>
      </article>
    );
  }
}

export default VideoInfo;
