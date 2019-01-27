import React from 'react';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  alterVolume(video, action) {
    const currentVolume = (Math.floor(video.volume * 10) / 10);

    switch (action) {
      case '+':
        if (currentVolume < 1) video.volume += 0.1;
        break;
      case '-':
        if (currentVolume > 0) video.volume -= 0.1;
        break;
    }
  }

  isFullScreen() {
    return !!document.fullScreen;
  }

  setFullScreenData(videoContainer, state) {
    videoContainer.setAttribute('data-fullscreen', !!state);
  }
  
  handleFullScreen() {
    const videoContainer = document.querySelector('#video-container');
    
    if (this.isFullScreen()) {
      document.exitFullscreen();
      setFullscreenData(videoContainer, false);
    }
  }

  componentDidMount() {
    const video = document.querySelector('#video');

    // Video controls
    const playPause = document.querySelector('#play-pause');
    const mute = document.querySelector('#mute');
    const volInc = document.querySelector('#volume-increase');
    const volDec = document.querySelector('#volume-decrease');
    const progress = document.querySelector('#progress');
    const fullScreen = document.querySelector('#full-screen');

    playPause.addEventListener('click', () => {
      if (video.paused || video.ended) video.play();
      else video.pause();
    });

    mute.addEventListener('click', () => {
      video.muted = !video.muted;
    });

    volInc.addEventListener('click', () => {
      this.alterVolume(video, '+');
    });

    volDec.addEventListener('click', () => {
      this.alterVolume(video, '-');
    });

    // -- Progress bar

    video.addEventListener('loadedmetadata', () => {
      progress.setAttribute('max', video.duration);
    });

    video.addEventListener('timeupdate', () => {
      progress.value = video.currentTime;
    });

    progress.addEventListener('click', function(e) {
      const position = (e.pageX - this.offsetLeft) / this.offsetWidth;

      video.currentTime = position * video.duration;

      // if (video.ended) {
      //   video.play();
      // }
    });

    // --

    fullScreen.addEventListener('click', () => {
      this.handleFullScreen();
    });
  }
  
  render() {
    const { videoUrl } = this.props;
    
    const videoPlayer = (
      <figure id="video-container">
        <video id="video" src={videoUrl} preload="metadata">
          {/* <source
            src={videoUrl}
            type="video/mp4"
          /> */}

          Your browser does not support video playback. Upgrade to a browser that supports video playback to view this video.
        </video>

        <ul id="video-controls">
          <li><button id="play-pause" type="button">Play/Pause</button></li>
          <li><progress id="progress" value="0" min="0"></progress></li>
          <li><button id="mute" type="button">Mute/Unmute</button></li>
          <li><button id="volume-increase" type="button">Vol +</button></li>
          <li><button id="volume-decrease" type="button">Vol -</button></li>
          <li><button id="full-screen" type="button">Full screen</button></li>
        </ul>
      </figure>
    );
    
    return (
      <>
        {videoPlayer}
      </>
    );
  }
}

export default VideoPlayer;
