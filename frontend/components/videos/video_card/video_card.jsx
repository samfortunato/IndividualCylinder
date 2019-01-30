import React from 'react';
import { Link } from 'react-router-dom';

class VideoCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id, title, uploadDate,
      uploader, videoThumbnailURL, views
    } = this.props.video;
    
    return (
      <article className="video-card">
        <header>
          <h4>{title}</h4>
          
          <div class="video-thumbnail-frame">
            <Link to={`/watch/${id}`}>
              <img src={videoThumbnailURL} alt={`${title} video thumbnail`} />
            </Link>
          </div>
        </header>

        <section className="video-card-details">
          <span className="uploader-name">{`${uploader.firstName} ${uploader.lastName}`}</span>
          <span className="view-count">{(
            views === 1 ? `${views} view` : `${views} views`
          )}</span>
          <span className="upload-date">{`${uploadDate} ago`}</span>
        </section>
      </article>
    );
  }
}

export default VideoCard;