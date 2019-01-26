export const fetchVideo = (id) => {
  return $.ajax({
    url: `api/videos/${id}`,
    method: 'GET'
  });
};
