import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { createSubscription, deleteSubscription } from '../../actions/subscriptions_actions';

class ChannelBanner extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubscription = this.handleSubscription.bind(this);
  }

  handleSubscription() {
    const {
      channel,
      currentUserId,
      currentUserIsSubscribed,
      createSubscription,
      deleteSubscription
    } = this.props;

    const subscription = {
      channel_id: channel.id,
      user_id: currentUserId
    };
    
    if (currentUserIsSubscribed) {
      deleteSubscription(subscription);
    } else if (currentUserId !== null) {
      createSubscription(subscription);
    } else {
      this.props.history.push('/signin');
    }
  }

  render() {
    const channelId = this.props.match.params.id;
    const {
      channel,
      owner,
      currentUserId,
      currentUserIsSubscribed
    } = this.props;

    let channelActionButton = null;

    if (currentUserId === owner.id) {
      channelActionButton = (
        // <Link
        //   className="channel-button customize-channel-button"
        //   to={`/channel/${channelId}/edit`}
        // >
        //   Customize Channel
        // </Link>
        
        null
      );
    } else if (currentUserIsSubscribed) {
      channelActionButton = (
        <button
          className="channel-button subscribe-button subscribed"
          type="button"
          onClick={this.handleSubscription}
        >
          Subscribed {channel.subscriber_amount}
        </button>
      )
    } else {
      channelActionButton = (
        <button
          className="channel-button subscribe-button"
          type="button"
          onClick={this.handleSubscription}
        >
          Subscribe {(
            channel.subscriber_amount === 0 ? '' : channel.subscriber_amount
          )}
        </button>
      );
    }
    
    return (
      <header id="channel-header">
        <img id="channel-banner" src={channel.banner_image_url} alt="" />

        <section id="channel-header-content">
          <div id="channel-details">
            <img
              className="channel-owner-avatar"
              src={owner.avatar_url}
              alt=""
            />
            <h1>{`${owner.first_name} ${owner.last_name}`}</h1>

            {channelActionButton}
          </div>

          <nav id="channel-navigation">
            <ul>
              <li>
                <Link to={`/channels/${channelId}`}>Home</Link>
              </li>
              <li>
                <Link to={`/channels/${channelId}/videos`}>Videos</Link>
              </li>
              <li>
                <Link to={`/channels/${channelId}/about`}>About</Link>
              </li>
            </ul>
          </nav>
        </section>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSubscription: subscription => dispatch(createSubscription(subscription)),
    deleteSubscription: subscription => dispatch(deleteSubscription(subscription))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ChannelBanner)
);
