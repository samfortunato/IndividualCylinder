import React from 'react';

class VideoActionsInterface extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { likes, dislikes } = this.props;
    
    return (
      <ul id="video-actions-interface">
        <li>
          <button type="button">Like</button>
          <span>{likes}</span>
        </li>
        <li>
          <button type="button">Dislike</button>
          <span>{dislikes}</span>
        </li>
      </ul>
    );
  }
}

export default VideoActionsInterface;
