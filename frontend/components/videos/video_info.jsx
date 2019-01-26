import React from 'react';

class VideoInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, description } = this.props;
    
    return (
      <>
        <h1>{title}</h1>
        <p>{description}</p>
      </>
    );
  }
}

export default VideoInfo;
