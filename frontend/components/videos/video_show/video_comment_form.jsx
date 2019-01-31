import React from 'react';
import merge from 'lodash/merge';

class VideoCommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: ''
    };

    this.updateBody = this.updateBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateBody(e) {
    this.setState({ body: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();

    const commentData = new FormData();
    commentData.set('comment[body]', this.state.body);
    commentData.set('comment[video_id]', this.props.match.params.id);

    this.props.createComment(commentData);
  }

  render() {
    return (
      <section id="add-comment">
        <img className="current-user-avatar" src="https://placeimg.com/40/40/people" alt=""/>
      
        <form id="video-comment-form" onSubmit={this.handleSubmit}>
          <label htmlFor="body">Comment Body</label>
          <input
            id="body"
            type="text"
            value={this.state.body}
            required
            placeholder="Add a public comment..."
            onChange={this.updateBody}
          />

          <input type="submit" value="Comment" />
        </form>
      </section>
    );
  }
}

export default VideoCommentForm;
