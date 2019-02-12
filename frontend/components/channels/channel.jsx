import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchChannel } from '../../actions/channels_actions';
import NavHeader from '../header/nav_header';
import ChannelBanner from './channel_banner';
import ChannelVideosTab from './channel_videos_tab';
import ChannelAboutTab from './channel_about_tab';

class Channel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchChannel(this.props.match.params.id);
  }

  render() {
    const currentTabURL = this.props.location.pathname;
    const channelId = this.props.match.params.id;
    const { channel, owner, videos, currentUserId } = this.props;

    let currentTab = null;
    
    switch (currentTabURL) {
      case `/channels/${channelId}/videos`:
        currentTab = <ChannelVideosTab videos={videos} owner={owner} />;
        break;
      case `/channels/${channelId}/about`:
        currentTab = <ChannelAboutTab channel={channel} owner={owner} />;
        break;
      default:
        currentTab = <ChannelVideosTab videos={videos} owner={owner} />;
    }
    
    return (
      <>
        <NavHeader />
      
        <ChannelBanner
          channel={channel}
          owner={owner}
          currentUserId={currentUserId}
        />

        <main id="channel-content">
          {currentTab}
        </main>
      </>
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

  let currentUserId = null;

  if (state.session.id) {
    currentUserId = state.session.id;
  }
  
  return { channel, owner, videos, currentUserId };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannel: channelId => dispatch(fetchChannel(channelId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Channel)
);
