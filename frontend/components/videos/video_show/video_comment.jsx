import React from 'react';
import { connect } from 'react-redux';

import {
  updateComment,
  deleteComment
} from '../../../actions/comments_actions';

class VideoComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      editing: false
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
  
  componentDidMount() {
    this.setState({ body: this.props.comment.body });
  }

  render() {
    const { comment, commenter: user } = this.props;
    const fullName = `${user.first_name} ${user.last_name}`;

    return (
      <li key={comment.id} className="comment">
        <img
          className="user-avatar"
          src={user.avatar_url}
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

              <input type="submit" value="Save" />
            </form>
          ) : (
            <>
              <section className="comment-details">
                <span className="user-username">{fullName}</span>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateComment: comment => dispatch(updateComment(comment)),
    deleteComment: id => dispatch(deleteComment(id))
  };
};

export default connect(null, mapDispatchToProps)(VideoComment);
