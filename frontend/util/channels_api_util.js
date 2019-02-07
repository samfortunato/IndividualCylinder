export const fetchChannel = (id) => {
  return $.ajax({
    url: `api/channels/${id}`,
    method: 'GET'
  });
};

export const updateChannel = (channel) => {
  return $.ajax({
    url: `api/channels/${channel.id}`,
    method: 'PATCH'
  });
};
