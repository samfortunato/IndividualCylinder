import React from 'react';
import { Link } from 'react-router-dom';

class VideoCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id, title, upload_date,
      uploader, video_thumbnail_url, views
    } = this.props.video;
    
    return (
      <article className="video-card">
        <header>
          <h4>{title}</h4>
          
          <div className="video-thumbnail-frame">
            <Link to={`/watch/${id}`}>
              <img src={video_thumbnail_url} alt={`${title} video thumbnail`} />
            </Link>
          </div>
        </header>

        <section className="video-card-details">
          <span className="uploader-name">{`${uploader.first_name} ${uploader.last_name}`}</span>
          <span className="view-count">{(
            views === 1 ? `${views} view` : `${views} views`
          )}</span>
          <span className="upload-date">{`${upload_date} ago`}</span>
        </section>
      </article>
    );
  }
}

export default VideoCard;
