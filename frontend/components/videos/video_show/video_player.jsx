import React from 'react';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.initiateVideoControls = this.initiateVideoControls.bind(this);
  }

  handlePlayPause(video) {
    if (video.paused || video.ended) video.play();
    else video.pause();
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
    return !!document.fullscreenElement;
  }

  setFullScreenData(videoContainer, state) {
    videoContainer.setAttribute('data-fullscreen', !!state);
  }
  
  handleFullScreen() {
    const videoContainer = document.querySelector('#video-container');
    
    if (this.isFullScreen()) {
      document.exitFullscreen();
      setFullScreenData(videoContainer, false);
    } else {
      videoContainer.requestFullscreen();
      setFullScreenData(videoContainer, true);
    }
  }
  
  initiateVideoControls() {
    const video = document.querySelector('#video');

    // Video controls
    const playPause = document.querySelector('#play-pause');
    const mute = document.querySelector('#mute');
    const volumeSlider = document.querySelector('#volume-slider');
    const progress = document.querySelector('#video-progress');
    const fullScreen = document.querySelector('#full-screen');
    
    // Disable right click on video
    video.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    // -- Video player/button functionality
    video.addEventListener('click', () => {
      this.handlePlayPause(video);
    });
    
    playPause.addEventListener('click', () => {
      this.handlePlayPause(video);
    });

    mute.addEventListener('click', () => {
      video.muted = !video.muted;
    });

    // -- Volume slider

    video.addEventListener('volumechange', () => {
      volumeSlider.value = video.volume;
      console.log(video.volume);
    });

    volumeSlider.addEventListener('input', (e) => {
      video.volume = e.target.value;
    });
    
    // --

    // -- -- Progress bar

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

    // -- --

    fullScreen.addEventListener('click', () => {
      this.handleFullScreen();
    });

    // --

    // Keyboard shortcuts

    document.addEventListener('keydown', (e) => {
      // console.log(e.key);
      
      switch (e.key) {
        case 'k':
          this.handlePlayPause(video);
          break;
          
        case '':
          this.handlePlayPause(video);
          break;
          
        case 'm':
          video.muted = !video.muted;
          break;
          
        case 'j':
          if (video.currentTime >= 10) {
            video.currentTime -= 10;
          } else {
            video.currentTime = 0;
          }

          break;
          
        case 'l':
          if (video.currentTime < video.duration) {
            video.currentTime += 10;
          } else {
            video.currentTIme = video.duration;
          }
          
          break;
          
        case 'f':
          this.handleFullScreen();
          break;
          
        default:
          break;
      }
    });
  }

  componentDidMount() {
    this.initiateVideoControls();
  }
  
  render() {
    const { videoUrl } = this.props;
    
    const videoPlayer = (
        <figure id="video-container">
          <video
            id="video"
            src={videoUrl}
            preload="metadata">
            
            {/* <source
              src={videoUrl}
              type="video/mp4"
            /> */}

            Your browser does not support video playback. Upgrade to a browser that supports video playback to view this video.
          </video>

          <div id="video-controls">
            <progress id="video-progress" value="0" min="0"></progress>

            <ul className="main-video-controls">
              <li><button id="play-pause" type="button"><i className="fas fa-play"></i></button></li>
              <li><button id="mute" type="button"><i className="fas fa-volume-up"></i></button></li>
              <li><input id="volume-slider" type="range" min="0" max="1" step="0.01" /></li>
              <li><button id="full-screen" type="button"><i className="far fa-square"></i></button></li>
            </ul>
          </div>
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
