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
      prevBody: '',
      body: '',
      editing: false
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit() {
    const { comment, currentUserId } = this.props;

    if (comment.user_id === currentUserId) {
      this.setState({ editing: true });
    }
  }

  updateBody(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const commentData = new FormData();
    commentData.set('comment[id]', this.props.comment.id);
    commentData.set('comment[body]', this.state.body);
    
    this.props.updateComment(commentData)
      .then(() => {
        this.setState({ editing: false });
      });
  }

  handleDelete() {
    const { comment, currentUserId } = this.props;

    if (comment.user_id === currentUserId) {
      this.props.deleteComment(comment.id);
    }
  }
  
  componentDidMount() {
    this.setState({ body: this.props.comment.body });
  }

  render() {
    const { comment, commenter: user, currentUserId } = this.props;
    const fullName = `${user.first_name} ${user.last_name}`;

    let commentActionButtons;

    if (comment.user_id === currentUserId) {
      commentActionButtons = (
        <>
          <button
            className="comment-edit-button"
            type="button"
            onClick={this.handleEdit}
          >
            <i className="fas fa-edit"></i>
          </button>

          <button
            className="comment-delete-button"
            type="button"
            onClick={this.handleDelete}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </>
      );
    } else {
      commentActionButtons = null;
    }

    return (
      <li key={this.props.key} className="comment">
        <img
          className="user-avatar"
          src={user.avatar_url}
          alt={`${fullName}'s avatar`}
        />

        {(
          (this.state.editing) ? (
            <form className="comment-edit-form" onSubmit={this.handleSubmit}>
              <label htmlFor="body">Comment Body</label>
              <input
                id="body"
                type="text"
                value={this.state.body}
                required
                onChange={this.updateBody}
              />

              <button
                className="edit-cancel-button"
                type="button"
                onClick={() => this.setState({ editing: false })}
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

              {commentActionButtons}
            </>
          )
        )}
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateComment: comment => dispatch(updateComment(comment)),
    deleteComment: id => dispatch(deleteComment(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoComment);
