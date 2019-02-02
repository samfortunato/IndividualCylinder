import React from 'react';

import VideoCommentFormContainer from './video_comment_form_container';

class VideoComments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const commentLis = this.props.comments.map((comment) => {
      const { users } = this.props;
      const commenter = users[comment.user_id];

      const fullName = `${commenter.first_name} ${commenter.last_name}`;
      
      return (
        <li key={comment.id} className="comment">
          <img
            className="commenter-avatar"
            src={commenter.avatar_url}
            alt={`${fullName}'s avatar`}
          />

          <section className="comment-details">
            <span className="commenter-username">{fullName}</span>
            <span className="comment-post-date">{comment.created_at} ago</span>
            <p className="comment-body">{comment.body}</p>
          </section>

          <button
            className="comment-delete-button"
            type="button"
            onClick={() => this.props.deleteComment(comment.id)}
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
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
