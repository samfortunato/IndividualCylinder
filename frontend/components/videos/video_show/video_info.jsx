import React from 'react';

class VideoInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, description } = this.props;
    
    return (
      <article class="video-info">
        <h1>{title}</h1>

        <header class="video-details">
          <img
            class="uploader-profile-picture"
            src="https://placeimg.com/48/48/people"
            alt="User's profile picture"
          />

          <section class="upload-info">
            <h2>Username</h2>
            <h3>Published on May 1st, 1364</h3>
          </section>

          <button class="subscribe-button" type="button">Subscribe</button>
        </header>

        <p class="video-description">{description}</p>
      </article>
    );
  }
}

export default VideoInfo;
