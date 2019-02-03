import React from 'react';

import VideoCommentFormContainer from './video_comment_form_container';

class VideoComments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingCommentBody: '',
      editingComment: false
    };

    this.handleEditComment = this.handleEditComment.bind(this);
  }

  handleEditComment(e, commentBody) {
    return () => this.setState({
      editingCommentBody: commentBody,
      editingComment: true
    });
  }

  updateBody(e) {
    this.setState({ body: e.target.value });
  }

  handleEditSubmit(e) {
    e.preventDefault();
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

          {(
            this.state.editingComment ? (
              <form onSubmit={this.handleEditSubmit}>
                <label htmlFor="body">Comment Body</label>
                <input
                  id="body"
                  type="text"
                  value={this.state.body}
                  required
                  onChange={this.updateBody}
                />

                <button
                  type="button"
                  onClick={() => this.setState({ editingComment: false })}
                >
                  Cancel
                </button>
                <input type="submit" value="Save"/>
              </form>
            ) : (
              <>
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

                <button
                  className="comment-edit-button"
                  type="button"
                  onClick={this.handleEditComment(comment.body)}
                >
                  Edit
                </button>
              </>
            )
          )}
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
