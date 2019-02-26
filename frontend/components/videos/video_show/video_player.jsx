import React from 'react';

import { toMMSSTimeString } from '../../../util/date_util';
import { percentageToSeekVideoTo } from '../../../util/video_player_util';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volumeBeforeMute: 0
    };

    this.video = null;
    
    this.handleMute = this.handleMute.bind(this);
    this.setUpVideoInterface = this.setUpVideoInterface.bind(this);
    this.handleKeyboardShortcuts = this.handleKeyboardShortcuts.bind(this);
  }

  handlePlayPause() {
    if (this.video.paused || this.video.ended) this.video.play();
    else this.video.pause();
  }

  handleMute() {
    this.video.muted = !this.video.muted;

    const muteButton = document.querySelector('#mute i');

    if (this.video.muted) {
      this.setState({ volumeBeforeMute: this.video.volume });
      this.video.volume = 0;

      muteButton.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
      this.video.volume = this.state.volumeBeforeMute;
      
      muteButton.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
  }

  incrementalSeek(direction) {
    switch (direction) {
      case 'forward':
        if (this.video.currentTime >= 10) {
          this.video.currentTime -= 10;
        } else {
          this.video.currentTime = 0;
        }
      
        break;
        
      case 'backward':
        if (this.video.currentTime < this.video.duration) {
          this.video.currentTime += 10;
        } else {
          this.video.currentTime = this.video.duration;
        }
      
        break;

      default:
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

  handleKeyboardShortcuts(e) {
    const disabledShortcutElements = [
      document.querySelector('#search-bar'),
      document.querySelector('input#body'),
      document.querySelector('input#comment-body')
    ];
    
    if (disabledShortcutElements.includes(document.activeElement)) {
      return;
    }
    
    switch (e.key) {
      case 'k':
        this.handlePlayPause();
        break;

      case ' ':
        this.handlePlayPause();
        break;

      case 'm':
        this.handleMute();
        break;

      case 'j':
        this.incrementalSeek('forward');
        break;

      case 'l':
        this.incrementalSeek('backward');
        break;

      case 'f':
        this.handleFullScreen();
        break;

      default:
        break;
    }
  }

  setUpVideoInterface() {
    const progressBar = document.querySelector('#video-progress');
    const playPauseButton = document.querySelector('#play-pause');
    const muteButton = document.querySelector('#mute');
    const volumeSlider = document.querySelector('#volume-slider');
    const currentVideoTimeText = document.querySelector('.current-video-time');
    const videoDurationText = document.querySelector('.video-duration');
    const fullScreenButton = document.querySelector('#full-screen');

    // Disable right click on video
    this.video.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    this.video.addEventListener('loadedmetadata', () => {
      progressBar.setAttribute('max', this.video.duration);
    });

    this.video.addEventListener('timeupdate', () => {
      progressBar.value = this.video.currentTime;
    });

    progressBar.addEventListener('click', (e) => {
      this.video.currentTime = (
        (this.video.duration / 100) * percentageToSeekVideoTo(e.pageX, e.currentTarget)
      );

      if (this.video.ended) this.video.play();
    });

    this.video.addEventListener('click', () => {
      this.handlePlayPause();
    });

    playPauseButton.addEventListener('click', () => {
      this.handlePlayPause();
    });

    muteButton.addEventListener('click', this.handleMute);

    this.video.addEventListener('volumechange', () => {
      volumeSlider.value = this.video.volume;
    });

    volumeSlider.addEventListener('input', (e) => {
      if (this.video.muted) this.handleMute();
      
      this.video.volume = e.target.value;
    });

    this.video.addEventListener('loadedmetadata', () => {
      videoDurationText.textContent = toMMSSTimeString(this.video.duration);
    });

    this.video.addEventListener('timeupdate', () => {
      currentVideoTimeText.textContent = toMMSSTimeString(this.video.currentTime);
    });

    fullScreenButton.addEventListener('click', this.handleFullScreen.bind(this));
    this.video.addEventListener('dblclick', this.handleFullScreen.bind(this));

    document.addEventListener('keydown', this.handleKeyboardShortcuts);
  }

  enableVideoPlayerIconUpdate() {
    const playPauseButton = document.querySelector('#play-pause i');

    this.video.addEventListener('play', () => {
      if (playPauseButton.classList.contains('fa-play')) {
        playPauseButton.classList.replace('fa-play', 'fa-pause');
      }
    });

    this.video.addEventListener('pause', () => {
      if (playPauseButton.classList.contains('fa-pause')) {
        playPauseButton.classList.replace('fa-pause', 'fa-play');
      }
    });
  }

  componentDidMount() {
    this.video = document.querySelector('#video');
    
    this.setUpVideoInterface();
    this.enableVideoPlayerIconUpdate();
  }

  componentWillUnmount() {
    // Cloning & replacing to remove all event listeners
    //   from video player container and it's children
    const videoContainer = document.querySelector('#video-container');
    const videoContainerClone = videoContainer.cloneNode(true);

    videoContainer.parentNode
      .replaceChild(videoContainerClone, videoContainer);

    document.removeEventListener('keydown', this.handleKeyboardShortcuts);
  }

  render() {
    const { video_url, video_thumbnail_url } = this.props;

    const videoPlayer = (
      <figure id="video-container">
        <video
          id="video"
          src={video_url}
          poster={video_thumbnail_url}
          preload="metadata"
          autoPlay>

          Your browser does not support video playback. Upgrade to a browser that supports video playback to view this video.
          </video>

        <div id="video-interface">
          <progress id="video-progress" value="0" min="0"></progress>

          <ul className="main-video-interface">
            <li><button id="play-pause" type="button"><i className="fas fa-play"></i></button></li>
            <li><button id="mute" type="button"><i className="fas fa-volume-up"></i></button></li>
            <li><input id="volume-slider" type="range" min="0" max="1" step="0.01" /></li>
            <li>
              <span className="current-video-time">00:00</span>
              <span className="video-duration">00:00</span>
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
