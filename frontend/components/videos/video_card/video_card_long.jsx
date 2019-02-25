import React from 'react';
import { Link } from 'react-router-dom';

class VideoCardLong extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      title,
      upload_date,
      video_thumbnail_url,
      views,
      description
    } = this.props.video;

    const { uploader } = this.props;
    
    return (
      <article className="video-card-long">
        <div className="video-thumbnail-frame">
          <Link to={`/watch/${id}`}>
            <img src={video_thumbnail_url} alt={`${title} video thumbnail`} />
          </Link>
        </div>

        <section>
          <h2 className="result-title">{title}</h2>

          <Link className="uploader-name" to={`/channels/${uploader.channel_id}`}>
            {`${uploader.first_name} ${uploader.last_name}`}
          </Link>
          <span className="view-count">{(
            views === 1 ? `${views} view` : `${views} views`
          )}</span>
          <span className="upload-date">{upload_date}</span>

          <p className="result-description">{description}</p>
        </section>
      </article>
    );
  }
}

export default VideoCardLong;
