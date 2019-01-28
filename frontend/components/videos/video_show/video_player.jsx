import React from 'react';

import { toMMSSTimeString } from '../../../util/date_util';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.initiateVideoInterface = this.initiateVideoInterface.bind(this);
  }

  handlePlayPause() {
    if (video.paused || video.ended) video.play();
    else video.pause();
  }

  handleMute() {
    const video = document.querySelector('#video');
    video.muted = !video.muted;

    const muteIcon = document.querySelector('#mute i');
    
    if (video.muted) {
      muteIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
      muteIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
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
      this.setFullScreenData(videoContainer, false);
    } else {
      videoContainer.requestFullscreen();
      this.setFullScreenData(videoContainer, true);
    }
  }
  
  initiateVideoInterface() {
    const video = document.querySelector('#video');

    // Video controls
    const progress = document.querySelector('#video-progress');
    const playPause = document.querySelector('#play-pause');
    const mute = document.querySelector('#mute');
    const volumeSlider = document.querySelector('#volume-slider');
    const currentVideoTime = document.querySelector('.current-video-time');
    const videoDuration = document.querySelector('.video-duration');
    const fullScreen = document.querySelector('#full-screen');
    
    // Disable right click on video
    video.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    // -- Video player/button functionality
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

    video.addEventListener('click', () => {
      this.handlePlayPause();
    });
    
    playPause.addEventListener('click', () => {
      this.handlePlayPause();
    });

    mute.addEventListener('click', this.handleMute);

    // -- -- Volume slider

    video.addEventListener('volumechange', () => {
      volumeSlider.value = video.volume;
    });

    volumeSlider.addEventListener('input', (e) => {
      video.volume = e.target.value;
    });

    // -- --

    // -- -- Display video time and duration

    video.addEventListener('loadedmetadata', () => {
      videoDuration.textContent = toMMSSTimeString(video.duration);
    });

    video.addEventListener('timeupdate', () => {
      currentVideoTime.textContent = toMMSSTimeString(video.currentTime);
    });
    
    // -- --

    fullScreen.addEventListener('click', this.handleFullScreen.bind(this));

    video.addEventListener('dblclick', this.handleFullScreen.bind(this));

    // --

    // Keyboard shortcuts

    document.addEventListener('keydown', (e) => {
      // console.log(e.key);
      
      switch (e.key) {
        case 'k':
          this.handlePlayPause();
          break;
          
        case '':
          this.handlePlayPause();
          break;
          
        case 'm':
          this.handleMute();
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

  enablePlayPauseIconUpdate() {
    const video = document.querySelector('#video');
    const playPauseIcon = document.querySelector('#play-pause i');

    video.addEventListener('play', () => {
      if (playPauseIcon.classList.contains('fa-play')) {
        playPauseIcon.classList.replace('fa-play', 'fa-pause');
      }
    });

    video.addEventListener('pause', () => {
      if (playPauseIcon.classList.contains('fa-pause')) {
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
      }
    });
  }

  componentDidMount() {
    this.initiateVideoInterface();
    this.enablePlayPauseIconUpdate();
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

          <div id="video-interface">
            <progress id="video-progress" value="0" min="0"></progress>

            <ul className="main-video-interface">
              <li><button id="play-pause" type="button"><i className="fas fa-play"></i></button></li>
              <li><button id="mute" type="button"><i className="fas fa-volume-up"></i></button></li>
              <li><input id="volume-slider" type="range" min="0" max="1" step="0.01" /></li>
              <li>
                <span class="current-video-time">00:00</span>
                <span class="video-duration">00:00</span>
              </li>
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
