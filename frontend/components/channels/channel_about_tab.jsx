import React from 'react';

class ChannelAboutTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { channel, owner } = this.props;
    
    return (
      <>
        <article id="channel-main-details">
          <section className="channel-about-section">
            <h2>Description</h2>
            <p>{channel.description}</p>
          </section>

          <section className="channel-about-section">
            <h2>Details</h2>
            <span>Email:</span>
            <span>{owner.email}</span>
          </section>
        </article>

        <aside id="channel-other-details">
          <h2>Stats</h2>
          <span className="other-channel-metadata">Joined {channel.join_date}</span>
          <span className="other-channel-metadata">{channel.total_views} views</span>
        </aside>

        <nav id="channel-featured-channels">
          
        </nav>
      </>
    );
  }
}

export default ChannelAboutTab;
