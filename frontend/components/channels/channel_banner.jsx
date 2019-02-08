import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ChannelBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const channelId = this.props.match.params.id;
    const { channel, owner } = this.props;
    
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

            <button
              id="subscribe-button"
              type="button"
            >
              Subscribe
            </button>
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

export default withRouter(ChannelBanner);
