import React from 'react';

class VideoUploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      videoFile: null,
      uploaderId: this.props.currentUserId,
      submitDisabled: false
    };

    this.handleVideoFile = this.handleVideoFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    return (e) => {
      this.setState({ [value]: e.target.value });
    };
  }

  handleVideoFile(e) {
    this.setState({ videoFile: e.currentTarget.files[0] });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitDisabled: true });

    const formData = new FormData();
    formData.append('video[title]', this.state.title);
    formData.append('video[description]', this.state.description);
    formData.append('video[uploader_id]', this.state.uploaderId);

    if (this.state.videoFile) {
      formData.append('video[video_file]', this.state.videoFile);
    }

    this.props.uploadVideo(formData);
  }
  
  render() {
    return (
      <>
        <h1>Select files to upload</h1>

        <form className="video-upload-form" onSubmit={this.handleSubmit}>
          <label htmlFor="video-file">Video File</label>
          <input
            id="video-file"
            type="file"
            onChange={this.handleVideoFile}
          />

          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange('title')}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={this.state.description}
            onChange={this.handleChange('description')}
          />

          <input
            type="submit"
            value="Upload Video"
            disabled={this.state.submitDisabled}
          />
        </form>
      </>
    );
  }
}

export default VideoUploadForm;
