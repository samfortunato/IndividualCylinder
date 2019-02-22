export const searchVideos = (searchTerms) => {
  return $.ajax({
    url: 'api/search',
    method: 'POST',
    data: { search: searchTerms }
  });
};
