import React from 'react';

class VideoEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: this.props.videoId,
      title: this.props.title,
      description: this.props.description,
      thumbnail: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleThumbnailFile = this.handleThumbnailFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(property) {
    return (e) => {
      this.setState({ [property]: e.target.value });
    };
  }

  handleThumbnailFile(e) {
    this.setState({ thumbnail: e.currentTarget.files[0] });
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append('video[id]', this.state.videoId);
    formData.append('video[title]', this.state.title);
    formData.append('video[description]', this.state.description);

    if (this.state.thumbnail) {
      formData.append('video[video_thumbnail]', this.state.thumbnail);
    }

    this.props.updateVideo(formData)
      .then(
        this.props.history.push(`/watch/${this.props.match.params.id}`)
      );
  }

  handleDelete(e) {
    e.preventDefault();

    this.props.deleteVideo(this.state.videoId)
      .then(
        this.props.history.push('/')
      );
  }

  // getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.title !== prevState.title) {
  //     // ???
  //   }
  // }

  render() {
    return (
      <section className="video-editor-main-fields">
        <form className="video-details-form" onSubmit={this.handleSubmit}>
          <div className="label-input-group">
            <textarea
              id="title"
              value={this.state.title}
              onChange={this.handleChange('title')}
            ></textarea>
            <label htmlFor="title">Title</label>
          </div>
          
          <div className="label-input-group">
            <textarea
              id="description"
              value={this.state.description}
              onChange={this.handleChange('description')}
            ></textarea>
            <label htmlFor="description">Description</label>
          </div>

          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            id="thumbnail"
            type="file"
            onChange={this.handleThumbnailFile}
          />

          <div class="edit-action-buttons">
            <input type="submit" value="Save" />
            <button
              className="video-delete-button"
              type="button"
              onClick={this.handleDelete}
            >Delete</button>
          </div>
        </form>

      </section>
    );
  }
}

export default VideoEditForm;
