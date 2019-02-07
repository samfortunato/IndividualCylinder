import * as ChannelsAPIUtil from '../util/channels_api_util';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_CHANNEL_ERRORS = 'RECEIVE_CHANNEL_ERRORS';

export const fetchChannel = (id) => (dispatch) => {
  return ChannelsAPIUtil.fetchChannel(id)
    .then(
      payload => dispatch(receiveChannel(payload)),
      errors => dispatch(receiveChannelErrors(errors))
    );
};

export const updateChannel = (channel) => (dispatch) => {
  return ChannelsAPIUtil.updateChannel(channel)
    .then(
      channel => dispatch(receiveChannel(channel)),
      errors => dispatch(receiveChannelErrors(errors))
    );
};

export const receiveChannel = ({ channel, user, videos }) => {
  return {
    type: RECEIVE_CHANNEL,
    channel,
    user,
    videos
  };
};

export const receiveChannelErrors = (errors) => {
  return {
    type: RECEIVE_CHANNEL_ERRORS,
    errors
  };
};
