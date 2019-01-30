import * as VideosAPIUtil from '../util/videos_api_util';

export const RECEIVE_ALL_VIDEOS = 'RECEIVE_ALL_VIDEOS';
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS';
export const CLEAR_VIDEO_ERRORS = 'CLEAR_VIDEO_ERRORS';

export const fetchAllVideos = () => (dispatch) => {
  return VideosAPIUtil.fetchAllVideos()
    .then(
      videos => dispatch(receiveAllVideos(videos)),
      errors => dispatch(receiveVideoErrors(errors))
    );
};

export const fetchVideo = (id) => (dispatch) => {
  return VideosAPIUtil.fetchVideo(id)
    .then(
      video => dispatch(receiveVideo(video)),
      errors => dispatch(receiveVideoErrors(errors))
    );
};

export const uploadVideo = (video) => (dispatch) => {
  return VideosAPIUtil.uploadVideo(video)
    .then(
      video => dispatch(receiveVideo(video)),
      errors => dispatch(receiveVideoErrors(errors))
    );
};

export const updateVideo = (video) => (dispatch) => {
  return VideosAPIUtil.updateVideo(video)
    .then(
      video => dispatch(receiveVideo(video)),
      errors => dispatch(receiveVideoErrors(errors))
    );
};

export const deleteVideo = (id) => (dispatch) => {
  return VideosAPIUtil.deleteVideo(id)
    .then(
      videoId => dispatch(removeVideo(videoId)),
      errors => dispatch(receiveVideoErrors(errors))
    );
};

export const receiveAllVideos = (videos) => {
  return {
    type: RECEIVE_ALL_VIDEOS,
    videos
  };
};

export const receiveVideo = (video) => {
  return {
    type: RECEIVE_VIDEO,
    video
  };
};

export const removeVideo = (videoId) => {
  return {
    type: REMOVE_VIDEO,
    videoId
  };
};

export const receiveVideoErrors = (errors) => {
  return {
    type: RECEIVE_VIDEO_ERRORS,
    errors
  };
};

export const clearVideoErrors = () => {
  return {
    type: CLEAR_VIDEO_ERRORS
  };
};
