import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchChannel } from '../../actions/channels_actions';
import VideoCard from '../videos/video_card/video_card';

class Channel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchChannel(this.props.match.params.id);
  }

  render() {
    const { channel, owner } = this.props;
    const videoCards = this.props.videos.map((video) => {
      return (
        <VideoCard
          key={video.id}
          video={video}
          uploader={owner}
        />
      )
    });
    
    return (
      <main id="user-channel">
        <img src={channel.banner_image_url} alt=""/>

        <img src={owner.avatar_url} alt=""/>
        <h1>{`${owner.first_name} ${owner.last_name}`}</h1>
        {videoCards}
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const channelId = ownProps.match.params.id;
  let channel = {},
      owner = {},
      videos = [];

  if (state.entities.channels[channelId]) {
    channel = state.entities.channels[channelId];
    owner = state.entities.users[channel.owner_id];

    videos = channel.video_ids.map((id) => {
      return state.entities.videos[id];
    })
  }
  
  return { channel, owner, videos };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannel: userId => dispatch(fetchChannel(userId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Channel)
);
