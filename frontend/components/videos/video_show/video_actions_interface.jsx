import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createLike, updateLike, deleteLike } from '../../../actions/likes_actions';

class VideoActionsInterface extends React.Component {
  constructor(props) {
    super(props);

    this.handleLike = this.handleLike.bind(this);
  }

  handleLike(wasLiked) {
    return () => {
      const likeData = new FormData();
      likeData.set('like[likable_id]', this.props.videoId);
      likeData.set('like[likable_type]', 'Video');
      likeData.set('like[was_liked]', wasLiked);
      
      this.props.createLike(likeData);
    };
  }

  render() {
    const { likes, dislikes } = this.props;
    
    return (
      <ul id="video-actions-interface">
        <li>
          <button
            type="button"
            onClick={this.handleLike(true)}
          >
            Like
          </button>

          <span>{likes}</span>
        </li>
        <li>
          <button
            type="button"
            onClick={this.handleLike(false)}
          >
            Dislike
          </button>
          <span>{dislikes}</span>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    videoId: ownProps.match.params.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createLike: like => dispatch(createLike(like)),
    updateLike: like => dispatch(updateLike(like)),
    deleteLike: id => dispatch(deleteLike(id)),
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VideoActionsInterface)
);
