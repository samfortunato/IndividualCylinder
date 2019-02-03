export const createLike = (like) => {
  return $.ajax({
    url: 'api/likes',
    method: 'POST',
    data: like
  });
};

export const updateLike = (like) => {
  return $.ajax({
    url: `api/likes/${like.id}`,
    method: 'PATCH',
    data: like
  });
};

export const deleteLike = (id) => {
  return $.ajax({
    url: `api/likes/${id}`,
    method: 'DELETE'
  });
};
