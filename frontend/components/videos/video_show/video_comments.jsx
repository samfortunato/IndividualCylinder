import React from 'react';

import VideoCommentFormContainer from './video_comment_form_container';

class VideoComments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const commentLis = this.props.comments.map((comment) => {
      const { user } = comment;
      const fullName = `${user.first_name} ${user.last_name}`;
      
      return (
        <li key={comment.id} className="comment">
          <img
            className="commenter-avatar"
            src={user.avatar_url}
            alt={`${fullName}'s avatar`}
          />

          <section className="comment-details">
            <span className="commenter-username">{fullName}</span>
            <span className="comment-post-date">{comment.createdAt} ago</span>
            <p className="comment-body">{comment.body}</p>
          </section>
        </li>
      );
    });

    const commentsHeader = (
      (this.props.comments.length === 1) ? (
        `${this.props.comments.length} Comment`
      ) : (
        `${this.props.comments.length} Comments`
      )
    );
    
    return (
      <section id="video-comments">
        <h4>{commentsHeader}</h4>

        <VideoCommentFormContainer />

        <ul className="all-comments">
          {commentLis}
        </ul>
      </section>
    );
  }
}

export default VideoComments
