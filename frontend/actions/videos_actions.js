import * as VideosAPIUtil from '../util/videos_api_util';

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS';

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

export const receiveVideo = (video) => {
  return {
    type: RECEIVE_VIDEO,
    video
  };
};

export const receiveVideoErrors = (errors) => {
  return {
    type: RECEIVE_VIDEO_ERRORS,
    errors
  };
};
