import React from 'react';

import VideoCommentFormContainer from './video_comment_form_container';
import VideoComment from './video_comment';

class VideoComments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const commentLis = this.props.comments.map((comment) => {
      const { users } = this.props;
      const commenter = users[comment.user_id];
      
      return (
        <VideoComment
          key={comment.id}
          comment={comment}
          commenter={commenter}
        />
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
