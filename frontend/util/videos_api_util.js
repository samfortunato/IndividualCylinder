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
