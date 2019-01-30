export const fetchAllVideos = () => {
  return $.ajax({
    url: 'api/videos',
    method: 'GET'
  });
};

export const fetchVideo = (id) => {
  return $.ajax({
    url: `api/videos/${id}`,
    method: 'GET'
  });
};

export const uploadVideo = (video) => {
  return $.ajax({
    url: 'api/videos',
    method: 'POST',
    data: video,
    contentType: false,
    processData: false
  });
};

export const updateVideo = (video) => {
  return $.ajax({
    url: `api/videos/${video.id}`,
    method: 'PATCH',
    data: video,
    contentType: false,
    processData: false
  });
};

export const deleteVideo = (id) => {
  return $.ajax({
    url: `api/videos/${id}`,
    method: 'DELETE'
  });
};
