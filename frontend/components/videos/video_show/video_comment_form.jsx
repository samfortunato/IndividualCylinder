import React from 'react';
import merge from 'lodash/merge';

class VideoCommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      disabled: false
    };

    this.checkLoggedIn = this.checkLoggedIn.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkLoggedIn() {
    if (this.props.currentUserId === null) {
      this.props.history.push('/signin');
    }
  }
  
  updateBody(e) {
    this.setState({ body: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();

    this.setState({ disabled: true });

    const commentData = new FormData();
    commentData.set('comment[body]', this.state.body);
    commentData.set('comment[video_id]', this.props.match.params.id);
    
    this.props.createComment(commentData)
      .then(() => this.setState({
        body: '',
        disabled: false
      }));
  }

  render() {
    const { currentUserAvatarURL } = this.props;
    
    return (
      <section id="add-comment">
        <img className="current-user-avatar" src={currentUserAvatarURL} alt=""/>
      
        <form id="video-comment-form" onSubmit={this.handleSubmit}>
          <label htmlFor="body">Comment Body</label>
          <input
            id="body"
            type="text"
            value={this.state.body}
            required
            disabled={this.state.disabled}
            placeholder="Add a public comment..."
            onChange={this.updateBody}
            onClick={this.checkLoggedIn}
          />

          <input
            type="submit"
            value="Comment"
            disabled={this.state.disabled}
          />
        </form>
      </section>
    );
  }
}

export default VideoCommentForm;
