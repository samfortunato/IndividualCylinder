import React from 'react';

class ChannelAboutTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { channel, owner } = this.props;

    const totalChannelViews = (
      channel.total_views === 1 ? (
        `${channel.total_views} view`
      ) : (
        `${channel.total_views} views`
      )
    );
    
    return (
      <>
        <article id="channel-main-details">
          <section className="channel-about-section">
            <h2>Description</h2>
            <p>{channel.description}</p>
          </section>

          <section className="channel-about-section">
            <h2>Details</h2>

            <div className="channel-detail-group">
              <span className="channel-detail-type">Email:</span>
              <a href={`mailto:${owner.email}`}>{owner.email}</a>
            </div>
          </section>
        </article>

        <aside id="channel-other-details">
          <h2>Stats</h2>
          <span className="other-channel-metadata">Joined {channel.join_date}</span>
          <span className="other-channel-metadata">{totalChannelViews}</span>
        </aside>

        <nav id="channel-featured-channels">
          
        </nav>
      </>
    );
  }
}

export default ChannelAboutTab;
