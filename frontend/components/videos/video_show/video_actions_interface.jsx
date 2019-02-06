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
    const {
      likes,
      dislikes,
      currentUser,
      currentUserLikeType
    } = this.props;

    let userLikedClass = '',
        userDislikedClass = '';

    switch (currentUserLikeType) {
      case true:
        if (currentUser) userLikedClass = 'was-liked';
        break;
      case false:
        if (currentUser) userDislikedClass = 'was-disliked';
        break;
      default:
        break;
    }
    
    return (
      <ul id="video-actions-interface">
        <li>
          <button
            className={`video-like-button ${userLikedClass}`}
            type="button"
            onClick={this.handleLike(true)}
          >
            Like
          </button>

          <span>{likes}</span>
        </li>
        <li>
          <button
            className={`video-dislike-button ${userDislikedClass}`}
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
  const videoId = ownProps.match.params.id;
  const currentVideo = state.entities.videos[videoId] || null;
  let currentUserLikeType;
  
  if (currentVideo) {
    currentUserLikeType = currentVideo.current_user_like;
  }
  
  return {
    videoId,
    currentUser: state.session.id !== null,
    currentUserLikeType
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createLike: like => dispatch(createLike(like)),
    updateLike: like => dispatch(updateLike(like)),
    deleteLike: id => dispatch(deleteLike(id)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VideoActionsInterface)
);
