export const toMMSSTimeString = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  const videoDurationString = date.toTimeString().substr(3, 5);

  return videoDurationString;
};
