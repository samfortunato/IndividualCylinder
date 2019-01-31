import React from 'react';
import { Link } from 'react-router-dom';

// import { thumbnailGenerator } from '../../../util/video_thumbnail_util';

class VideoUploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      videoFile: null,
      videoThumbnailFile: '',

      submitDisabled: false,
      uploadButtonText: 'Upload Video',

      uploadedVideoId: ''
    };

    this.handleVideoFile = this.handleVideoFile.bind(this);
    this.handleVideoThumbnailFile = this.handleVideoThumbnailFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    return (e) => {
      this.setState({ [value]: e.target.value });
    };
  }

  setTitleToFileName(e) {
    const videoFileSplitPath = e.target.value
      .split(/(\\|\/)/g);
    const fileNameIndex = videoFileSplitPath.length - 1;
    const fileNameNoExtension = videoFileSplitPath[fileNameIndex]
      .replace(/\.[^/.]+$/, '');

    this.setState({ title: fileNameNoExtension });
  }

  updateUploadForm() {
    const videoUploadHeading = document.querySelector('h1');
    videoUploadHeading.classList.add('hidden');
    
    const videoUploadButton = document.querySelector('label[for="video-file"]');
    videoUploadButton.style.display = 'none';

    const videoUploadForm = document.querySelector('.video-upload-form');
    videoUploadForm.classList.remove('file-false');
    videoUploadForm.classList.add('file-true');
    
    const videoInfoFormFields = document.querySelector('.video-info-form-fields');
    videoInfoFormFields.classList.remove('hidden');
  }
  
  // displayVideoThumbnail() {
  //   thumbnailGenerator(this.state.videoFile);
  // }
  
  handleVideoFile(e) {
    this.setState({ videoFile: e.currentTarget.files[0] });

    this.setTitleToFileName(e);
    this.updateUploadForm();

    // this.displayVideoThumbnail();
  }

  handleVideoThumbnailFile(e) {
    this.setState({ videoThumbnailFile: e.currentTarget.files[0] });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      submitDisabled: true,
      uploadButtonText: 'Uploading...'
    });
    
    const formData = new FormData();
    formData.set('video[title]', this.state.title);
    formData.set('video[description]', this.state.description);

    if (this.state.videoFile) {
      formData.set('video[video_file]', this.state.videoFile);
    }

    if (this.state.videoThumbnailFile) {
      formData.set('video[video_thumbnail]', this.state.videoThumbnailFile);
    }

    this.props.uploadVideo(formData)
      .then(
        res => this.setState({
          uploadedVideoId: Object.keys(res.video)[0],
          uploadButtonText: 'Done!'
        }),
        () => this.setState({ submitDisabled: false })
      );
  }

  componentDidMount() {
    this.props.clearVideoErrors();
  }
  
  render() {
    const { uploadedVideoId } = this.state;
    const videoWatchLinkMessageClasses = (
      uploadedVideoId !== '' ? 'video-watch-link' : 'video-watch-link hidden'
    );
    
    const errorLis = this.props.errors.map((error, i) => {
      return <li key={i}>{error}</li>;
    }) || null;
    
    return (
      <section className="video-upload-container">
        <h1>Select file to upload</h1>

        <form className="video-upload-form file-false" onSubmit={this.handleSubmit}>
          <label htmlFor="video-file">
            <span>Video File</span>
          </label>
          <input
            id="video-file"
            type="file"
            onChange={this.handleVideoFile}
          />

          <div className="video-info-form-fields hidden">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={this.state.title}
              placeholder="Title"
              disabled={this.state.submitDisabled}
              onChange={this.handleChange('title')}
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={this.state.description}
              placeholder="Description"
              disabled={this.state.submitDisabled}
              onChange={this.handleChange('description')}
            />

            <label htmlFor="thumbnail">Video Thumbnail</label>
            <input
              id="thumbnail"
              type="file"
              disabled={this.state.submitDisabled}
              onChange={this.handleVideoThumbnailFile}
            />

            <input
              type="submit"
              value={this.state.uploadButtonText}
              disabled={this.state.submitDisabled}
            />
          </div>
        </form>

        <ul className="upload-form-errors">{errorLis}</ul>

        <div className={videoWatchLinkMessageClasses}>
          <span>Your video will be live at:</span>
          <Link to={`/watch/${uploadedVideoId}`}>https://individualcylinder.herokuapp.com/watch/{uploadedVideoId}</Link>
        </div>
      </section>
    );
  }
}

export default VideoUploadForm;
